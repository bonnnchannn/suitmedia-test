// src/app/api/ideas/route.ts

import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageNumber = searchParams.get('page') || '1';
    const pageSize = searchParams.get('size') || '10';
    const sort = searchParams.get('sort') || '-published_at';

    const externalApiUrl = new URL('https://suitmedia-backend.suitdev.com/api/ideas');
    externalApiUrl.searchParams.append('page[number]', pageNumber);
    externalApiUrl.searchParams.append('page[size]', pageSize);
    externalApiUrl.searchParams.append('append[]', 'small_image');
    externalApiUrl.searchParams.append('append[]', 'medium_image');
    externalApiUrl.searchParams.append('sort', sort);

    // Lakukan panggilan ke API eksternal dengan menambahkan headers
    const response = await fetch(externalApiUrl.toString(), {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {
    console.error("API Proxy Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch data from external source." },
      { status: 500 }
    );
  }
}