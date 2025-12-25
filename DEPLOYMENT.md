# Deployment Guide

## QR Code Download Feature

The QR code in the download section automatically detects devices and redirects users to the appropriate app store.

### How It Works

1. **QR Code URL**: Points to `/download` page
2. **Device Detection**: Automatically detects iOS, Android, or Desktop
3. **Smart Redirect**: 
   - iOS → App Store
   - Android → Play Store
   - Desktop → Shows both options

### Local Development

When testing locally:
- The QR code will point to `https://www.teamtuned.com/download` (production URL)
- This is intentional because localhost URLs don't work when scanned from mobile devices
- You can test the download page locally by visiting `http://localhost:3000/download`

### Production Deployment

When deployed to production:
- The QR code automatically uses the production domain
- Works on any domain (teamtuned.com, custom domains, etc.)
- No configuration needed

### Deploying to Vercel (Recommended)

1. Install Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

### Deploying to Other Platforms

The app works on any Next.js hosting platform:
- Vercel
- Netlify
- AWS Amplify
- Railway
- Render

Just ensure the `/download` route is accessible after deployment.

### Testing the QR Code

1. **Local Testing**: Visit `http://localhost:3000` and view the download section
2. **QR Code**: The QR code will point to production URL even in local dev
3. **Production Testing**: After deployment, scan the QR code from your phone to test auto-detection

### App Store URLs

- **App Store**: https://apps.apple.com/us/app/teamtuned/id6756356409
- **Play Store**: https://play.google.com/store/apps/details?id=com.waardian.teamtuned

These URLs are configured in `/src/utils/device-utils.ts`
