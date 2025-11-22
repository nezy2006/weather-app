# Deployment Guide for Weather App

This guide will help you deploy the weather app to your three Ubuntu servers with load balancing.

## Server Information

- **Web Server 1 (6897-web-01)**: 54.234.116.203
- **Web Server 2 (6897-web-02)**: 52.91.174.164
- **Load Balancer (6897-lb-01)**: 54.163.65.189

## Prerequisites

1. SSH access to all three servers
2. Nginx installed on all servers
3. SSH keys configured (or password access)

## Quick Deployment

### Option 1: Using the deployment script (Linux/Mac/Git Bash)

```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Using PowerShell (Windows)

```powershell
.\deploy.ps1
```

### Option 3: Manual Deployment

#### Step 1: Prepare web servers

On both web servers (6897-web-01 and 6897-web-02):

```bash
# Create directory
sudo mkdir -p /var/www/weather-app
sudo chown -R ubuntu:ubuntu /var/www/weather-app

# Copy files (from your local machine)
scp index.html style.css script.js ubuntu@54.234.116.203:/var/www/weather-app/
scp index.html style.css script.js ubuntu@52.91.174.164:/var/www/weather-app/
```

#### Step 2: Configure Nginx on web servers

On both web servers:

```bash
# Copy nginx config
sudo cp nginx-web-server.conf /etc/nginx/sites-available/weather-app
sudo ln -sf /etc/nginx/sites-available/weather-app /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

#### Step 3: Configure load balancer

On the load balancer (6897-lb-01):

```bash
# Copy nginx config
sudo cp nginx-load-balancer.conf /etc/nginx/sites-available/load-balancer
sudo ln -sf /etc/nginx/sites-available/load-balancer /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

## Verification

1. **Test individual web servers:**
   - http://54.234.116.203
   - http://52.91.174.164

2. **Test load balancer:**
   - http://54.163.65.189

3. **Check Nginx status:**
   ```bash
   sudo systemctl status nginx
   ```

4. **View Nginx logs:**
   ```bash
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

## Troubleshooting

### If Nginx is not installed:

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### If you get permission errors:

```bash
sudo chown -R ubuntu:ubuntu /var/www/weather-app
sudo chmod -R 755 /var/www/weather-app
```

### If Nginx config test fails:

```bash
sudo nginx -t
# Fix any errors shown, then reload
sudo systemctl reload nginx
```

### Check if ports are open:

```bash
sudo ufw status
# If needed, allow HTTP
sudo ufw allow 'Nginx Full'
```

## Load Balancing

The load balancer uses round-robin distribution by default. Requests will alternate between:
- Server 1: 54.234.116.203
- Server 2: 52.91.174.164

You can modify weights in `nginx-load-balancer.conf` if you want uneven distribution.

## Updating the App

To update the app, simply copy the new files to both web servers:

```bash
scp index.html style.css script.js ubuntu@54.234.116.203:/var/www/weather-app/
scp index.html style.css script.js ubuntu@52.91.174.164:/var/www/weather-app/
```

No need to restart Nginx for static file updates.

