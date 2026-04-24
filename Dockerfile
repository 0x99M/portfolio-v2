# Use nginx alpine for minimal footprint
FROM nginx:alpine

# Copy website files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY 404.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY favicon.svg /usr/share/nginx/html/
COPY images /usr/share/nginx/html/images

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 for Railway/nginx
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

