import { NextResponse } from 'next/server';

async function getAccessToken() {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
  
  if (!refresh_token) {
    throw new Error('No refresh token available. Please visit /api/spotify/auth first.');
  }
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    })
  });
  
  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  try {
    const access_token = await getAccessToken();
    
    // Get currently playing track
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    
    if (response.status === 204 || response.status === 202) {
      // Nothing is currently playing, get recently played
      const recentResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      
      const recentData = await recentResponse.json();
      
      if (recentData.items && recentData.items.length > 0) {
        const track = recentData.items[0].track;
        return NextResponse.json({
          isPlaying: false,
          track: {
            name: track.name,
            artist: track.artists.map((artist: any) => artist.name).join(', '),
            album: track.album.name,
            image: track.album.images[0]?.url,
            url: track.external_urls.spotify
          },
          playedAt: recentData.items[0].played_at
        });
      }
      
      return NextResponse.json({
        isPlaying: false,
        track: null
      });
    }
    
    const data = await response.json();
    
    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }
    
    return NextResponse.json({
      isPlaying: data.is_playing,
      track: data.item ? {
        name: data.item.name,
        artist: data.item.artists.map((artist: any) => artist.name).join(', '),
        album: data.item.album.name,
        image: data.item.album.images[0]?.url,
        url: data.item.external_urls.spotify,
        duration: data.item.duration_ms,
        progress: data.progress_ms
      } : null
    });
    
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch Spotify data' 
    }, { status: 500 });
  }
}