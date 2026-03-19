import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');

  const activePage = page || "start"; 

  const wikiUrl = `https://wiki.ktolliver.org/api/wiki.php?page=${activePage}`;

  try {
    const response = await fetch(wikiUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      return new NextResponse("Unauthorized or Page Not Found", { status: response.status });
    }

    const html = await response.text();

    // Return the HTML with the correct Content-Type header
    return new NextResponse(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error("Doku Error: ", error);
    return NextResponse.json({ error: "Doku Error" }, { status: 500 });
  }
}