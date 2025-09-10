# 🚀 GitHub Pages Deployment Guide

## 📋 Prerequisites

1. Make sure your repository is on GitHub
2. You have admin access to the repository settings

## ⚙️ Setup Instructions

### 1. Configure GitHub Pages Source

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. In the left sidebar, click **Pages**
4. Under **Build and deployment**:
   - Select **GitHub Actions** as the source

### 2. Set Environment Variables

1. In your repository **Settings**, go to **Secrets and variables** → **Actions**
2. Click **New repository variable**
3. Add the following variable:
   - Name: `NEXT_PUBLIC_GITHUB_USERNAME`
   - Value: Your GitHub username (e.g., `octocat`)

### 3. Trigger Deployment

1. Make a commit to your `main` branch
2. Go to **Actions** tab to see the deployment progress
3. After successful deployment, your site will be available at:
   `https://<your-username>.github.io/<repository-name>/`

## 🛠️ Workflow Details

The deployment workflow (`/.github/workflows/deploy.yml`) automatically:

- Builds your Next.js application
- Exports it as a static site
- Deploys it to GitHub Pages

## 🔄 Manual Deployment

If you need to trigger deployment manually:

1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

## 🧪 Testing Locally

Before deploying, you can test the build process locally:

```bash
# Install dependencies
npm install

# Build and export
npm run build

# Serve locally (optional)
npx serve out
```

## 🔧 Troubleshooting

### Build Issues
- Check the Actions logs for error messages
- Ensure all dependencies are correctly installed
- Verify environment variables are set correctly

### Deployment Issues
- Make sure GitHub Pages is set to deploy from GitHub Actions
- Check that your repository is not private (GitHub Pages requires public repositories for free tier)

### Custom Domain (Optional)
1. In repository **Settings** → **Pages**
2. Enter your custom domain in the **Custom domain** field
3. Follow GitHub's instructions for DNS configuration