import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lastHourlyMarker = searchParams.get('lastHourlyMarker') || '99';
    
    const response = await fetch(
      `https://nof1.ai/api/account-totals?lastHourlyMarker=${lastHourlyMarker}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching account-totals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch account-totals data' }, 
      { status: 500 }
    );
  }
}