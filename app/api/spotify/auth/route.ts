import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  
  if (!code) {
    // Step 1: Redirect to Spotify authorization
    const scopes = [
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-read-playback-state'
    ].join(' ');
    
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('client_id', process.env.SPOTIFY_CLIENT_ID!);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', `${process.env.NEXTAUTH_URL}/api/spotify/auth`);
    authUrl.searchParams.append('scope', scopes);
    
    return NextResponse.redirect(authUrl.toString());
  }
  
  try {
    // Step 2: Exchange code for tokens
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/spotify/auth`
      })
    });
    
    const tokens = await tokenResponse.json();
    
    if (tokens.error) {
      return NextResponse.json({ error: tokens.error_description }, { status: 400 });
    }
    
    // Return the refresh token for you to copy
    return NextResponse.json({
      message: 'Success! Copy this refresh token to your .env.local file:',
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
      instructions: [
        '1. Copy the refresh_token below',
        '2. Update your .env.local file:',
        `   SPOTIFY_REFRESH_TOKEN=${tokens.refresh_token}`,
        '3. Restart your development server',
        '4. Your Spotify integration will now work!'
      ]
    });
    
  } catch (error) {
    console.error('Spotify auth error:', error);
    return NextResponse.json({ error: 'Failed to get tokens' }, { status: 500 });
  }
}