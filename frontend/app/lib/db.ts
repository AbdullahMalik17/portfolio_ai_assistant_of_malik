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
