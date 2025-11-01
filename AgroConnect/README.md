# 🌾 AgroConnect - Smart Farm-to-City Network

A beginner-friendly web platform connecting local farmers directly with urban buyers.

---

## 📁 Project Structure

```
AgroConnect/
│
├── config/                # Configuration files
│   ├── .env               # Environment variables (your credentials)
│   ├── firebase.json      # Firebase hosting config
│   ├── firestore.rules    # Database security rules
│   ├── package.json       # Dependencies
│   └── QUICKSTART.txt     # Quick reference guide
│
├── firebase/              # Firebase setup
│   ├── config.js          # Firebase initialization
│   ├── auth.js            # Login/signup functions
│   └── firestore.js       # Database functions
│
├── cloudinary/            # Image uploads
│   ├── config.js          # Cloudinary setup
│   └── upload.js          # Upload function
│
├── features/              # Core logic (empty - build as you learn!)
│   ├── farmer/            # Farmer dashboard features
│   ├── buyer/             # Buyer dashboard features
│   ├── admin/             # Admin tools
│   └── shared/            # Price suggestions, freshness score, utils
│
├── frontend/              # UI & assets
│   ├── index.html         # Landing page
│   ├── styles.css         # All styles
│   ├── app.js             # Main logic
│   └── components/        # Dashboard HTML files (you'll create these)
│
└── README.md              # This file
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd config
npm install
cd ..
```

### 2. Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Email/Password** authentication
4. Create **Firestore Database** (production mode)
5. Get your config from Project Settings
6. Update `config/.env` with your Firebase credentials
7. Update `firebase/config.js` with your Firebase credentials

### 3. Setup Cloudinary

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Create an **unsigned upload preset**
3. Update `config/.env` with your Cloudinary credentials
4. Update `cloudinary/config.js` with your Cloudinary credentials

### 4. Deploy Firestore Rules
```bash
cd config
firebase login
firebase init
firebase deploy --only firestore:rules
cd ..
```

### 5. Run Locally
```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server -p 8000

# Then open: http://localhost:8000/frontend/
```

### 6. Deploy to Firebase
```bash
cd config
firebase deploy
cd ..
```

---

## 🎯 What's Working Now

✅ Landing page with hero section  
✅ User authentication (Login/Signup)  
✅ Role selection (Farmer/Buyer/Admin)  
✅ Firebase integration ready  
✅ Cloudinary integration ready  
✅ Responsive design  
✅ Organized folder structure  

---

## 🏗️ What to Build Next

The `features/` folder is empty - this is where you'll build your features step by step!

### Week 1-2: Farmer Features
Create in `features/farmer/`:
- `addProduct.js` - Add products with images
- `manageInventory.js` - View/edit products
- `orders.js` - View incoming orders

Create in `frontend/components/`:
- `farmer-dashboard.html` - Farmer UI

### Week 3-4: Buyer Features
Create in `features/buyer/`:
- `browseProducts.js` - View all products
- `orderProduct.js` - Place orders
- `trackOrders.js` - View order history

Create in `frontend/components/`:
- `buyer-dashboard.html` - Buyer UI

### Week 5-6: Admin Features
Create in `features/admin/`:
- `verifyUsers.js` - Approve farmers
- `monitorTransactions.js` - View all orders
- `analytics.js` - Platform statistics

Create in `frontend/components/`:
- `admin-dashboard.html` - Admin UI

### Week 7-8: Shared Features
Create in `features/shared/`:
- `priceSuggestion.js` - AI price suggestions
- `freshnessScore.js` - Calculate freshness
- `utils.js` - Helper functions

---

## 📚 File Explanations

### Config Folder
- **.env**: Your Firebase and Cloudinary credentials (keep private!)
- **firebase.json**: Firebase hosting configuration
- **firestore.rules**: Database security rules
- **package.json**: Project dependencies
- **QUICKSTART.txt**: Quick reference guide

### Firebase Folder
- **config.js**: Initializes Firebase with your credentials
- **auth.js**: Handles user signup, login, logout
- **firestore.js**: Database operations (CRUD for users, products, orders)

### Cloudinary Folder
- **config.js**: Your Cloudinary credentials
- **upload.js**: Function to upload images

### Frontend Folder
- **index.html**: Landing page (entry point)
- **styles.css**: All your CSS styles
- **app.js**: Main application logic
- **components/**: Dashboard HTML files (you'll create these)

### Features Folder
- **Empty for now!** Build features as you learn
- Organize by role: farmer, buyer, admin
- Shared utilities go in `shared/`

---

## 🔧 Configuration

### config/.env
```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### firebase/config.js
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### cloudinary/config.js
```javascript
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME';
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';
```

---

## 🎓 Learning Path

### Phase 1: Setup (✅ Done!)
- Project structure created
- Firebase configured
- Cloudinary configured
- Landing page working

### Phase 2: Farmer Dashboard
1. Create `frontend/components/farmer-dashboard.html`
2. Create `features/farmer/addProduct.js`
3. Test adding products with images
4. Create `features/farmer/manageInventory.js`
5. Test viewing and deleting products

### Phase 3: Buyer Dashboard
1. Create `frontend/components/buyer-dashboard.html`
2. Create `features/buyer/browseProducts.js`
3. Test viewing products
4. Create `features/buyer/orderProduct.js`
5. Test placing orders

### Phase 4: Admin Dashboard
1. Create `frontend/components/admin-dashboard.html`
2. Create `features/admin/verifyUsers.js`
3. Test user verification
4. Create `features/admin/monitorTransactions.js`
5. Test viewing all orders

### Phase 5: Polish
1. Add price suggestions (`features/shared/priceSuggestion.js`)
2. Add freshness score (`features/shared/freshnessScore.js`)
3. Improve UI/UX
4. Test everything
5. Deploy!

---

## 💡 Tips for Beginners

1. **Start Small**: Build one feature at a time
2. **Test Often**: Check your code after each change
3. **Use Console**: Press F12 to see errors
4. **Read Errors**: They tell you what's wrong
5. **Google It**: Most problems have solutions online
6. **Ask for Help**: Use Stack Overflow

---

## 🐛 Common Issues

### "Firebase is not defined"
Make sure Firebase scripts load before your code:
```html
<!-- Firebase first -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<!-- Your code after -->
<script src="app.js"></script>
```

### "Permission denied" in Firestore
Deploy your security rules:
```bash
cd config
firebase deploy --only firestore:rules
```

### Images not uploading
1. Check Cloudinary preset is "unsigned"
2. Verify credentials in `cloudinary/config.js`

### Page doesn't load
Use a local server, don't open HTML directly:
```bash
python -m http.server 8000
```

---

## 📖 Resources

### Firebase
- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Auth](https://firebase.google.com/docs/auth)

### Cloudinary
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Upload Guide](https://cloudinary.com/documentation/upload_images)

### JavaScript
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)

---

## 🎯 Next Steps

1. **Configure Firebase** - Update `config/.env` and `firebase/config.js`
2. **Configure Cloudinary** - Update `config/.env` and `cloudinary/config.js`
3. **Deploy Rules** - Run `cd config && firebase deploy --only firestore:rules`
4. **Test Landing Page** - Run local server and test signup/login
5. **Build First Feature** - Start with farmer dashboard

---

## 📝 Notes

- All configuration files are in the `config/` folder
- The `features/` folder is intentionally empty
- Build features gradually as you learn
- Each feature should be in its own file
- Keep code organized by role (farmer/buyer/admin)
- Shared utilities go in `features/shared/`

---

## 🤝 Need Help?

- Check browser console (F12) for errors
- Read error messages carefully
- Google the error message
- Check Firebase Console for issues
- Ask on Stack Overflow
- Check `config/QUICKSTART.txt` for quick reference

---

## 📄 License

MIT License - Free to use for learning!

---

**Built with ❤️ for Intra-Department Tech Hackathon 2025, IIUC**

**Remember**: Every expert was once a beginner. Take your time and enjoy learning! 🚀
