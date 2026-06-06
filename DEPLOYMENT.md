# Vercel Deployment Guide

This guide will help you deploy StudyFlow to Vercel.

## Quick Deploy

The fastest way to deploy this project:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Manual Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your repository
5. Vercel will auto-detect the configuration:
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from project directory:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No
   - Project name? studyflow (or your preferred name)
   - Directory? ./ (current directory)

5. For production deployment:
```bash
vercel --prod
```

## Environment Configuration

This project uses localStorage and has no environment variables or backend dependencies. No additional configuration is needed.

## Build Configuration

The project includes a `vercel.json` file with optimized settings:

- **Build Command**: `pnpm build` (uses Vite)
- **Output Directory**: `dist`
- **SPA Routing**: All routes redirect to index.html
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **Cache Headers**: Optimized for static assets

## Project Settings

If you need to modify Vercel settings:

1. Go to your project in Vercel Dashboard
2. Navigate to Settings
3. Key settings:
   - **Node.js Version**: 18.x or higher
   - **Install Command**: `pnpm install`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`

## Performance Optimization

The project is already optimized for Vercel:

- ✅ Vite for fast builds
- ✅ Tree-shaking enabled
- ✅ Code splitting
- ✅ Asset optimization
- ✅ Cache headers configured
- ✅ Security headers enabled

## Post-Deployment

After deployment:

1. Vercel will provide a URL (e.g., `studyflow.vercel.app`)
2. The app will be live and accessible immediately
3. Any future pushes to your main branch will trigger automatic redeployments

## Custom Domain

To add a custom domain:

1. Go to Project Settings → Domains
2. Add your domain
3. Update your DNS records as instructed
4. Wait for DNS propagation (usually a few minutes)

## Troubleshooting

### Build Fails

- Ensure Node.js version is 18.x or higher
- Verify all dependencies are in package.json
- Check build logs in Vercel dashboard

### App Not Loading

- Verify dist folder is generated during build
- Check browser console for errors
- Ensure all assets are properly imported

### Routing Issues

- The vercel.json includes SPA routing configuration
- All routes redirect to index.html for client-side routing

## Support

For Vercel-specific issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

For StudyFlow-specific questions:
- Contact: ahmadrazahfa@gmail.com
