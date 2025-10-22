import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://nof1.ai/api/trades');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching trades:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trades data' }, 
      { status: 500 }
    );
  }
}