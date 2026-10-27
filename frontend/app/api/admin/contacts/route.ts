import { NextRequest, NextResponse } from 'next/server';
import { getContacts } from '@/app/lib/db';
import { requireAdmin } from '@/app/lib/admin-auth';

export async function GET(request: NextRequest) {
  try {
    const denied = requireAdmin(request);
    if (denied) return denied;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;

    const result = await getContacts(status, 100);

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: result.data
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
