import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://nof1.ai/api/crypto-prices');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching crypto-prices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crypto-prices data' }, 
      { status: 500 }
    );
  }
}