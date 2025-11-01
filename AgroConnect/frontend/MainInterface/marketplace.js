// Marketplace Logic
let currentUser = null;
let currentProduct = null;

// Check authentication
onAuthChange(async (user) => {
    if (!user) {
        window.location.href = '../Authentication/auth.html';
        return;
    }
    
    currentUser = await getUserById(user.uid);
    if (!currentUser) {
        window.location.href = '../Authentication/auth.html';
        return;
    }
    
    // Set user info
    const initial = currentUser.displayName.charAt(0).toUpperCase();
    document.getElementById('userInitial').textContent = initial;
    document.getElementById('userInitialDropdown').textContent = initial;
    document.getElementById('userName').textContent = currentUser.displayName;
    document.getElementById('userEmail').textContent = currentUser.email;
    
    // Set role display
    const roleText = currentUser.role === 'farmer' ? 'Farmer' : 'Buyer';
    document.getElementById('userRole').textContent = roleText;
    
    // Show Create button only for farmers
    if (currentUser.role === 'farmer') {
        const createBtn = document.getElementById('createBtn');
        if (createBtn) {
            createBtn.style.display = 'block';
        }
    }
    
    loadProducts();
});

// Post Product (Farmers only)
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (currentUser.role !== 'farmer') {
        alert('Only farmers can post products');
        return;
    }
    
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseFloat(document.getElementById('productQuantity').value);
    const description = document.getElementById('productDescription').value;
    const imageFile = document.getElementById('productImage').files[0];
    
    let imageUrl = 'https://via.placeholder.com/400x300?text=No+Image';
    
    // Upload image to Cloudinary if provided
    if (imageFile) {
        const uploadResult = await uploadToCloudinary(imageFile);
        if (uploadResult.success) {
            imageUrl = uploadResult.url;
        }
    }
    
    try {
        await db.collection('products').add({
            name,
            category,
            price,
            quantity,
            description,
            imageUrl,
            farmerId: currentUser.uid,
            farmerName: currentUser.displayName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'available'
        });
        
        alert('Product posted successfully!');
        document.getElementById('productForm').reset();
        loadProducts();
    } catch (error) {
        alert('Error posting product: ' + error.message);
    }
});

// Load Products
async function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '<p style="text-align: center; padding: 2rem;">Loading products...</p>';
    
    try {
        const snapshot = await db.collection('products')
            .where('status', '==', 'available')
            .get();
        
        if (snapshot.empty) {
            productsGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No products available</h3>
                    <p>Click the "+ Add Sample Data" button to add products!</p>
                </div>
            `;
            return;
        }
        
        productsGrid.innerHTML = '';
        snapshot.forEach(doc => {
            const product = doc.data();
            product.id = doc.id;
            productsGrid.appendChild(createProductCard(product));
        });
    } catch (error) {
        productsGrid.innerHTML = `<p style="color: red;">Error loading products: ${error.message}</p>`;
    }
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const isOwnProduct = currentUser && currentUser.uid === product.farmerId;
    const isBuyer = currentUser && currentUser.role === 'buyer';
    
    card.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-header">
                <h3 class="product-name">${product.name}</h3>
                <span class="product-category">${getCategoryIcon(product.category)} ${product.category}</span>
            </div>
            <p class="product-description">${product.description || 'No description'}</p>
            <p class="product-farmer">👨‍🌾 ${product.farmerName}</p>
            <div class="product-details">
                <span class="product-price">৳${product.price}/kg</span>
                <span class="product-quantity">${product.quantity} kg available</span>
            </div>
            <div class="product-actions">
                ${isBuyer ? `<button class="btn-buy" onclick="openPurchaseModal('${product.id}')">Buy Now</button>` : ''}
                ${isOwnProduct ? `<button class="btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Get Category Icon
function getCategoryIcon(category) {
    const icons = {
        'vegetables': '🥬',
        'fruits': '🍎',
        'grains': '🌾',
        'dairy': '🥛',
        'other': '📦'
    };
    return icons[category] || '📦';
}

// Open Purchase Modal
async function openPurchaseModal(productId) {
    try {
        const doc = await db.collection('products').doc(productId).get();
        if (!doc.exists) {
            alert('Product not found');
            return;
        }
        
        currentProduct = doc.data();
        currentProduct.id = doc.id;
        
        document.getElementById('modalProductDetails').innerHTML = `
            <h3>${currentProduct.name}</h3>
            <p>Price: ৳${currentProduct.price}/kg</p>
            <p>Available: ${currentProduct.quantity} kg</p>
        `;
        
        document.getElementById('purchaseQuantity').max = currentProduct.quantity;
        document.getElementById('purchaseQuantity').value = 1;
        document.getElementById('totalPrice').textContent = currentProduct.price;
        
        document.getElementById('purchaseModal').style.display = 'block';
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Close Purchase Modal
function closePurchaseModal() {
    document.getElementById('purchaseModal').style.display = 'none';
    currentProduct = null;
}

// Update Total Price
document.getElementById('purchaseQuantity').addEventListener('input', (e) => {
    if (currentProduct) {
        const quantity = parseFloat(e.target.value) || 0;
        const total = quantity * currentProduct.price;
        document.getElementById('totalPrice').textContent = total.toFixed(2);
    }
});

// Purchase Form Submission
document.getElementById('purchaseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!currentProduct) return;
    
    const quantity = parseFloat(document.getElementById('purchaseQuantity').value);
    const totalPrice = quantity * currentProduct.price;
    
    if (quantity > currentProduct.quantity) {
        alert('Not enough quantity available');
        return;
    }
    
    try {
        // Create order
        await db.collection('orders').add({
            productId: currentProduct.id,
            productName: currentProduct.name,
            farmerId: currentProduct.farmerId,
            farmerName: currentProduct.farmerName,
            buyerId: currentUser.uid,
            buyerName: currentUser.displayName,
            quantity,
            pricePerKg: currentProduct.price,
            totalPrice,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Update product quantity
        const newQuantity = currentProduct.quantity - quantity;
        await db.collection('products').doc(currentProduct.id).update({
            quantity: newQuantity,
            status: newQuantity === 0 ? 'sold' : 'available'
        });
        
        alert('Order placed successfully!');
        closePurchaseModal();
        loadProducts();
    } catch (error) {
        alert('Error placing order: ' + error.message);
    }
});

// Delete Product (Farmers only)
async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
        await db.collection('products').doc(productId).delete();
        alert('Product deleted successfully');
        loadProducts();
    } catch (error) {
        alert('Error deleting product: ' + error.message);
    }
}

// Filter Products
async function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '<p style="text-align: center; padding: 2rem;">Loading products...</p>';
    
    try {
        let query = db.collection('products').where('status', '==', 'available');
        
        if (category) {
            query = query.where('category', '==', category);
        }
        
        const snapshot = await query.get();
        
        if (snapshot.empty) {
            productsGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No products found</h3>
                    <p>Try a different category</p>
                </div>
            `;
            return;
        }
        
        productsGrid.innerHTML = '';
        snapshot.forEach(doc => {
            const product = doc.data();
            product.id = doc.id;
            productsGrid.appendChild(createProductCard(product));
        });
    } catch (error) {
        productsGrid.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

// Logout
async function logout() {
    await auth.signOut();
    window.location.href = '../index.html';
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('purchaseModal');
    if (event.target === modal) {
        closePurchaseModal();
    }
}
