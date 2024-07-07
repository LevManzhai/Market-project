document.addEventListener('DOMContentLoaded', function() {
    const addToCartButton = document.getElementById('addCart2');
    const cartContentList = document.querySelector('.cart__content-list');

    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            // Ваш обработчик события
        });
    } else {
        console.error('Button with id "addCart2" not found');
    }
    fetch('products.json')
    .then(response => response.json())
    .then(products => {
        // Функция для поиска товара по его id
        const findProductById = (id) => {
            return products.find(product => product.id == id);
        };

        // Функция для обновления корзины и отображения количества товаров
        const updateCartAndCount = () => {
            addCartToHTML();
            addCartToMemory();
            iconCartSpan.textContent = calculateTotalQuantity();
        };

        // Функция для добавления товара в корзину по id
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

        // Обработчик для кнопки addCart2
        addToCartButton.addEventListener('click', () => {
            addToCart(1); // Предполагаем, что id=1 - это id товара для кнопки addCart2
        });

        // Обработчик для кнопки addCart
        // addToCartButton2.addEventListener('click', () => {
        //     addToCart(2); // Предполагаем, что id=2 - это id товара для кнопки addCart
        // });

        // Функция для добавления корзины в localStorage
        const addCartToMemory = () => {
            localStorage.setItem('cart', JSON.stringify(cart));
        };

        // Функция для отображения корзины на странице
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

        // Функция для вычисления общего количества товаров в корзине
        const calculateTotalQuantity = () => {
            return cart.reduce((total, item) => total + item.quantity, 0);
        };

        // Инициализация приложения после загрузки данных
        addDataToHTML();
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            updateCartAndCount();
        }
    })
    .catch(error => {
        console.error('Error loading products.json:', error);
    });

    // Другие операции, зависящие от загрузки DOM, могут быть добавлены здесь
});
// Загружаем данные из products.json
