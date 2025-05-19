import { NextRequest, NextResponse } from 'next/server';
import { generateSermon } from '@/lib/mistral';
import { SermonFormData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const formData: SermonFormData = await request.json();
    
    // Validate the request data
    if (!formData.topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }
    
    if (!formData.structure) {
      return NextResponse.json(
        { error: 'Sermon structure is required' },
        { status: 400 }
      );
    }
    
    if (!formData.audience) {
      return NextResponse.json(
        { error: 'Target audience is required' },
        { status: 400 }
      );
    }
    
    // Generate the sermon
    const result = await generateSermon(formData);
    
    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ content: result.content });
  } catch (error) {
    console.error('Error in sermon generation API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
