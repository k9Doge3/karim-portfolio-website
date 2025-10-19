import express from 'express';
import fetch from 'node-fetch';
const server = express();

server.get('/api/steam/profile', async (req, res) => {
  try {
    const steamId = req.query.steamid; // e.g., ?steamid=76561198000000000
    // Validate steamId: must be a 17-digit number
    if (!steamId || !/^\d{17}$/.test(steamId)) {
      return res.status(400).json({ error: 'Invalid or missing steamid. Must be a 17-digit number.' });
    }
    const apiKey = process.env.STEAM_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Steam API key not configured.' });
    }
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`;
    const response = await fetch(url);
    const data = await response.json();
    // Structure of sanitizedProfile for clarity and maintainability
    /**
     * Represents a sanitized Steam profile.
     * @typedef {Object} SanitizedProfile
     * @property {string} steamid
     * @property {string} personaname
     * @property {string} profileurl
     * @property {string} avatar
     * @property {string} avatarmedium
     * @property {string} avatarfull
     * @property {number} lastlogoff
     * @property {string} [loccountrycode]
     */
    // If using TypeScript, you can use:
    // interface SanitizedProfile {
    //   steamid: string;
    //   personaname: string;
    //   profileurl: string;
    //   avatar: string;
    //   avatarmedium: string;
    //   avatarfull: string;
    //   lastlogoff: number;
    //   loccountrycode?: string;
    // }

    const player = data.response.players && data.response.players[0];
    if (!player) {
      return res.status(404).json({ error: 'Steam profile not found.' });
    }
    const sanitizedProfile = {
      steamid: player.steamid,
      personaname: player.personaname,
      profileurl: player.profileurl,
      avatar: player.avatar,
      avatarmedium: player.avatarmedium,
      avatarfull: player.avatarfull,
      lastlogoff: player.lastlogoff,
      loccountrycode: player.loccountrycode
    };
    res.json(sanitizedProfile);
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Error fetching Steam profile.', details });
  }
});

server.listen(3000, () => console.log('Server running on port 3000'));


// TikTok embed code removed. If you need to embed HTML, do so in a frontend file or template.