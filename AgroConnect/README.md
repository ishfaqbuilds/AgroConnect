# 🌾 AgroConnect - Smart Farm-to-City Network

A simple web platform connecting farmers directly with urban buyers.

---

## 📁 Project Structure (Clean & Simple)

```
AgroConnect/
│
├── firebase/                  # Firebase code
│   ├── config.js              # Firebase initialization
│   ├── auth.js                # Login/signup functions
│   └── firestore.js           # Database functions
│
├── cloudinary/                # Image upload code
│   ├── config.js              # Cloudinary setup
│   └── upload.js              # Upload function
│
├── frontend/                  # Your web app (this gets deployed)
│   ├── firebase/              # Firebase (copied for hosting)
│   ├── cloudinary/            # Cloudinary (copied for hosting)
│   ├── index.html             # Landing page
│   ├── auth.html              # Login/Signup page
│   ├── styles.css             # All styles
│   └── app.js                 # Main logic
│
├── firebase.json              # Firebase hosting config
├── firestore.rules            # Database security rules
├── firestore.indexes.json     # Database indexes
└── README.md                  # This file
```

---

## 🚀 Quick Start

### 1. Enable Firebase Authentication

Go to: https://console.firebase.google.com/project/agroconnect-farm2city/authentication/providers

Enable:
- ✅ Email/Password
- ✅ Google

### 2. Create Firestore Database

Go to: https://console.firebase.google.com/project/agroconnect-farm2city/firestore

- Create database in **asia-south1 (Mumbai)**
- Start in production mode

### 3. Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

### 4. Test Locally

```bash
python -m http.server 8000
# Open: http://localhost:8000/frontend/
```

### 5. Deploy to Firebase

```bash
firebase deploy --only hosting
```

**Your site:** https://agroconnect-farm2city.web.app

---

## ✅ What's Working

- ✅ Landing page
- ✅ Beautiful authentication page (split design)
- ✅ Email/Password login
- ✅ Google Sign-In
- ✅ Role selection (Farmer/Buyer)
- ✅ Firebase integration
- ✅ Responsive design

---

## 🎯 Next Steps (Build Features)

### Create Dashboards:

1. **Farmer Dashboard** (`frontend/farmer-dashboard.html`)
   - Add products
   - Manage inventory
   - View orders

2. **Buyer Dashboard** (`frontend/buyer-dashboard.html`)
   - Browse products
   - Place orders
   - Track orders

3. **Admin Dashboard** (`frontend/admin-dashboard.html`)
   - Verify users
   - Monitor transactions
   - View statistics

---

## 🔧 Configuration

### Firebase (Already Configured ✅)
- Project: agroconnect-farm2city
- Location: asia-south1 (Mumbai)
- Authentication: Email/Password + Google

### Cloudinary (Need to Configure)
Edit `cloudinary/config.js`:
```javascript
const CLOUDINARY_CLOUD_NAME = 'your_cloud_name';
const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset';
```

---

## 📖 File Explanations

- **firebase/config.js** - Initializes Firebase
- **firebase/auth.js** - Login, signup, Google sign-in
- **firebase/firestore.js** - Database operations
- **cloudinary/upload.js** - Image upload function
- **frontend/index.html** - Landing page
- **frontend/auth.html** - Authentication page
- **frontend/styles.css** - All styles
- **frontend/app.js** - Main logic

---

## 🐛 Common Issues

### "Permission denied"
```bash
firebase deploy --only firestore:rules
```

### "Google Sign-In not working"
Enable Google in Firebase Console → Authentication → Sign-in method

### Page not loading
Use local server: `python -m http.server 8000`

---

## 📄 License

MIT License

---

**Built with ❤️ for Intra-Department Tech Hackathon 2025, IIUC**
