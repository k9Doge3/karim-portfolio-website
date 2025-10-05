# How to Find Your Steam User ID

## Method 1: From Your Steam Profile URL

1. **Go to your Steam profile** (in Steam client or web browser)
2. **Look at the URL** - it will be one of these formats:

### If you have a custom URL:
- URL: `https://steamcommunity.com/id/yourcustomname`
- You need to convert this to get your Steam ID

### If you have a numeric URL:
- URL: `https://steamcommunity.com/profiles/76561198000000000`
- The long number after `/profiles/` is your Steam ID!

## Method 2: Using SteamID.io (Easiest!)

1. **Go to:** https://steamid.io/
2. **Enter your Steam profile URL** or custom name
3. **Copy the "steamID64"** - this is your Steam User ID
4. **Example:** `76561198123456789`

## Method 3: In Steam Client

1. **Open Steam**
2. **Go to your Profile**
3. **Right-click anywhere on your profile**
4. **Select "Copy Page URL"**
5. **If it's numeric, that's your ID. If custom, use Method 2**

## Method 4: Steam Web API (Advanced)

If you know your custom username, you can also use:
```
http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=YOUR_API_KEY&vanityurl=YOUR_CUSTOM_NAME
```

## What to look for:

Your Steam User ID should be a **17-digit number** starting with `7656119` 

Example: `76561198123456789`

Once you have it, paste it in your `.env.local` file replacing `your_steam_user_id_here`!