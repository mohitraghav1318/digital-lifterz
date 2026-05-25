# 🚀 Digital Lifterz

**TURNING REACH TO REVENUE**

Digital Lifterz is a modern, conversion-focused digital agency website built to showcase services, build credibility, and help businesses transform their digital reach into measurable growth.

This project represents a premium frontend implementation using modern technologies, smooth animations, and scalable architecture.

---

## 🌐 Live Website

🔗 **Visit here:**
https://digital-lifterz.vercel.app

---

## ✨ Overview

Digital Lifterz is designed to present digital services in a clear, modern, and engaging way. The website focuses on:

* Professional service presentation
* Conversion-focused layout
* Modern UI/UX with smooth animations
* Clean and scalable component structure
* Fully responsive design

---

## 🎯 Key Features

* ✅ Modern and responsive layout
* ✅ Smooth animations using Framer Motion
* ✅ Glassmorphism and gradient UI
* ✅ Professional hero and services section
* ✅ Conversion-focused design structure
* ✅ Clean component-based architecture
* ✅ Fast performance with Vite
* ✅ Mobile-friendly and responsive

---

## 🛠 Tech Stack

**Frontend:**

* React.js
* Vite
* Tailwind CSS
* Framer Motion
* JavaScript (ES6+)

**Deployment:**

* Vercel

---

## 📁 Project Structure

```bash
digital-lifterz/
│
├── public/                 # Static files
│
├── src/
│   ├── assets/             # Images and logo
│   │
│   ├── components/
│   │   ├── layout/         # Navbar and layout components
│   │   └── sections/       # Hero, Services, Contact sections
│   │
│   ├── pages/              # Page components
│   ├── styles/             # Global styles
│   ├── data/               # Services and content data
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/digital-lifterz.git
```

### 2. Navigate to project folder

```bash
cd digital-lifterz
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## 🔐 Admin Panel

The services section can be managed from:

```bash
/admin
```

The admin panel uses Vercel API routes, an HTTP-only session cookie, rate-limited login attempts, and server-side validation. Passwords must be at least 8 characters and are stored only as a hash in environment variables.

For local development, create `.env` with:

```bash
ADMIN_PASSWORD=your-local-password
```

Then run:

```bash
npm run dev
```

Generate production secrets:

```bash
npm run admin:hash-password -- "your-strong-password"
```

Add the generated values to Vercel Environment Variables:

```bash
ADMIN_PASSWORD_HASH=pbkdf2:...
ADMIN_SESSION_SECRET=...
```

For a simpler setup, Vercel can also use this instead of `ADMIN_PASSWORD_HASH`:

```bash
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=replace-with-32-plus-character-secret
```

`ADMIN_PASSWORD_HASH` is preferred for production, but `ADMIN_PASSWORD` works when you need a straightforward deployment.

To persist service edits in production, connect Vercel KV or Upstash Redis and add:

```bash
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

The app falls back to bundled service data if KV is not configured, but production editing needs KV so updates survive serverless restarts.

---

## ⚡ Deployment

This project is deployed using **Vercel**.

To deploy:

1. Push code to GitHub
2. Connect repository to Vercel
3. Click Deploy

Vercel automatically handles build and hosting.

---

## 🎨 Design Focus

The website focuses on:

* Conversion-driven layout
* Clean visual hierarchy
* Modern glassmorphism UI
* Gradient branding and ambient glow effects
* Professional digital agency positioning

---

## 📈 Purpose of Project

This project was built to represent Digital Lifterz as a professional digital growth platform and provide a strong online presence for:

* Service showcase
* Client acquisition
* Brand credibility
* Digital marketing positioning

---

## 📬 Contact

**Digital Lifterz**

* Instagram: https://instagram.com/YOUR_USERNAME
* Email: [your@email.com](mailto:your@email.com)

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project.

---

## ⭐ Support

If you like this project, consider giving it a star on GitHub.

It helps and motivates further development.
