# GitHub Pages Deployment Guide

## Prerequisites
1. Make sure you have a GitHub account
2. Create a new repository on GitHub (e.g., `portfolio` or `my-portfolio`)

## Step-by-Step Deployment

### 1. Create GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon and select "New repository"
3. Name your repository (e.g., `portfolio`)
4. Make sure it's set to **Public** (required for free GitHub Pages)
5. **Don't** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 2. Update Vite Configuration
After creating your repository, update the `vite.config.js` file:

Replace:
```javascript
base: './',
```

With:
```javascript
base: '/your-repository-name/',
```

For example, if your repository is named `portfolio`:
```javascript
base: '/portfolio/',
```

### 3. Connect Local Repository to GitHub
Run these commands in your terminal:

```bash
# Add your GitHub repository as origin (replace with your details)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Push to GitHub
git push -u origin master
```

### 4. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch
6. Click "Save"

### 5. Wait for Deployment
- GitHub Actions will automatically build and deploy your site
- Check the "Actions" tab to see the deployment progress
- Once complete, your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

## Alternative: Manual Deployment
If you prefer manual deployment, you can use:

```bash
npm run deploy
```

This will build and deploy to the `gh-pages` branch.

## Custom Domain (Optional)
If you have a custom domain:
1. Add a CNAME file to the `public` folder with your domain
2. Update the GitHub repository settings to use your custom domain
3. Configure your domain's DNS to point to GitHub Pages

## Troubleshooting
- Make sure your repository is public
- Check that GitHub Actions have the necessary permissions
- Verify the base path in vite.config.js matches your repository name
- Check the Actions tab for any build errors
