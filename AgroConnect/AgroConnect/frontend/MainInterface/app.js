// Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    setupAuthModal();
    checkAuthState();
});

// Check authentication state
function checkAuthState() {
    onAuthChange(async (user) => {
        if (user) {
            const userData = await getUserById(user.uid);
            if (userData) {
                redirectToDashboard(userData.role);
            }
        }
    });
}

// Redirect to dashboard based on role
function redirectToDashboard(role) {
    const dashboards = {
        'farmer': 'components/farmer-dashboard.html',
        'buyer': 'components/buyer-dashboard.html',
        'admin': 'components/admin-dashboard.html'
    };
    
    if (dashboards[role]) {
        window.location.href = dashboards[role];
    }
}

// Setup authentication modal
function setupAuthModal() {
    const modal = document.getElementById('authModal');
    const authBtn = document.getElementById('authBtn');
    const closeBtn = document.querySelector('.close');
    const authForm = document.getElementById('authForm');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const heroButtons = document.querySelectorAll('.hero-actions button');
    
    let currentMode = 'login';
    
    authBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });
    
    heroButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const role = btn.dataset.role;
            switchTab('signup');
            document.getElementById('userRole').value = role;
            modal.style.display = 'block';
        });
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });
    
    function switchTab(mode) {
        currentMode = mode;
        const signupFields = document.getElementById('signupFields');
        
        tabBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${mode}"]`).classList.add('active');
        
        if (mode === 'signup') {
            signupFields.style.display = 'block';
            document.getElementById('authTitle').textContent = 'Create Account';
        } else {
            signupFields.style.display = 'none';
            document.getElementById('authTitle').textContent = 'Login';
        }
    }
    
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('authError');
        
        errorDiv.textContent = '';
        
        try {
            if (currentMode === 'signup') {
                const displayName = document.getElementById('displayName').value;
                const role = document.getElementById('userRole').value;
                const location = document.getElementById('location').value;
                const phone = document.getElementById('phone').value;
                
                if (!role) {
                    errorDiv.textContent = 'Please select a role';
                    return;
                }
                
                const result = await signUp(email, password, {
                    displayName, role, location, phone
                });
                
                if (result.success) {
                    alert('Account created successfully!');
                    modal.style.display = 'none';
                } else {
                    errorDiv.textContent = result.error;
                }
            } else {
                const result = await signIn(email, password);
                
                if (result.success) {
                    alert('Successfully logged in!');
                    modal.style.display = 'none';
                } else {
                    errorDiv.textContent = result.error;
                }
            }
        } catch (error) {
            errorDiv.textContent = error.message;
        }
    });
}
