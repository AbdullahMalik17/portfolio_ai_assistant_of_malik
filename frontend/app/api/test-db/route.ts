import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Test 1: Check if Postgres env vars exist
    const hasPostgres = process.env.POSTGRES_URL ? true : false;

    if (!hasPostgres) {
      return NextResponse.json({
        success: false,
        error: 'POSTGRES_URL environment variable is not set',
        hint: 'Make sure Postgres database is connected to your project in Vercel'
      }, { status: 503 });
    }

    // Test 2: Try to connect and query
    const result = await sql`SELECT NOW() as current_time;`;

    // Test 3: Check if vector extension exists
    let vectorExists = false;
    try {
      await sql`CREATE EXTENSION IF NOT EXISTS vector;`;
      vectorExists = true;
    } catch (error) {
      console.error('Vector extension error:', error);
      vectorExists = false;
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      timestamp: result.rows[0].current_time,
      vectorExtension: vectorExists ? 'enabled' : 'failed to enable',
      postgresUrl: process.env.POSTGRES_URL ? 'configured' : 'missing'
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: 'Check if Postgres database is properly connected'
    }, { status: 500 });
  }
}
