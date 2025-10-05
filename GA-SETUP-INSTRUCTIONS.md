# Google Analytics Real Setup - Step by Step

## 🎯 **Let's Get 100% Real Data Right Now!**

Follow these exact steps to connect your portfolio to Wildrose Painters' real Google Analytics:

### **Step 1: Find Your Google Analytics Property ID**
1. Go to [analytics.google.com](https://analytics.google.com)
2. Select **Wildrose Painters** property
3. Click **Admin** (gear icon, bottom left)
4. Under **Property** column, click **Property Details**
5. Copy the **Property ID** (looks like: 123456789)

### **Step 2: Create Google Analytics API Access**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create new project or select existing one
3. In the search bar, type "Google Analytics Data API"
4. Click **Enable** on the Google Analytics Data API
5. Go to **APIs & Services** → **Credentials**
6. Click **+ CREATE CREDENTIALS** → **Service Account**
7. Name it: `portfolio-analytics`
8. Click **Create and Continue**
9. Skip role assignment (click **Continue**)
10. Click **Done**

### **Step 3: Generate Service Account Key**
1. Click on the newly created service account email
2. Go to **Keys** tab
3. Click **Add Key** → **Create New Key**
4. Select **JSON** format
5. Click **Create** and download the JSON file

### **Step 4: Grant Analytics Access**
1. Open the downloaded JSON file
2. Copy the `client_email` value (looks like: portfolio-analytics@project.iam.gserviceaccount.com)
3. Go back to [analytics.google.com](https://analytics.google.com)
4. Click **Admin** → **Account Access Management** (or **Property Access Management**)
5. Click **+** to add user
6. Paste the service account email
7. Select **Viewer** role
8. Click **Add**

### **Step 5: Update Environment Variables**

Replace the placeholder values in your `.env.local`:

```bash
# Google Analytics Configuration
GOOGLE_ANALYTICS_PROPERTY_ID=123456789
GOOGLE_ANALYTICS_CREDENTIALS={"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"portfolio-analytics@project.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
```

**IMPORTANT:** Copy the ENTIRE JSON file content as one line for `GOOGLE_ANALYTICS_CREDENTIALS`

### **Step 6: Deploy and Test**
```bash
vercel --prod
```

### **🎉 What You'll See:**
- **Real active users** on wildrosepainters.ca right now
- **Real 30-day visitor totals** from Google Analytics
- **"Google Analytics" data source** indicator
- **100% authentic business metrics**

## 🚀 **Want me to help you through each step?**

Just share:
1. **Property ID** from Google Analytics
2. **JSON credentials** from the service account

And I'll update your `.env.local` file to show real data! 📊