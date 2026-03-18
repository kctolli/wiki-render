import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Return the HTML with the correct Content-Type header
    return new NextResponse("In Next", {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}