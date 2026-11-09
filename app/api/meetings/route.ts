import type { NextRequest } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

// GET /api/meetings
// GET /api/meetings?date=2026-05-03
export async function GET(request: NextRequest) {
    const date = request.nextUrl.searchParams.get('date'); // "2026-05-03" or null

    const meetings = getMeetings(date);
    return Response.json(meetings);
}