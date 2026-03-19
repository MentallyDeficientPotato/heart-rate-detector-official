import { NextResponse } from 'next/server';

const flaskUrl = process.env.FLASK_URL || 'http://127.0.0.1:5000';

export async function GET() {
  try {
    const res = await fetch(`${flaskUrl}/download-labeled`);
    if (!res.ok) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }
    const data = await res.json();
    return new NextResponse(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="labeled_records.json"',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Request failed' }, { status: 502 });
  }
}
