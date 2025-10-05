# KY Portfolio - GitHub and Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `ky-portfolio-website`
3. Description: `Professional portfolio website with real-time social media integrations`
4. Set to **Public** (recommended for portfolio)
5. Don't initialize with README (we have files already)
6. Click "Create repository"

### 2. Push to GitHub
```bash
# Add GitHub remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ky-portfolio-website.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel
1. Go to https://vercel.com/
2. Click "Add New..." → "Project"
3. Import from GitHub: `ky-portfolio-website`
4. Framework Preset: **Next.js**
5. Root Directory: `./` (leave default)
6. Click "Deploy"

### 4. Configure Custom Domains
After deployment, add your domains:

#### In Vercel Dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add domains:
   - `kylife.ca` (personal)
   - `www.kylife.ca`
   - `kygroup.ca` (business)
   - `www.kygroup.ca`

#### DNS Configuration (GoDaddy):
Add these DNS records for both domains:

**For kylife.ca:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600

Type: A
Name: @
Value: 76.76.19.19
TTL: 600
```

**For kygroup.ca:**
```
Type: CNAME
Name: www  
Value: cname.vercel-dns.com
TTL: 600

Type: A
Name: @
Value: 76.76.19.19  
TTL: 600
```

### 5. Environment Variables in Vercel
In Vercel project settings → Environment Variables, add:

```
SPOTIFY_CLIENT_ID=81f6649ecb2a4d8c9a172e4f9fce7acc
SPOTIFY_CLIENT_SECRET=e862625be6304ca7a9a339722de3127f
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token_here

STEAM_API_KEY=21101C2D862EC8E34C9BBCE063EA5727
STEAM_USER_ID=STEAM_0:1:512583932

TIKTOK_CLIENT_ID=your_tiktok_client_id_here
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret_here
TIKTOK_USERNAME=your_tiktok_username_here

NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://kylife.ca
PRODUCTION_URL=https://kylife.ca
```

### 6. Domain Routing Strategy
- **kylife.ca** → Personal portfolio (main site)
- **kygroup.ca** → Business focus (redirects to /business)

### 7. Post-Deployment Tasks
1. ✅ Test all API integrations
2. ✅ Verify custom domains work
3. ✅ Get Spotify refresh token via `/api/spotify/auth`
4. ✅ Update TikTok app with production URLs
5. ✅ Test business status dashboard

## 🔧 Quick Commands

### Push updates:
```bash
git add .
git commit -m "Update: [your changes]"
git push
```

### Vercel auto-deploys on every push to main branch!

## 📱 Final URLs
- **Personal:** https://kylife.ca
- **Business:** https://kygroup.ca  
- **Personal Section:** https://kylife.ca/personal
- **Business Section:** https://kylife.ca/business

## 🎯 Success Checklist
- [ ] GitHub repo created and pushed
- [ ] Vercel deployment successful
- [ ] Custom domains configured
- [ ] Environment variables set
- [ ] All integrations tested
- [ ] Terms of service accessible

Ready to go live! 🚀