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
- ☁️ **Cloud Ready** - Configured for Fly.io deployment

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
├── fly.toml            # Fly.io deployment config
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

## Deployment to Fly.io

### Prerequisites

1. Install the Fly.io CLI:
```bash
curl -L https://fly.io/install.sh | sh
```

2. Sign up and log in:
```bash
flyctl auth signup
# or
flyctl auth login
```

### Deploy Steps

1. **Initialize the app** (first time only):
```bash
flyctl launch
```
When prompted:
- Use the existing `fly.toml` configuration: **Yes**
- Would you like to set up a PostgreSQL database: **No**
- Would you like to set up a Redis database: **No**
- Would you like to deploy now: **No** (we'll do it manually)

2. **Update the app name** in `fly.toml` if needed:
```toml
app = "your-unique-app-name"
```

3. **Deploy your site**:
```bash
flyctl deploy
```

4. **Open your deployed site**:
```bash
flyctl open
```

### Update Deployment

After making changes, redeploy with:
```bash
flyctl deploy
```

### Useful Fly.io Commands

```bash
# Check app status
flyctl status

# View logs
flyctl logs

# Open app in browser
flyctl open

# SSH into the container
flyctl ssh console

# Check resource usage
flyctl monitor

# Scale the app
flyctl scale vm shared-cpu-1x --memory 256

# Delete the app
flyctl apps destroy your-app-name
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
- [Fly.io Documentation](https://fly.io/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)

## Tips

1. **Custom Domain**: Use `flyctl certs add your-domain.com` to add a custom domain
2. **Environment Variables**: Add secrets with `flyctl secrets set KEY=value`
3. **Multiple Regions**: Deploy to multiple regions for better global performance
4. **Scaling**: Start with minimal resources (256MB) and scale as needed
5. **Cost**: Fly.io offers a free tier that's perfect for static sites

---

Built with ❤️ using HTML, CSS, and JavaScript

