# TikTok API Application Setup - Correct Configuration

## 🚨 **IMPORTANT: You Need Display API (Not Listed in Your Options)**

The products you're seeing are NOT what you need for your portfolio. You're missing the **Display API** which is the correct product for displaying TikTok content on websites.

## ❌ **Do NOT Add These Products:**

### ❌ Login Kit
- **Purpose:** User authentication with TikTok accounts
- **Why you don't need it:** Your portfolio doesn't require visitors to log in

### ❌ Share Kit  
- **Purpose:** Share content FROM your website TO TikTok
- **Why you don't need it:** You're displaying content, not sharing content to TikTok

### ❌ Content Posting API
- **Purpose:** Upload videos to TikTok from your app
- **Why you don't need it:** You're showing existing content, not creating new posts

### ❌ Webhooks
- **Purpose:** Real-time notifications from TikTok
- **Why you don't need it:** Simple API refresh is sufficient for portfolio display

### ❌ Data Portability API
- **Purpose:** Transfer TikTok data (EEA/UK only)
- **Why you don't need it:** Only for specific regions and data migration

## ✅ **What You Actually Need: Display API**

### 🔍 **How to Find Display API:**

1. **Look for "Display API"** in the products list
2. **Alternative names it might be called:**
   - "Basic Display API"
   - "Public Content API"
   - "Read-only API"
   - "Profile Display"

3. **If you can't find Display API:**
   - Look for a "View All Products" or "More Products" button
   - Check if there's a different category for "Display" or "Read-only" APIs
   - Sometimes it's under "Content APIs" or "Profile APIs"

## 📝 **Correct Application Setup:**

### **Products to Select:**

```
✅ Display API (or Basic Display API)
❌ Login Kit
❌ Share Kit  
❌ Content Posting API
❌ Webhooks
❌ Data Portability API
```

### **Scopes to Request:**
```
✅ user.info.basic - Profile information
✅ video.list - Recent videos and metrics
❌ video.upload - Not needed
❌ user.info.profile - Usually covered by basic
```

### **Application Details:**
```
App Name: Life Activity Tracker
Category: Entertainment  
Description: Personal portfolio website displaying TikTok profile and video content for professional showcase purposes using Display API.

Website URL: https://kylife.ca
Terms: https://kylife.ca/terms-of-service
Privacy: https://kylife.ca/privacy-policy
```

## 🎯 **Next Steps:**

1. **STOP** - Don't add any of the products you listed
2. **FIND** Display API in the product list
3. **SELECT** Display API only
4. **ADD** the correct scopes (user.info.basic, video.list)
5. **SUBMIT** with the corrected information

## 🔍 **If Display API is Missing:**

Some TikTok developer portals organize products differently. Look for:
- A "Content Display" section
- "Read-only APIs" 
- "Public Content Access"
- Or contact TikTok Developer Support

**Don't proceed without Display API - the other products won't work for your portfolio!**