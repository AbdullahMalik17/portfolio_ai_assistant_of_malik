import { sql } from '@vercel/postgres';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at: Date;
  status: 'new' | 'read' | 'replied';
}

/**
 * Initialize the contacts table
 * This will be called automatically by Vercel on first deployment
 */
export async function initContactsTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create index for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
    `;

    console.log('Contacts table initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('Error initializing contacts table:', error);
    return { success: false, error };
  }
}

/**
 * Save a new contact to the database
 */
export async function saveContact(contact: Omit<Contact, 'id' | 'created_at' | 'status'>) {
  try {
    const result = await sql`
      INSERT INTO contacts (name, email, phone, subject, message, status)
      VALUES (${contact.name}, ${contact.email}, ${contact.phone || null}, ${contact.subject}, ${contact.message}, 'new')
      RETURNING id, created_at;
    `;

    return {
      success: true,
      data: result.rows[0]
    };
  } catch (error) {
    console.error('Error saving contact:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get all contacts with optional filtering
 */
export async function getContacts(status?: string, limit: number = 50) {
  try {
    let result;

    if (status) {
      result = await sql`
        SELECT * FROM contacts
        WHERE status = ${status}
        ORDER BY created_at DESC
        LIMIT ${limit};
      `;
    } else {
      result = await sql`
        SELECT * FROM contacts
        ORDER BY created_at DESC
        LIMIT ${limit};
      `;
    }

    return {
      success: true,
      data: result.rows as Contact[]
    };
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: []
    };
  }
}

/**
 * Update contact status
 */
export async function updateContactStatus(id: number, status: 'new' | 'read' | 'replied') {
  try {
    await sql`
      UPDATE contacts
      SET status = ${status}
      WHERE id = ${id};
    `;

    return { success: true };
  } catch (error) {
    console.error('Error updating contact status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Delete a contact
 */
export async function deleteContact(id: number) {
  try {
    await sql`
      DELETE FROM contacts
      WHERE id = ${id};
    `;

    return { success: true };
  } catch (error) {
    console.error('Error deleting contact:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get contact statistics
 */
export async function getContactStats() {
  try {
    const result = await sql`
      SELECT
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'new' THEN 1 END) as new_count,
        COUNT(CASE WHEN status = 'read' THEN 1 END) as read_count,
        COUNT(CASE WHEN status = 'replied' THEN 1 END) as replied_count
      FROM contacts;
    `;

    return {
      success: true,
      data: result.rows[0]
    };
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// ============================================================================
// Vector Database Operations for RAG
// ============================================================================

export interface PortfolioEmbedding {
  id: number;
  content: string;
  content_type: string;
  category?: string;
  metadata: any;
  embedding: number[];
  created_at: Date;
}

/**
 * Initialize the portfolio_embeddings table with pgvector extension
 */
export async function initEmbeddingsTable() {
  try {
    // Enable pgvector extension
    await sql`CREATE EXTENSION IF NOT EXISTS vector;`;

    // Create embeddings table
    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_embeddings (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        content_type VARCHAR(50) NOT NULL,
        category VARCHAR(50),
        metadata JSONB,
        embedding vector(768),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create indexes
    await sql`
      CREATE INDEX IF NOT EXISTS idx_embeddings_type
      ON portfolio_embeddings(content_type);
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_embeddings_category
      ON portfolio_embeddings(content_type, category);
    `;

    console.log('Portfolio embeddings table initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('Error initializing embeddings table:', error);
    return { success: false, error };
  }
}

/**
 * Insert a single embedding into the database
 */
export async function insertEmbedding(
  content: string,
  contentType: string,
  embedding: number[],
  category?: string,
  metadata?: any
) {
  try {
    const result = await sql`
      INSERT INTO portfolio_embeddings (content, content_type, category, metadata, embedding)
      VALUES (
        ${content},
        ${contentType},
        ${category || null},
        ${metadata ? JSON.stringify(metadata) : null},
        ${JSON.stringify(embedding)}::vector
      )
      RETURNING id;
    `;
    return { success: true, id: result.rows[0].id };
  } catch (error) {
    console.error('Error inserting embedding:', error);
    return { success: false, error };
  }
}

/**
 * Clear all embeddings (for re-indexing)
 */
export async function clearEmbeddings() {
  try {
    await sql`TRUNCATE TABLE portfolio_embeddings RESTART IDENTITY;`;
    return { success: true };
  } catch (error) {
    console.error('Error clearing embeddings:', error);
    return { success: false, error };
  }
}

/**
 * Create vector index after data is populated
 * Note: ivfflat index should be created AFTER data is inserted
 */
export async function createVectorIndex() {
  try {
    await sql`
      CREATE INDEX IF NOT EXISTS idx_embeddings_vector
      ON portfolio_embeddings
      USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100);
    `;
    return { success: true };
  } catch (error) {
    console.error('Error creating vector index:', error);
    return { success: false, error };
  }
}

/**
 * Vector similarity search using cosine distance
 */
export async function searchSimilarContent(
  queryEmbedding: number[],
  limit: number = 5,
  contentType?: string
) {
  try {
    let result;

    if (contentType) {
      result = await sql`
        SELECT
          id,
          content,
          content_type,
          category,
          metadata,
          1 - (embedding <=> ${JSON.stringify(queryEmbedding)}::vector) as similarity
        FROM portfolio_embeddings
        WHERE content_type = ${contentType}
        ORDER BY embedding <=> ${JSON.stringify(queryEmbedding)}::vector
        LIMIT ${limit};
      `;
    } else {
      result = await sql`
        SELECT
          id,
          content,
          content_type,
          category,
          metadata,
          1 - (embedding <=> ${JSON.stringify(queryEmbedding)}::vector) as similarity
        FROM portfolio_embeddings
        ORDER BY embedding <=> ${JSON.stringify(queryEmbedding)}::vector
        LIMIT ${limit};
      `;
    }

    return {
      success: true,
      results: result.rows.map(row => ({
        ...row,
        similarity: parseFloat(row.similarity)
      }))
    };
  } catch (error) {
    console.error('Error searching similar content:', error);
    return { success: false, error, results: [] };
  }
}

/**
 * Get embedding count
 */
export async function getEmbeddingsCount() {
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM portfolio_embeddings;
    `;
    return {
      success: true,
      count: parseInt(result.rows[0].count)
    };
  } catch (error) {
    console.error('Error getting embeddings count:', error);
    return { success: false, count: 0 };
  }
}
