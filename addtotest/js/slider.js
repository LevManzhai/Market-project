let  Myswiper = new Swiper('.slider-block', {
    slidesPerView: 1,
  });

  const sliderNavItems = document.querySelectorAll('.slider-nav__item');

  sliderNavItems.forEach((el, index) => {
    el.setAttribute('data-index', index);

    el.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index);

        Myswiper.slideTo(index)
    });
  });