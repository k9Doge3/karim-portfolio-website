import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.TIKTOK_CLIENT_ID;
    const redirectUri = process.env.NEXTAUTH_URL + '/api/auth/callback/tiktok';
    
    if (!clientId) {
      return NextResponse.json({ error: 'TikTok Client ID not configured' }, { status: 500 });
    }

    // TikTok OAuth authorization URL
    const authUrl = new URL('https://www.tiktok.com/v2/auth/authorize/');
    authUrl.searchParams.set('client_key', clientId);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', 'user.info.basic,video.list');
    authUrl.searchParams.set('state', 'random_state_string'); // In production, use secure random state

    return NextResponse.redirect(authUrl.toString());
  } catch (error) {
    console.error('TikTok auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}