import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      return NextResponse.json({ error: 'Authorization code not provided' }, { status: 400 });
    }

    const clientId = process.env.TIKTOK_CLIENT_ID;
    const clientSecret = process.env.TIKTOK_CLIENT_SECRET;
    const redirectUri = process.env.NEXTAUTH_URL + '/api/auth/callback/tiktok';

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: 'TikTok credentials not configured' }, { status: 500 });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_key: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('TikTok token error:', tokenData);
      return NextResponse.json({ error: 'Token exchange failed' }, { status: 400 });
    }

    // Store token securely (in production, use secure session/database)
    // For demo purposes, redirect back to personal page
    const redirectUrl = new URL('/personal', process.env.NEXTAUTH_URL || 'http://localhost:3000');
    redirectUrl.searchParams.set('tiktok_auth', 'success');
    
    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('TikTok callback error:', error);
    return NextResponse.json({ error: 'Callback processing failed' }, { status: 500 });
  }
}