#!/bin/bash

# Define package name
PACKAGE_NAME="rcm-platform-deploy.tar.gz"

# Create a deployment package excluding node_modules and other dev files
echo "📦 Packaging React application for Docker deployment..."
tar --exclude='node_modules' \
    --exclude='.git' \
    --exclude='dist' \
    --exclude='.DS_Store' \
    -czf $PACKAGE_NAME \
    .

echo "✅ Package created: $PACKAGE_NAME"
echo ""
echo "🚀 To deploy to your VPS, run the following commands manually:"
echo "---------------------------------------------------------"
echo "1. Upload to VPS:"
echo "   scp $PACKAGE_NAME user@your-vps-ip:/path/to/destination"
echo ""
echo "2. Connect to VPS:"
echo "   ssh user@your-vps-ip"
echo ""
echo "3. On VPS, extract and run:"
echo "   mkdir -p rcm-platform && tar -xzf $PACKAGE_NAME -C rcm-platform"
echo "   cd rcm-platform"
echo "   docker-compose up -d --build"
echo "---------------------------------------------------------"
