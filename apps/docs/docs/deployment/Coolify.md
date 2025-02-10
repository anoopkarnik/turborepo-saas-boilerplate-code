---
title: "Deploying Using Coolify on an EC2 Server"
description: "A step-by-step guide to installing and deploying applications using Coolify on an EC2 instance."
---

# Deploying Using Coolify on an EC2 Server

## 📌 Introduction
This guide provides step-by-step instructions on how to **install and deploy applications using Coolify** on an **AWS EC2 server**. **Coolify** is an open-source self-hosted alternative to **Vercel/Netlify** that simplifies deployment.

---

## 🔧 Setting Up EC2 Instance

### **1️⃣ Launch an EC2 Instance**
1. Log in to the **AWS Console**.
2. Navigate to **EC2 Dashboard**.
3. Click **Launch Instance** and configure:
   - **Choose Ubuntu 22.04 LTS** (recommended) or Debian.
   - **Select an instance type** (`t2.medium` or higher recommended).
   - **Configure storage** (at least **20GB** recommended).
   - **Allow inbound traffic on ports 80, 443, and 3000**.
   - **Use an SSH key pair** for secure access.

4. Click **Launch** and connect to the instance via SSH:
   ```sh
   ssh -i your-key.pem ubuntu@your-ec2-public-ip
   ```

---

## 🛠 Installing Coolify on EC2

### **2️⃣ Install Docker and Dependencies**
Run the following commands to install **Docker** and **Docker Compose**:
```sh
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose
sudo systemctl enable --now docker
```

### **3️⃣ Install Coolify**
```sh
sudo docker run -d \
  --name coolify \
  --restart=always \
  -p 80:80 \
  -p 443:443 \
  -p 3000:3000 \
  -v /var/lib/coolify:/data \
  coollabsio/coolify
```

This runs Coolify as a **Docker container** and exposes it on port `80`, `443`, and `3000`.

### **4️⃣ Access Coolify Dashboard**
- Open your browser and visit: `http://your-ec2-public-ip`
- Follow the **on-screen instructions** to complete the setup.

---

## 🚀 Deploying an Application on Coolify

### **5️⃣ Connect a Git Repository**
1. Log in to **Coolify Dashboard**.
2. Click **New Application** → **Git Repository**.
3. Connect your **GitHub, GitLab, or Bitbucket** account.
4. Select the repository to deploy.

### **6️⃣ Configure Build and Deployment**
1. Set **Build Commands** (for example, for Next.js):
   ```sh
   npm install && npm run build
   ```
2. Set **Start Command**:
   ```sh
   npm run start
   ```
3. Click **Deploy**.

### **7️⃣ Verify Deployment**
- Once deployed, visit the provided URL.
- For **custom domains**, configure **DNS settings** to point to your EC2 server.

---

## 🎯 Conclusion
Deploying applications using **Coolify** on an **EC2 server** provides **full control, scalability, and cost-effectiveness** while maintaining the simplicity of modern deployment platforms.

📖 **For more details, refer to the official Coolify documentation:**
- [Coolify Docs](https://coolify.io/)
