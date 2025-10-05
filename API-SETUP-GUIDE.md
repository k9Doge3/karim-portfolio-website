# API Keys Setup Guide

## 🎵 Spotify API Setup

1. **Create Spotify App:**
   - Go to https://developer.spotify.com/dashboard
   - Click "Create App"
   - App name: "Portfolio Personal Dashboard"
   - App description: "Personal portfolio website integration"
   - Redirect URI: `http://localhost:3000/api/auth/callback/spotify`
   - Check "Web API" and "Web Playback SDK"

2. **Get Your Keys:**
   - Copy `Client ID` → `81f6649ecb2a4d8c9a172e4f9fce7acc`
   - Copy `Client Secret` → `SPOTIFY_CLIENT_SECRET`

3. **Get Refresh Token:**
   - Go to: https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-currently-playing%20user-read-recently-played
   - Replace YOUR_CLIENT_ID with your actual client ID
   - Authorize and copy the code from the redirect URL
   - Use this code to get a refresh token (we'll create an endpoint for this)

## 🎮 Steam API Setup

1. **Get Steam API Key:**
   - Go to https://steamcommunity.com/dev/apikey
   - Domain: `localhost:3000` (for development)
   - Copy the key → `STEAM_API_KEY`

2. **Get Your Steam ID:**
   - Go to your Steam profile
   - Copy the number from your profile URL → `STEAM_USER_ID`
   - Or use: https://steamid.io/ to convert your username

## 📺 TikTok API Setup

1. **Create TikTok for Developers App:**
   - Go to https://developers.tiktok.com/
   - Click "Manage Apps" → "Create an App"
   - App name: "Portfolio Personal Dashboard"
   - App description: "Personal portfolio website integration"
   - Redirect URI: `http://localhost:3000/api/auth/callback/tiktok`

2. **Get Your Keys:**
   - Copy `Client Key` → `TIKTOK_CLIENT_ID`
   - Copy `Client Secret` → `TIKTOK_CLIENT_SECRET`
   - Your TikTok username → `TIKTOK_USERNAME`

3. **Request Permissions:**
   - Apply for these scopes: `user.info.basic`, `video.list`
   - Note: TikTok API requires approval for most endpoints

## 🔧 Environment Setup

1. **Update `.env.local` with your actual values:**
   ```
   SPOTIFY_CLIENT_ID=your_actual_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_actual_spotify_client_secret
   SPOTIFY_REFRESH_TOKEN=your_actual_refresh_token
   
   STEAM_API_KEY=your_actual_steam_api_key
   STEAM_USER_ID=your_actual_steam_user_id
   
   TWITCH_CLIENT_ID=your_actual_twitch_client_id
   TWITCH_CLIENT_SECRET=your_actual_twitch_client_secret
   TWITCH_USERNAME=your_actual_twitch_username
   ```

2. **Restart your development server** after updating environment variables

## 🚀 Next Steps

After setting up your API keys, I'll help you:
1. Create API routes for each service
2. Update the components to fetch real data
3. Add error handling and loading states
4. Set up automatic refresh for live data

Let me know when you have your API keys ready!