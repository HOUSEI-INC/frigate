#!/bin/bash
###
 # @Author: Ray
 # @Date: 2023-09-25 15:42:45
 # @LastEditTime: 2023-09-25 16:43:48
 # @LastEditors: Ray
 # @Description: 
 # @FilePath: /frigate/docker/main/build_web.sh
### 
set -e

env > /tmp/env.log

# Running web-builder script to build web interface
echo "Running web-builder script started."

# Update repositories
/usr/bin/apt update

# Remove existing Node.js if installed
if which node > /dev/null; then
    echo "Node.js is already installed, removing..."
    /usr/bin/apt-get purge -y nodejs npm
fi

# Install necessary packages for adding Nodesource GPG key
/usr/bin/apt-get install -y ca-certificates curl gnupg
mkdir -p /etc/apt/keyrings

# Add Nodesource GPG key
[ -f /etc/apt/keyrings/nodesource.gpg ] && rm /etc/apt/keyrings/nodesource.gpg
/usr/bin/curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# Add Node.js 16.x repository
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_16.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

# Update repositories again and install NodeJS
/usr/bin/apt update
/usr/bin/apt-get install -y nodejs

# Navigate to the web directory and install npm packages
cd /workspace/frigate/web
/usr/bin/npm install
/usr/bin/npm run build

mv /workspace/frigate/web/dist/BASE_PATH/monacoeditorwork/* dist/assets/

# Running web-builder script to build successfully
echo "Running web-builder script successful."
