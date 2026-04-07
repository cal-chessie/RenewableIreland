import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const htmlPath = path.join(process.cwd(), 'public/original.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
