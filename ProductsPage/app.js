let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.cart__content-list');
let iconCart = document.querySelector('.cart__img');
let iconCartSpan = document.querySelector('.cart__count');
let fullPrice = document.querySelector('.fullprice');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
};

const printQuantity = () => {
    let productsListLength = listCartHTML.children.length;
    iconCartSpan.textContent = productsListLength;
};

const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach(item => {
        let product = products.find(p => p.id == item.product_id);
        total += product.price * item.quantity;
    });
    return total;
};

const printFullPrice = () => {
    let totalPrice = calculateTotalPrice();
    fullPrice.textContent = `${normalPrice(totalPrice)} $`;
};

const addDataToHTML = () => {
    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('article');
            let productLink;
            if (product.id === 1) {
                productLink = './SakariasArmchair.html';
            } else if (product.id === 2) {
                productLink = './Hangers38cm.html';
            } else if(product.id === 3) {
                productLink = './Hangers45cm.html';
            } else if(product.id === 4) {
                productLink = './Hangers43cm.html';
            }   
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <a href="${productLink}">
                    <div class="card__photo">
                        <img src="${product.image}" class="card__img-prod" alt="">
                    </div>
                    <div class="card__desc">
                        <h3 class="card__title">${product.name}</h3>
                        <a href="#" class="card__category">Hanger</a>
                        <div class="card__price" data-value="$">${product.price}</div>
                    </div>
                    <button class="addCart">Add To Cart</button>
                </a>`;
            listProductHTML.appendChild(newProduct);
        });
    }
};

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }
    updateCart();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let newItem = document.createElement('li');
            newItem.classList.add('item-cart');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            newItem.innerHTML = `
            <div class="image__cart">
                <img class="photo__product" src="${info.image}">
            </div>
            <div class="cart__product-text">
                <div class="name">${info.name}</div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
            </div>
            <div class="quantity">
                <button class="minus">-</button>
                <span>${item.quantity}</span>
                <button class="plus">+</button>
            </div>`;
            listCartHTML.appendChild(newItem);
        });
    }
    iconCartSpan.innerText = totalQuantity;
    printFullPrice();
};


const updateCartCount = (newCount) => {
    iconCartSpan.textContent = newCount;
    console.log('Updated cart count:', newCount);
};


const someFunction = () => {
  
    updateCartCount(0); 
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        event.stopPropagation(); // Prevent cart from closing
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
});

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity += 1;
                break;
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    updateCart();
};

const form = document.getElementById('.order');

const initApp = () => {
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    });
};
initApp();


listCartHTML.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart__product-delete')) {
        e.stopPropagation(); // Prevent cart from closing
        deleteProducts(e.target.closest('.item-cart'));
    }
});

const deleteProducts = (productParent) => {
    let id = productParent.dataset.id;
    let positionProductInCart = cart.findIndex((value) => value.product_id == id);
    if (positionProductInCart >= 0) {
        cart.splice(positionProductInCart, 1);
        updateCart();
    }
};

const modalBtn = document.querySelector('.order-modal__btn');
const orderModalList = document.querySelector('.order-modal__list');
const orderModalQuantity = document.querySelector('.order-modal__quantity span');
const orderModalSumm = document.querySelector('.order-modal__summ span');

orderModalList.addEventListener('click', (event) => {
    if (event.target.classList.contains('order-product__delete')) {
        event.stopPropagation(); // Prevent modal from closing
        let productParent = event.target.closest('.order-modal__item');
        deleteProductsFromModal(productParent);
    }
});

orderModalList.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent modal from closing
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.closest('.order-modal__item').dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
});

const modal = new GraphModal({
    isOpen: (modal) => {
        updateModalDetails();
        console.log('opened');
    },
    isClose: () => {
        console.log('closed');
    }
});
const orderModalOpenProd = document.querySelector('.order-modal__btn');
let flag = 0;
orderModalOpenProd.addEventListener('click', (e) => {
    if (flag == 0) {
        orderModalOpenProd.classList.add('open');
        orderModalList.style.display = 'block';
        flag = 1;
    } else {
        orderModalOpenProd.classList.remove('open');
        orderModalList.style.display = 'none';
        flag = 0;
    }
});

const updateModalDetails = () => {
    orderModalList.innerHTML = '';
    cart.forEach(item => {
        let product = products.find(p => p.id == item.product_id);
        let orderItem = document.createElement('li');
        orderItem.classList.add('order-modal__item');
        orderItem.dataset.id = item.product_id;
        orderItem.innerHTML = `
            <article class="order-modal__product order-product">
                <img class="order-product__img" src="${product.image}" alt="">
                <div class="order-product__text">
                    <h3 class="order-product__title">${product.name}</h3>
                    <div class="quantity__modal">
                        <span class="minus">-</span>
                        <span>${item.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                    <span class="order-product__price">${normalPrice(product.price * item.quantity)} $</span>
                </div>
                <button class="order-product__delete">Delete</button>
            </article>`;
        orderModalList.appendChild(orderItem);
    });
    orderModalSumm.textContent = `${normalPrice(calculateTotalPrice())} $`;
    orderModalQuantity.textContent = `${cart.reduce((acc, item) => acc + item.quantity, 0)} шт`;
};

const toggleModal = () => {
    let flag = modalBtn.classList.contains('open');
    if (!flag) {
        modalBtn.classList.add('open');
        orderModalList.style.display = 'block';
    } else {
        modalBtn.classList.remove('open');
        orderModalList.style.display = 'none';
    }
};


const deleteProductsFromModal = (productParent) => {
    let id = productParent.dataset.id;
    let positionProductInCart = cart.findIndex((value) => value.product_id == id);
    if (positionProductInCart >= 0) {
        cart.splice(positionProductInCart, 1);
        productParent.remove(); // Remove the product from the modal without closing it
        updateCart();
    }
};

// const myForm = document.querySelector('.order');
    
//     myForm.addEventListener('submit', function (event) {
//       // Отменяем стандартное поведение формы
//       event.preventDefault();
    
//       // Получаем данные из формы
//       const formData = new FormData(myForm);
//       let array = cartProductsList.querySelector('.simplebar-content').children;
//       let totalPrice = totalPrice.textContent;
     
    
     
//       for (item of array) {
//           console.log(item);
//       let img = item.querySelector('image__cart').getAttribute('src');
//       let title = item.querySelector('name').textContent;
//       let priceNumber = priceWithoutSpaces(item.querySelector('totalPrice').textContent);
//       let id = item.querySelector('item-cart').dataset.id;
//       let obj = {};
//       obj.title = title;
//       obj.price = priceNumber;
//       obj.totalPrice = totalPrice
//       obj.img = img
//       productArray.push(obj);
//       formData.append("title", obj.title);
//       formData.append("price", obj.price);
//       formData.append("fullprice", obj.totalPrice); 
//       formData.append("img", obj.img); 
//       // Отправляем данные на сервер
//       fetch('ajax.php', {
//         method: 'POST',
//         body: formData,
//       })
//         .then((response) => {
//           // Обрабатываем ответ от сервера
//           console.log(response);
//         })
//         .catch((error) => {
//           // Обрабатываем ошибку
//           console.error(error);
//         });
//     };
//     });

const updateCart = () => {
    addCartToHTML();
    addCartToMemory();
    updateModalDetails();
};
