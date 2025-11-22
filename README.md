Weather App

A simple weather application that fetches weather data from OpenWeatherMap API.

Running the App Locally

Option 1: Using Python
python server.py
Open your browser at http://localhost:8080

Option 2: Using Node.js
npm install
npm start
Open your browser at http://localhost:8080

Option 3: Using Python built-in server
python -m http.server 8080
Open your browser at http://localhost:8080

Configuration

Copy config.example.js to config.js and add your OpenWeatherMap API key before running locally. Do not push config.js to GitHub.

Production Deployment

The app can be deployed to three Ubuntu servers with load balancing.

Web Server 1: 54.234.116.203
Web Server 2: 52.91.174.164
Load Balancer: 54.163.65.189

Quick Deploy

Windows PowerShell
.\deploy.ps1

Linux/Mac/Git Bash
chmod +x deploy.sh
./deploy.sh

Access

Load Balancer: http://54.163.65.189

Web Server 1: http://54.234.116.203

Web Server 2: http://52.91.174.164

Local Development

Make sure you run the server from the weather-app directory. Stop any previous server, navigate to the project folder, start the server, and clear your browser cache if needed.

Updating the App

To update, copy new files to both web servers. No need to restart Nginx for static files.