const swiper = new Swiper('.swiper', {

   
    // loop: true,
  
    slidesPerView: 1,
    spaceBetween: 42,
    freeMode: true,

    breakpoints: {
        600: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        920: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
    //     1024: {
    //       slidesPerView: 5,
    //       spaceBetween: 50,
    //     },
     1230: {
            slidesPerView: 4,
           spaceBetween: 42,
 },
},
    //    
  
    // Navigation arrows
    navigation: {
      nextEl: '#sliderNext',
      prevEl: '#sliderPrev',
    },
  
  });

  // tabs

  const tabsBtns = document.querySelectorAll('[data-tab]');
  const tabsProducts = document.querySelectorAll('[data-tab-value]');


  for (let btn of tabsBtns) {

    btn.addEventListener('click', function () {

// remove active classes
      for (let btn of tabsBtns) {
        btn.classList.remove('tab-controls__btn--active');
      }

// add active class for THIS btn
      this.classList.add('tab-controls__btn--active');


// hide all products 
      for (let product of tabsProducts) {
// check for display all slides 

        if(this.dataset.tab === 'all') {
          product.classList.remove('none');
        } else {

        if(product.dataset.tabValue === this.dataset.tab) {
          product.classList.remove('none');
        } else {
          product.classList.add('none');
        }
      }
    }

// update swiper
      swiper.update()


// show products needed 
       

    })
  }

  // mobile nav
  const mobileNavOpenBtn = document.querySelector('#open-mobile-nav-btn');
  const mobileNavCloseBtn = document.querySelector('#close-mobile-nav-btn');
  const mobileNav = document.querySelector('#mobile-nav');


  mobileNavOpenBtn.onclick = function () {
    mobileNav.classList.add('mobile-nav-wrapper--open')
  }


  mobileNavCloseBtn.onclick = function () {
    mobileNav.classList.remove('mobile-nav-wrapper--open')
  }


  