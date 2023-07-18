const swiperBox = document.querySelector(".swiper");
if (swiperBox) {
  const htmlSwiperBox = swiperBox.innerHTML;
  let swiper;
  initialSlider();
  window.addEventListener("resize", (e) => {
    toggleSlider();
  });

  function toggleSlider() {
    if (window.innerWidth < 1024) {
      swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        initialSlide: 1,
        coverflowEffect: {
          rotate: 15,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        spaceBetween: 0,
      });
    } else {
      if (swiperBox.innerHTML !== htmlSwiperBox) {
        swiperBox.innerHTML = htmlSwiperBox;
      }
    }
  }
  function initialSlider() {
    if (window.innerWidth < 1024) {
      swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        initialSlide: 1,
        coverflowEffect: {
          rotate: 15,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        spaceBetween: 0,
      });
    }
  }
}
