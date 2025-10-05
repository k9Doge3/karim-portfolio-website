# Domain Setup Guide for KY Group Portfolio

## Your Domain Structure

- **kygroup.ca** → Main portfolio homepage
- **kylife.ca** → Personal page with live status tracking
- **wildrosepainters.ca** → Wildrose Painters business page

## Current Configuration Status

✅ Domain redirects are already configured in `next.config.mjs`
✅ Middleware is set up for authentication
✅ All routes are ready to handle domain-based traffic

## Step-by-Step Setup Instructions

### 1. Deploy to Vercel

1. Click the **"Publish"** button in the top right of v0
2. Your project will be deployed to Vercel
3. Note your deployment URL (e.g., `your-project.vercel.app`)

### 2. Add Domains in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Domains**
3. Add each domain one by one:
   - `kygroup.ca`
   - `www.kygroup.ca`
   - `kylife.ca`
   - `www.kylife.ca`
   - `wildrosepainters.ca`
   - `www.wildrosepainters.ca`

4. For each domain, Vercel will provide DNS records

### 3. Configure DNS in GoDaddy

**For EACH domain (repeat for kygroup.ca, kylife.ca, wildrosepainters.ca):**

#### Step 3.1: Access DNS Settings
1. Log into **GoDaddy.com**
2. Go to **My Products**
3. Find your domain and click **DNS** or **Manage DNS**

#### Step 3.2: Add A Record (Root Domain)
- **Type:** A
- **Name:** @ (or leave blank)
- **Value:** `76.76.21.21`
- **TTL:** 600 seconds (or 10 minutes)

#### Step 3.3: Add CNAME Record (WWW Subdomain)
- **Type:** CNAME
- **Name:** www
- **Value:** `cname.vercel-dns.com`
- **TTL:** 600 seconds

#### Step 3.4: Remove Conflicting Records
- Delete any existing A records pointing to GoDaddy parking pages
- Delete any existing CNAME records for @ or www that conflict

#### Step 3.5: Save Changes
- Click **Save** or **Save All Records**

### 4. Wait for DNS Propagation

- DNS changes can take **5 minutes to 48 hours** to propagate
- Usually takes **10-30 minutes**
- You can check status at: https://dnschecker.org

### 5. Verify in Vercel

1. Return to Vercel → **Settings** → **Domains**
2. Wait for green checkmarks next to each domain
3. Once verified, your domains are live!

## How the Routing Works

### kygroup.ca
- Root domain stays on homepage (`/`)
- Shows main portfolio and projects

### kylife.ca
- Automatically redirects to `/personal` page
- Shows personal content, live status, Discord activity
- Has guest mode for public viewing

### wildrosepainters.ca
- Automatically redirects to `/business` page
- Shows Wildrose Painters business information
- Displays company details and services

## Testing Your Setup

After DNS propagation:

1. Visit `https://kygroup.ca` → Should show main portfolio
2. Visit `https://kylife.ca` → Should show personal page
3. Visit `https://wildrosepainters.ca` → Should show business page

## Troubleshooting

### Domain not working after 24 hours?
- Check DNS records in GoDaddy match exactly
- Verify no typos in CNAME value: `cname.vercel-dns.com`
- Check Vercel domain status for error messages

### SSL Certificate Issues?
- Vercel automatically provisions SSL certificates
- May take a few minutes after DNS verification
- Check Vercel domain settings for certificate status

### Redirect not working?
- Clear browser cache
- Try incognito/private browsing mode
- Check Vercel deployment logs for errors

## Need Help?

- Vercel Support: https://vercel.com/help
- GoDaddy Support: https://www.godaddy.com/help
- DNS Checker: https://dnschecker.org

## Technical Details

The domain routing is configured in:
- `next.config.mjs` - Domain-based redirects
- `middleware.ts` - Authentication handling

No code changes needed - just add DNS records in GoDaddy!
