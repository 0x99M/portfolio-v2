# Anonymous Developer Portfolio

A minimal, clean, and modern portfolio website built with vanilla HTML, CSS, and JavaScript. Features a dynamic projects page managed through JSON configuration.

## Features

- 🎨 **Calm Minimal Design** - Soft palette, Delius typography, airy layouts
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🚀 **Fast Loading** - Optimized static site with nginx serving
- 📊 **JSON-Driven Projects** - Easy project management through `projects.json`
- 🖼️ **Image Support** - Beautiful project showcases with hover effects
- ✨ **Simple Animations** - IntersectionObserver-powered fade-up reveals
- 🔒 **Anonymous** - No personal identifiers, privacy-focused
- ☁️ **Cloud Ready** - Works out of the box on Railway using the provided Dockerfile

## Project Structure

```
portfolio-v2/
├── index.html          # Main portfolio page
├── projects.html       # Projects showcase page
├── styles.css          # All styling (clean minimal design)
├── script.js           # Interactivity and animations
├── projects.json       # Project data (edit this to add/update projects)
├── images/             # Project images directory
├── Dockerfile          # Container configuration
├── nginx.conf          # Web server configuration
└── README.md           # This file
```

## Local Development

### Option 1: Python Simple Server
```bash
python3 -m http.server 8000
```
Then visit: http://localhost:8000

### Option 2: Node.js HTTP Server
```bash
npx http-server -p 8000
```
Then visit: http://localhost:8000

### Option 3: VS Code Live Server
Install "Live Server" extension and click "Go Live" in the status bar.

## Managing Projects

Edit `projects.json` to add, update, or remove projects:

```json
{
  "projects": [
    {
      "title": "Project Name",
      "description": "Brief description of the project",
      "image": "images/project-image.png",
      "link": "https://project-url.com",
      "technologies": ["Tech1", "Tech2", "Tech3"]
    }
  ]
}
```

### Adding Images

1. Add your project images to the `images/` directory
2. Update the `image` field in `projects.json` with the path
3. Recommended specs:
   - Format: PNG or JPG
   - Size: 1200x800px (3:2 aspect ratio)
   - File size: < 500KB for optimal loading

## Deployment to Railway

### Prerequisites

1. Create a free account at [Railway](https://railway.app/)
2. (Optional) Install the Railway CLI: `npm i -g @railway/cli`

### Deploy Steps (Dashboard)

1. Create a new project and select **Deploy from GitHub** or **Deploy from Repo**
2. Point Railway to this repository and keep the default Docker deployment
3. Set the environment variable `PORT=8080` (Railway auto-injects `PORT`, but setting it explicitly avoids warnings)
4. Click **Deploy** – the provided `Dockerfile` serves the site with nginx on port 8080
5. Once the build finishes, open the generated domain under **Settings → Domains**

### Deploy Steps (CLI)

1. Authenticate: `railway login`
2. From the project root run:
```bash
railway init --new
railway up
```
Railway detects the Dockerfile and builds/publishes the container automatically

### Update Deployment

After pushing changes to your main branch (or from the CLI), trigger a redeploy:
```bash
railway up
```

### Useful Railway Commands

```bash
# Check currently linked project/service
railway status

# Tail logs
railway logs

# List generated domains
railway domains

# Open the project dashboard in your browser
railway open

# Remove the project/service
railway down --delete
```

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --color-page: #f7f7f3;
    --color-surface: #ffffff;
    --color-accent: #3f51f5;
    --color-text: #1b1a1e;
    /* tweak additional tokens in styles.css */
}
```

### Updating Content

1. **Experience/Skills/Education**: Edit `index.html` directly
2. **Projects**: Edit `projects.json`
3. **Email**: Replace `me@0x99m.com` in both HTML files
4. **Logo**: Replace `0x99m` in the nav section

### Animations

- Elements with `data-animate` fade up via an IntersectionObserver in `script.js`.
- When injecting new content (e.g., after fetching projects), call `window.refreshAnimations()` to register it.

### Adding Sections

1. Add new section in `index.html`
2. Add corresponding styles in `styles.css`
3. Update navigation links

## Performance

- Gzip compression enabled
- Static asset caching (1 year)
- Optimized images with lazy loading
- Minimal JavaScript footprint
- Fast nginx serving

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Headers

The following security headers are configured in `nginx.conf`:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

## License

This is a personal portfolio template. Feel free to use and modify as needed.

## Support

For issues or questions about deployment, refer to:
- [Railway Documentation](https://docs.railway.app/)
- [Nginx Documentation](https://nginx.org/en/docs/)

## Tips

1. **Custom Domain**: Add domains in the Railway dashboard under **Settings → Domains**
2. **Environment Variables**: Manage secrets in **Variables** and Railway injects them at runtime
3. **Metrics**: Monitor deploys, logs, and usage from the Railway dashboard
4. **Scaling**: Upgrade service plans or adjust concurrency from the **Deployments** tab
5. **Cost**: Railway’s free tier comfortably hosts this static site

---

Built with ❤️ using HTML, CSS, and JavaScript

