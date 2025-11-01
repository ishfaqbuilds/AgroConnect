// Login/Signup Functions

// Sign up new user
async function signUp(email, password, userData) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    await user.updateProfile({ displayName: userData.displayName });

    await db
      .collection("users")
      .doc(user.uid)
      .set({
        uid: user.uid,
        email: email,
        displayName: userData.displayName,
        role: userData.role,
        location: userData.location || "",
        phone: userData.phone || "",
        verified: userData.role === "buyer",
        trustScore: 5.0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sign in user
async function signIn(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sign out
async function logout() {
  try {
    await auth.signOut();
    window.location.href = "/frontend/index.html";
  } catch (error) {
    console.error("Logout error:", error);
  }
}

// Get current user
function getCurrentUser() {
  return auth.currentUser;
}

// Auth state listener
function onAuthChange(callback) {
  auth.onAuthStateChanged(callback);
}
