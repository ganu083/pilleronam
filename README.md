# 🌸 പിള്ളേരുടെ ഓണം (Pillarede Onam) - Web Application

A vibrant, mobile-first responsive celebration portal for **പിള്ളേരുടെ ഓണം (Children's Onam Celebration & Games)** in Kottayam, Kerala.

---

## 🚀 Deploying to Vercel

This project is built with **Vite + React + Tailwind CSS** and is pre-configured for instant 1-click deployments on [Vercel](https://vercel.com).

### Method 1: Automatic Deployments with GitHub & Vercel (Recommended)

1. **Export to GitHub**:
   - In Google AI Studio, click **Settings (top right) > Export to GitHub** (or push your repository to GitHub).
2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click **"Add New Project"** and select your imported repository (`pillarede-onam`).
3. **Configure & Deploy**:
   - **Framework Preset**: `Vite` (automatically detected).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - Click **"Deploy"**. Your site will be live within seconds with a free `*.vercel.app` URL and automatic HTTPS!
4. **Automatic CI/CD**:
   - Every time you push a commit or update your repository, Vercel will automatically build and deploy the new version.

---

### Method 2: Deploy directly via Vercel CLI

If you prefer terminal deployment:

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Log in to your Vercel account
vercel login

# 3. Deploy to production
vercel --prod
```

---

## 🌐 Custom Domain Configuration on Vercel

To connect your own custom domain (e.g. `onamcelebration.com` or `pillaredeonam.kerala.in`):

1. On your Vercel Dashboard, select your project.
2. Go to **Settings > Domains**.
3. Type your custom domain name and click **Add**.
4. In your domain registrar (GoDaddy, Namecheap, Google Domains, Cloudflare, etc.), add the DNS records provided by Vercel:
   - **Type A Record**: `@` pointing to `76.76.21.21`
   - **Type CNAME Record**: `www` pointing to `cname.vercel-dns.com`
5. Vercel will automatically provision a free SSL/TLS certificate.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```
