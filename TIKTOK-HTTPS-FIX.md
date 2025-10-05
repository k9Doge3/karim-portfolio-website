# TikTok Application URLs - HTTPS Fix

## 🚨 **The Problem:**
TikTok requires HTTPS URLs but you were using `http://localhost:3000`

## ✅ **The Solution:**

### **For TikTok Application Form, Use These URLs:**

```
Terms of Service URL: https://kylife.ca/terms
Privacy Policy URL: https://kylife.ca/privacy
Web/Desktop URL: https://kylife.ca
Redirect URI: https://kylife.ca/api/auth/callback/tiktok
```

## 🚀 **Quick Deploy to Get HTTPS URLs:**

1. **Deploy to Vercel first** (we'll do this now)
2. **Use production URLs** in TikTok application
3. **Create demo video** using deployed site

### **Deploy Command:**
```bash
vercel --prod
```

This will give you:
- ✅ HTTPS URLs that TikTok accepts
- ✅ Professional domain (kylife.ca)
- ✅ Real deployment for demo video

## 📋 **Updated Application Form:**

**App Details:**
```
App Name: Life Activity Tracker
Category: Entertainment
Description: Personal portfolio website displaying TikTok profile and video content for professional showcase purposes using Display API.
```

**URLs:**
```
Terms of Service URL: https://kylife.ca/terms
Privacy Policy URL: https://kylife.ca/privacy
Web/Desktop URL: https://kylife.ca
Redirect URI: https://kylife.ca/api/auth/callback/tiktok
```

**Products & Scopes:**
```
✅ Display API (if available)
✅ user.info.basic
✅ video.list
```

## 🎬 **Demo Video:**
- Record using **https://kylife.ca** (deployed site)
- Shows professional domain (not localhost)
- Better for TikTok review process

**Let's deploy to Vercel right now to get your HTTPS URLs!** 🚀