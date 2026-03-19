import { NextResponse } from 'next/server';

const flaskUrl = process.env.FLASK_URL || 'http://127.0.0.1:5000';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const res = await fetch(`${flaskUrl}/upload-model`, {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    if (!res.ok) return NextResponse.json(data, { status: res.status });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 502 },
    );
  }
}
