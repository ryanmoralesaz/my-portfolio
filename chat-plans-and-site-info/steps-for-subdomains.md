## Option 1: Subdomain Approach (Recommended)
Use subdomains for each project and link from your main portfolio:

**DNS Setup in Cloudflare:**
- `coolproject1.ryanmorales.info` → CNAME to `ryanmoralesaz.github.io/coolproject1`
- `coolproject2.ryanmorales.info` → CNAME to `ryanmoralesaz.github.io/coolproject2`

**Your portfolio links:**
- Live: `https://coolproject1.ryanmorales.info`
- Code: `https://github.com/ryanmoralesaz/coolproject1`

## Option 2: Reverse Proxy with Cloudflare Workers
Set up path-based routing using Cloudflare Workers:

**Create a Cloudflare Worker:**
```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Route /projects/coolproject1/live to GitHub Pages
    if (url.pathname.startsWith('/projects/') && url.pathname.endsWith('/live')) {
      const project = url.pathname.split('/')[2];
      return fetch(`https://ryanmoralesaz.github.io/${project}/`);
    }

    // Route /projects/coolproject1/code to GitHub repo
    if (url.pathname.startsWith('/projects/') && url.pathname.endsWith('/code')) {
      const project = url.pathname.split('/')[2];
      return Response.redirect(`https://github.com/ryanmoralesaz/${project}`, 302);
    }

    // Default to your main portfolio
    return fetch(`https://ryanmoralesaz.github.io${url.pathname}`);
  }
}
```

## Option 3: GitHub Pages with Multiple Repos
Deploy each project to its own GitHub Pages repo:

**Repository structure:**
- `ryanmoralesaz.github.io` (main portfolio)
- `coolproject1` repo with GitHub Pages enabled
- `coolproject2` repo with GitHub Pages enabled

**Your main portfolio would link to:**
- Live: `https://ryanmoralesaz.github.io/coolproject1/`
- Code: `https://github.com/ryanmoralesaz/coolproject1`

## Option 4: Single Repo with Subfolders (Simplest)
Keep everything in your main portfolio repo but organize by folders:

**Folder structure:**
```
my-portfolio/
├── src/ (main portfolio)
├── projects/
│   ├── coolproject1/
│   ├── coolproject2/
└── dist/
    ├── index.html (main portfolio)
    └── projects/
        ├── coolproject1/
        └── coolproject2/
```

**Build process updates needed:**
- Modify your build to handle multiple entry points
- Each project gets its own build output in `dist/projects/`

## Best Recommendation:
Start with **Option 1 (Subdomains)** because:
- Clean, professional URLs
- Easy to set up and maintain
- Each project can have its own repo and deployment
- Scales well as you add more projects
