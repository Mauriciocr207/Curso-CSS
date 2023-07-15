(() => {
    const header = document.querySelector('header');
    window.addEventListener('scroll', e => {
        const scroll = window.scrollY;
        header.style.backgroundPositionY = `${scroll / 2}px`;
    })
})();