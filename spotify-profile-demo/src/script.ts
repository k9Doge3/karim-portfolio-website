import { redirectToAuthCodeFlow } from "./auth";

const clientId = "YOUR_SPOTIFY_CLIENT_ID"; // TODO: Replace with your actual Spotify client ID

async function main() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) {
        // Not authenticated, show login button
        const loginBtn = document.getElementById("login-btn");
        if (loginBtn) {
            loginBtn.addEventListener("click", () => {
                redirectToAuthCodeFlow(clientId);
            });
        }
        return;
    }

    // Authenticated: exchange code for access token
    const accessToken = await getAccessToken(code);
    if (!accessToken) {
        alert("Failed to get access token");
        return;
    }

    // Fetch and display profile info
    await displayProfile(accessToken);
    // Fetch and display currently playing track
    await displayCurrentlyPlaying(accessToken);
    // Fetch and display top tracks
    await displayTopTracks(accessToken);
    // Fetch and display entire library
    await displayLibrary(accessToken);
}

async function getAccessToken(code: string): Promise<string | null> {
    const verifier = localStorage.getItem("verifier");
    const body = new URLSearchParams();
    body.append("client_id", clientId);
    body.append("grant_type", "authorization_code");
    body.append("code", code);
    body.append("redirect_uri", "http://127.0.0.1:5173/callback");
    body.append("code_verifier", verifier || "");

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.access_token;
}

async function displayProfile(accessToken: string): Promise<void> {
    const response = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) return;
    const data = await response.json();
    document.getElementById("displayName")!.textContent = data.display_name;
    document.getElementById("id")!.textContent = data.id;
    document.getElementById("email")!.textContent = data.email;
    document.getElementById("uri")!.textContent = data.uri;
    document.getElementById("uri")!.setAttribute("href", `https://open.spotify.com/user/${data.id}`);
    document.getElementById("url")!.textContent = data.external_urls.spotify;
    document.getElementById("url")!.setAttribute("href", data.external_urls.spotify);
    if (data.images && data.images.length > 0) {
        document.getElementById("avatar")!.innerHTML = `<img src="${data.images[0].url}" width="50" height="50" style="border-radius:50%">`;
        document.getElementById("imgUrl")!.textContent = data.images[0].url;
    }
}

async function displayCurrentlyPlaying(accessToken: string): Promise<void> {
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    const section = document.createElement("section");
    section.id = "currently-playing";
    section.innerHTML = `<h2>Currently Playing</h2>`;
    if (response.status === 204) {
        section.innerHTML += `<p>Nothing is currently playing.</p>`;
    } else if (response.ok) {
        const data = await response.json();
        if (data && data.item) {
            section.innerHTML += `<p><strong>${data.item.name}</strong> by ${data.item.artists.map((a:any) => a.name).join(", ")}</p>`;
            if (data.item.album && data.item.album.images && data.item.album.images.length > 0) {
                section.innerHTML += `<img src="${data.item.album.images[0].url}" width="100" height="100" style="border-radius:8px">`;
            }
        }
    } else {
        section.innerHTML += `<p>Unable to fetch currently playing track.</p>`;
    }
    document.body.appendChild(section);
}

async function displayTopTracks(accessToken: string): Promise<void> {
    const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    const section = document.createElement("section");
    section.id = "top-tracks";
    section.innerHTML = `<h2>Your Top Tracks</h2>`;
    if (response.ok) {
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            section.innerHTML += `<ol>${data.items.map((track:any) => `<li>${track.name} by ${track.artists.map((a:any) => a.name).join(", ")}</li>`).join("")}</ol>`;
        } else {
            section.innerHTML += `<p>No top tracks found.</p>`;
        }
    } else {
        section.innerHTML += `<p>Unable to fetch top tracks.</p>`;
    }
    document.body.appendChild(section);
}

// Fetch and display the user's entire saved Spotify library (all saved tracks)
async function displayLibrary(accessToken: string): Promise<void> {
    const section = document.createElement("section");
    section.id = "library";
    section.innerHTML = `<h2>Your Saved Tracks (Library)</h2>`;
    let tracks: any[] = [];
    let nextUrl: string | null = "https://api.spotify.com/v1/me/tracks?limit=50";
    while (nextUrl) {
        const response = await fetch(nextUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!response.ok) break;
        const data = await response.json();
        tracks = tracks.concat(data.items);
        nextUrl = data.next;
    }
    if (tracks.length > 0) {
        section.innerHTML += `<ol>${tracks.map((item: any) => `<li>${item.track.name} by ${item.track.artists.map((a: any) => a.name).join(", ")}</li>`).join("")}</ol>`;
    } else {
        section.innerHTML += `<p>No saved tracks found in your library.</p>`;
    }
    document.body.appendChild(section);
}

main();