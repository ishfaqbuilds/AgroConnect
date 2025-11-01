// Database Functions

// ============ USER OPERATIONS ============
async function getUserById(uid) {
  try {
    const doc = await db.collection("users").doc(uid).get();
    return doc.exists ? doc.data() : null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}

async function updateUser(uid, updates) {
  try {
    await db.collection("users").doc(uid).update(updates);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============ PRODUCT OPERATIONS ============
async function addProduct(productData) {
  try {
    const docRef = await db.collection("products").add({
      ...productData,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getProducts() {
  try {
    const snapshot = await db.collection("products").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
}

async function getProductsByFarmer(farmerId) {
  try {
    const snapshot = await db
      .collection("products")
      .where("farmerId", "==", farmerId)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting farmer products:", error);
    return [];
  }
}

async function deleteProduct(productId) {
  try {
    await db.collection("products").doc(productId).delete();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============ ORDER OPERATIONS ============
async function createOrder(orderData) {
  try {
    const docRef = await db.collection("orders").add({
      ...orderData,
      status: "pending",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getOrdersByFarmer(farmerId) {
  try {
    const snapshot = await db
      .collection("orders")
      .where("farmerId", "==", farmerId)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting farmer orders:", error);
    return [];
  }
}

async function getOrdersByBuyer(buyerId) {
  try {
    const snapshot = await db
      .collection("orders")
      .where("buyerId", "==", buyerId)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting buyer orders:", error);
    return [];
  }
}

async function updateOrderStatus(orderId, status) {
  try {
    await db.collection("orders").doc(orderId).update({ status });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
