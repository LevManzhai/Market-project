function calcModelPrice() {
    const cartItem = document.querySelectorAll('.order-modal__product');
    const totalPriceEl = document.querySelector('.summ');
    
    let totalPrice = 0 ;

    cartItem.forEach(function (item) {
    const priceEl = item.querySelector('.order-product__price');
    const currentModalPrice = parseInt(priceEl.innerText);
    totalPrice += currentModalPrice;
    });
    totalPriceEl.innerText = totalPrice;
};

function calcModel () {
    const Item = document.querySelectorAll('.order-modal__product');
    const totalItemEl = document.querySelector('.quantity');

    let totalItem = 0;

    Item.forEach(function (e) {
        const ItemEl = e.querySelector
    })
}