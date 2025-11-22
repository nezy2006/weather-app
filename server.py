#!/usr/bin/env python3
"""
Simple HTTP server for the weather app.
Run this script from the weather-app directory.
"""
import http.server
import socketserver
import webbrowser
import os

PORT = 8080

# Change to the directory where this script is located
os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    print(f"Serving from: {os.getcwd()}")
    print("Press Ctrl+C to stop the server")
    webbrowser.open(f'http://localhost:{PORT}/')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")

