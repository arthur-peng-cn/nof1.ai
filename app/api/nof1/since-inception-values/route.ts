import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://nof1.ai/api/since-inception-values');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching since-inception-values:', error);
    return NextResponse.json(
      { error: 'Failed to fetch since-inception-values data' }, 
      { status: 500 }
    );
  }
}