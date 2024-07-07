document.addEventListener('DOMContentLoaded', function() {
    const addToCartButton = document.getElementById('addCart2');
    const cartContentList = document.querySelector('.cart__content-list');
    let iconCartSpan = document.querySelector('.cart__count'); // 

    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            addToCart(1); //
        });
    } else {
        console.error('Button with id "addCart2" not found');
    }

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            // Function for searching for a product by its id
            const findProductById = (id) => {
                return products.find(product => product.id == id);
            };

            // Initializing the recycle bin from localStorage, if there is one
            let cart = [];
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            // Function for updating the cart and displaying the number of products
            const updateCartAndCount = () => {
                addCartToHTML();
                addCartToMemory();
                iconCartSpan.textContent = calculateTotalQuantity();
            };

            // Function for adding a product to cart by id
            const addToCart = (product_id) => {
                let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
                if (positionThisProductInCart < 0) {
                    cart.push({
                        product_id: product_id,
                        quantity: 1
                    });
                } else {
                    cart[positionThisProductInCart].quantity += 1;
                }
                updateCartAndCount();
            };

            
            const addCartToHTML = () => {
                cartContentList.innerHTML = '';
                cart.forEach(item => {
                    let product = findProductById(item.product_id);
                    let newItem = document.createElement('div');
                    newItem.classList.add('item-cart');
                    newItem.dataset.id = item.product_id;
                    newItem.innerHTML = `
                        <div class="image__cart">
                            <img class="photo__product" src="${product.image}">
                        </div>
                        <div class="cart__product-text">
                            <div class="name">${product.name}</div>
                            <div class="totalPrice">$${product.price * item.quantity}</div>
                        </div>
                        <div class="quantity">
                            <button class="minus">-</button>
                            <span>${item.quantity}</span>
                            <button class="plus">+</button>
                        </div>`;
                    cartContentList.appendChild(newItem);
                });
            };

            // Function to calculate the total number of items in a cart
            const calculateTotalQuantity = () => {
                return cart.reduce((total, item) => total + item.quantity, 0);
            };

            const addCartToMemory = () => {
                localStorage.setItem('cart', JSON.stringify(cart));
            };


        })
        .catch(error => {
            console.error('Error loading products.json:', error);
        });

});
