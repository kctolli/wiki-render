import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');

  console.log("API received request for page:", page); // DEBUG LOG

  if (!page || page === "undefined") {
    return NextResponse.json({ error: "Page parameter is invalid" }, { status: 400 });
  }

  const wikiUrl = `https://wiki.ktolliver.org/doku.php?id=${page}&do=export_xhtml&`;

  const username = process.env.DOKU_USER;
  const password = process.env.DOKU_PASSWORD;

  if (!username || !password) {
    return NextResponse.json({ error: "Server configuration missing" }, { status: 500 });
  }

  const auth = Buffer.from(`${username}:${password}`).toString('base64');

  try {
    const response = await fetch(wikiUrl, {
      method: 'GET',
      headers: { 'Authorization': `Basic ${auth}` }
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