// mobile nav
const mobileNavOpenBtn = document.querySelector('#open-mobile-nav-btn');
const mobileNavCloseBtn = document.querySelector('#close-mobile-nav-btn');
const mobileNav = document.querySelector('#mobile-nav');

mobileNavOpenBtn.onclick = function () {
    console.log("Opening mobile nav");
    mobileNav.classList.add('mobile-nav-wrapper--open');
    console.log(document.querySelector('.cart__count').textContent);
};

mobileNavCloseBtn.onclick = function () {
    console.log("Closing mobile nav");
    mobileNav.classList.remove('mobile-nav-wrapper--open');
    console.log(document.querySelector('.cart__count').textContent);
};
