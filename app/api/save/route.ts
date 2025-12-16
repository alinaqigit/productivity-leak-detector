import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import Analysis from '@/models/Analysis';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    if (!data) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    await connectDB();

    // Upsert: Create or Update based on userId
    await Analysis.findOneAndUpdate(
      { userId },
      { ...data, userId }, // Ensure userId is included
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('Failed to save data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
