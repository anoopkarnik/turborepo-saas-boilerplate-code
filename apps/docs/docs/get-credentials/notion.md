---
title: "Notion OAuth"
description: "A step-by-step guide to setting up OAuth authentication for Notion API."
---

# Setting Up Notion OAuth

## 📌 Introduction
This guide provides step-by-step instructions on how to set up **OAuth authentication** for the **Notion API**. OAuth is required to securely access Notion data within your application.

---

## 🔑 Creating a Notion Integration for OAuth

1. **Sign Up or Log In to Notion**:
   - Visit [Notion Developers](https://www.notion.so/my-integrations).
   - Sign up for a new account or log in with existing credentials.

2. **Create a New Integration**:
   - Click on **Create New Integration**.
   - Choose the **workspace** where the integration will be used.

3. **Configure OAuth Settings**:
   - **Name**: Provide a name for your integration.
   - **Capabilities**: Select the permissions your integration requires.
   - **Redirect URIs**: Add the URIs where users will be redirected after authentication.

4. **Save and Retrieve Client Credentials**:
   - Once the integration is created, you will receive:
     - **Client ID**
     - **Client Secret**
     - **Authorization URL**

🚨 **Important**: Store these credentials securely as they will be used for authentication.

---

## ⚠️ Security Best Practices
- **Never expose your Client Secret** in public repositories.
- **Use environment variables** to store OAuth credentials securely.
- **Validate the `state` parameter** to prevent CSRF attacks.

📖 **For more details, refer to the official Notion OAuth documentation**: [Notion API Docs](https://developers.notion.com/).