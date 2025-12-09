import { NextResponse } from 'next/server';
import { initContactsTable } from '@/app/lib/db';

export async function GET() {
  try {
    const result = await initContactsTable();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Database initialized successfully'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Failed to initialize database'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
