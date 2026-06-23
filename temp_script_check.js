

        const products = [
            {
                id: 1,
                name: "Classic White T-Shirt",
                price: 29.99,
                originalPrice: 49.99,
                category: "Men",
                emoji: "👕",
                discount: 40
            },
            {
                id: 2,
                name: "Blue Denim Jeans",
                price: 59.99,
                originalPrice: 99.99,
                category: "Men",
                emoji: "👖",
                discount: 40
            },
            {
                id: 3,
                name: "Casual Polo Shirt",
                price: 34.99,
                originalPrice: 59.99,
                category: "Men",
                emoji: "👕",
                discount: 42
            },
            {
                id: 4,
                name: "Black Formal Blazer",
                price: 79.99,
                originalPrice: 149.99,
                category: "Men",
                emoji: "🧥",
                discount: 47
            },
            {
                id: 5,
                name: "Summer Floral Dress",
                price: 44.99,
                originalPrice: 79.99,
                category: "Women",
                emoji: "👗",
                discount: 44
            },
            {
                id: 6,
                name: "Pink Casual Shirt",
                price: 32.99,
                originalPrice: 54.99,
                category: "Women",
                emoji: "👕",
                discount: 40
            },
            {
                id: 7,
                name: "Elegant Evening Gown",
                price: 89.99,
                originalPrice: 179.99,
                category: "Women",
                emoji: "👗",
                discount: 50
            },
            {
                id: 8,
                name: "Comfortable Yoga Pants",
                price: 39.99,
                originalPrice: 69.99,
                category: "Women",
                emoji: "👖",
                discount: 43
            },
            {
                id: 9,
                name: "Colorful Kids T-Shirt",
                price: 19.99,
                originalPrice: 34.99,
                category: "Kids",
                emoji: "👕",
                discount: 43
            },
            {
                id: 10,
                name: "Kids Denim Shorts",
                price: 24.99,
                originalPrice: 44.99,
                category: "Kids",
                emoji: "🩳",
                discount: 44
            },
            {
                id: 11,
                name: "Bright Kids Hoodie",
                price: 34.99,
                originalPrice: 59.99,
                category: "Kids",
                emoji: "🧥",
                discount: 42
            },
            {
                id: 12,
                name: "Comfy Kids Sweater",
                price: 29.99,
                originalPrice: 54.99,
                category: "Kids",
                emoji: "🧶",
                discount: 45
            }
        ];

        let cart = [];
        let filteredProducts = [...products];
        let isDarkMode = localStorage.getItem('darkMode') === 'true';

        document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
            hideLoadingAnimation();
        });

        function initializeApp() {
            // Load cart from localStorage
            loadCart();
            
            // Initialize dark mode
            applyDarkMode();
            
            // Display products
            displayProducts(products);
            
            // Setup event listeners
            setupEventListeners();
            
            // Update cart count
            updateCartCount();
        }

        // ==================== 
        // Dark/Light Mode Toggle
        // ==================== 

        function applyDarkMode() {
            const themeToggle = document.getElementById('themeToggle');
            
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
                themeToggle.innerHTML = '<span class="theme-icon">☀️</span>';
            } else {
                document.body.classList.remove('dark-mode');
                themeToggle.innerHTML = '<span class="theme-icon">🌙</span>';
            }
        }

       const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        localStorage.setItem('darkMode', isDarkMode);
        applyDarkMode();
    });
}
        // ==================== 
        // Loading Animation
        // ==================== 

        function hideLoadingAnimation() {
            const loadingAnimation = document.getElementById('loadingAnimation');
            setTimeout(() => {
                loadingAnimation.style.display = 'none';
            }, 1500);
        }

        // ==================== 
        // Setup Event Listeners
        // ==================== 

        function setupEventListeners() {
            // Search
            document.getElementById('searchInput').addEventListener('input', handleSearch);
            
            // Category Filter
            document.getElementById('categoryFilter').addEventListener('change', handleFilter);
            
            // Sort Filter
            document.getElementById('sortFilter').addEventListener('change', handleSort);
            
            // Cart Button
            document.getElementById('cartBtn').addEventListener('click', openCart);
            
            // Hamburger Menu
            const hamburgerMenu = document.getElementById('hamburgerMenu');
            const navMenu = document.getElementById('navMenu');
            
            hamburgerMenu.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburgerMenu.style.transform = navMenu.classList.contains('active') 
                    ? 'rotate(90deg)' 
                    : 'rotate(0)';
            });
            
            // Close menu when link is clicked
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    hamburgerMenu.style.transform = 'rotate(0)';
                    updateActiveLink(link);
                });
            });
            
            // Close cart when clicking outside
            document.getElementById('cartModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeCart();
                }
            });
        }

        // ==================== 
        // Navigation Active Link
        // ==================== 

        function updateActiveLink(clickedLink) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            clickedLink.classList.add('active');
        }

        // ==================== 
        // Display Products
        // ==================== 

        function displayProducts(productsToDisplay) {
            const productsGrid = document.getElementById('productsGrid');
            const noProductsMessage = document.getElementById('noProductsMessage');
            
            if (productsToDisplay.length === 0) {
                productsGrid.innerHTML = '';
                noProductsMessage.style.display = 'block';
                return;
            }
            
            noProductsMessage.style.display = 'none';
            
            productsGrid.innerHTML = productsToDisplay.map(product => `
                <div class="product-card" data-product-id="${product.id}">
                    <div class="product-image">${product.emoji}</div>
                    <div class="product-info">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-name">${product.name}</h3>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                            <span class="product-original-price">$${product.originalPrice.toFixed(2)}</span>
                            <span class="product-discount">-${product.discount}%</span>
                        </div>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // ==================== 
        // Search Functionality
        // ==================== 

        function handleSearch() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const categoryFilter = document.getElementById('categoryFilter').value;
            
            filteredProducts = products.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(searchTerm);
                const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
                return matchesSearch && matchesCategory;
            });
            
            applySort();
            displayProducts(filteredProducts);
        }

        // ==================== 
        // Filter by Category
        // ==================== 

        function handleFilter() {
            handleSearch();
        }

        // ==================== 
        // Sort Products
        // ==================== 

        function handleSort() {
            applySort();
            displayProducts(filteredProducts);
        }

        function applySort() {
            const sortOption = document.getElementById('sortFilter').value;
            
            if (sortOption === 'low-to-high') {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sortOption === 'high-to-low') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }
        }

        // ==================== 
        // Reset Filters
        // ==================== 

        function resetFilters() {
            document.getElementById('searchInput').value = '';
            document.getElementById('categoryFilter').value = '';
            document.getElementById('sortFilter').value = '';
            
            filteredProducts = [...products];
            displayProducts(products);
        }

        // ==================== 
        // Shopping Cart Functions
        // ==================== 

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            saveCart();
            updateCartCount();
            showSuccessMessage('Added to cart!');
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            saveCart();
            updateCartCount();
            displayCart();
        }

        function updateQuantity(productId, quantity) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity = parseInt(quantity);
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    saveCart();
                    updateCartCount();
                    displayCart();
                }
            }
        }

        function updateCartCount() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cartCount').textContent = totalItems;
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function loadCart() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
            }
        }

        // ==================== 
        // Cart Modal Functions
        // ==================== 

        function openCart() {
            document.getElementById('cartModal').classList.add('active');
            displayCart();
        }

        function closeCart() {
            document.getElementById('cartModal').classList.remove('active');
        }

        function displayCart() {
            const cartItemsContainer = document.getElementById('cartItemsContainer');
            const cartEmpty = document.getElementById('cartEmpty');
            const cartItemCount = document.getElementById('cartItemCount');
            const summaryItems = document.getElementById('summaryItems');
            
            const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartItemCount.textContent = `${itemCount} item${itemCount === 1 ? '' : 's'}`;
            summaryItems.textContent = itemCount;
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '';
                cartEmpty.style.display = 'flex';
                return;
            }
            
            cartEmpty.style.display = 'none';
            
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">${item.emoji}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            `).join('');
            
            updateCartTotal();
        }

        function updateCartTotal() {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.getElementById('cartTotal').textContent = '$' + total.toFixed(2);
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            const paymentType = document.querySelector('input[name="paymentType"]:checked')?.value || 'Cash on Delivery';
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert(`Thank you for your purchase!\nTotal: $${total.toFixed(2)}\nPayment method: ${paymentType}\n\nThis is a demo store. No actual payment will be processed.`);
            
            // Clear cart after checkout
            cart = [];
            saveCart();
            updateCartCount();
            closeCart();
            displayCart();
        }

        // ==================== 
        // Contact Form Validation
        // ==================== 

        function submitContactForm(event) {
            event.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Clear previous errors
            clearFormErrors();
            
            // Name validation
            if (name.value.trim() === '') {
                showFormError('name', 'Name is required');
                isValid = false;
            } else if (name.value.trim().length < 3) {
                showFormError('name', 'Name must be at least 3 characters');
                isValid = false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                showFormError('email', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showFormError('email', 'Please enter a valid email');
                isValid = false;
            }
            
            // Message validation
            if (message.value.trim() === '') {
                showFormError('message', 'Message is required');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showFormError('message', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If valid, show success message
            if (isValid) {
                showSuccessMessage('Message sent successfully!');
                document.getElementById('contactForm').reset();
            }
        }

        function showFormError(fieldId, errorMessage) {
            const formGroup = document.getElementById(fieldId).parentElement;
            formGroup.classList.add('error');
            document.getElementById(fieldId + 'Error').textContent = errorMessage;
        }

        function clearFormErrors() {
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
                const errorSpan = group.querySelector('.error-message');
                if (errorSpan) errorSpan.textContent = '';
            });
        }

        // Remove error on input
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.parentElement.classList.remove('error');
                this.parentElement.querySelector('.error-message').textContent = '';
            });
        });

        // ==================== 
        // Newsletter Subscription
        // ==================== 

        function subscribeNewsletter() {
            const email = document.getElementById('newsletterEmail').value;
            
            if (email === '') {
                alert('Please enter your email');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email');
                return;
            }
            
            document.getElementById('newsletterEmail').value = '';
            showSuccessMessage('Thank you for subscribing!');
        }

        // ==================== 
        // Success Message
        // ==================== 

        function showSuccessMessage(message) {
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = message;
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }

        // ==================== 
        // Smooth Scrolling for Navigation
        // ==================== 

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                }
            });
        });

        // ==================== 
        // Intersection Observer for Fade-in Animations
        // ==================== 

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all product cards
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                document.querySelectorAll('.product-card').forEach(card => {
                    observer.observe(card);
                });
            }, 100);
        });

        // ==================== 
        // Keyboard Navigation
        // ==================== 

        document.addEventListener('keydown', function(e) {
            // Close cart with Escape key
            if (e.key === 'Escape') {
                closeCart();
            }
        });

        // ==================== 
        // Mobile Optimization
        // ==================== 

        // Prevent body scroll when cart is open
        const cartModal = document.getElementById('cartModal');
        const observer2 = new MutationObserver(function() {
            if (cartModal.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        observer2.observe(cartModal, { attributes: true });

        // ==================== 
        // Console Welcome Message
        // ==================== 

        console.log('%c🛍️ Welcome to Fashion Hub!', 'font-size: 20px; color: #667eea; font-weight: bold;');
        console.log('%cEnjoy shopping at the best prices!', 'font-size: 14px; color: #764ba2;');
    