# GoDaddy DNS Setup for Your Domains

## Domains to Configure

1. **kygroup.ca** - Main portfolio site
2. **kylife.ca** - Personal page
3. **wildrosepainters.ca** - Wildrose Painters business site

---

## Step-by-Step Instructions for Each Domain

### For EACH domain (kygroup.ca, kylife.ca, wildrosepainters.ca):

#### 1. Log into GoDaddy
- Go to [godaddy.com](https://www.godaddy.com)
- Sign in to your account
- Click **"My Products"**

#### 2. Access DNS Management
- Find your domain in the list
- Click the **three dots (⋮)** next to the domain
- Select **"Manage DNS"**

#### 3. Delete Existing Records (Important!)
Before adding new records, you need to remove conflicting ones:
- Look for existing **A records** pointing to GoDaddy's parking page
- Look for existing **CNAME records** for "www"
- Click the **trash icon** to delete them
- Click **"Save"** after deletions

#### 4. Add New A Record (Root Domain)
Click **"Add"** button and enter:
- **Type:** A
- **Name:** @ (this represents the root domain)
- **Value:** `76.76.21.21` (Vercel's IP address)
- **TTL:** 600 seconds (or 1/2 hour)
- Click **"Save"**

#### 5. Add New CNAME Record (WWW Subdomain)
Click **"Add"** button again and enter:
- **Type:** CNAME
- **Name:** www
- **Value:** `cname.vercel-dns.com`
- **TTL:** 600 seconds (or 1/2 hour)
- Click **"Save"**

#### 6. Verify Your Settings
Your DNS records should now look like this:

\`\`\`
Type    Name    Value                   TTL
A       @       76.76.21.21            600
CNAME   www     cname.vercel-dns.com   600
\`\`\`

---

## After DNS Configuration

### 1. Add Domains in Vercel
1. Go to your Vercel project
2. Click **Settings** → **Domains**
3. Add each domain:
   - `kygroup.ca`
   - `www.kygroup.ca`
   - `kylife.ca`
   - `www.kylife.ca`
   - `wildrosepainters.ca`
   - `www.wildrosepainters.ca`

### 2. Wait for DNS Propagation
- DNS changes can take **5 minutes to 48 hours** to propagate
- Usually takes **10-30 minutes**
- You can check status at [whatsmydns.net](https://www.whatsmydns.net)

### 3. Verify in Vercel
- Go back to **Settings** → **Domains** in Vercel
- You should see green checkmarks next to each domain when they're verified
- If you see errors, wait a bit longer for DNS propagation

---

## Domain Routing (Already Configured!)

Your domains will automatically route as follows:

- **kygroup.ca** → Main homepage/portfolio
- **kylife.ca** → Personal page (redirects to /personal)
- **wildrosepainters.ca** → Wildrose Painters page (redirects to /business)

The collapsible section on kygroup.ca/business will remain, AND there's now a prominent link to wildrosepainters.ca at the top!

---

## Troubleshooting

### Domain not working after 24 hours?
1. Double-check DNS records in GoDaddy match exactly
2. Make sure you deleted old conflicting records
3. Verify domain is added in Vercel
4. Check for typos in DNS values

### SSL Certificate Issues?
- Vercel automatically provisions SSL certificates
- This can take a few minutes after DNS verification
- If it fails, try removing and re-adding the domain in Vercel

### WWW vs Non-WWW?
- Both versions will work
- Vercel will automatically redirect one to the other
- You can set your preference in Vercel domain settings

---

## Need Help?

If you encounter issues:
1. Check Vercel's domain documentation
2. Contact GoDaddy support for DNS-specific questions
3. Contact Vercel support for deployment issues
