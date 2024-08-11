export default () => {
    const showMenuBtn = document.querySelector('.js-show-menu');
    const closeMenuBtn = document.querySelector('.js-close-menu');
    const menu = document.querySelector('.js-menu');
    const overlay = document.querySelector('.overlay');
    const menuLinks = menu.querySelectorAll('.nav__link');
    const html = document.querySelector('html');

    function closeMenu() {
        menu.classList.remove('menu-open');
        overlay.classList.remove('active');
        html.style.overflow = 'visible';
    }

    function openMenu() {
        menu.classList.add('menu-open');
        overlay.classList.add('active');
        html.style.overflow = 'hidden';
    }

    closeMenuBtn.addEventListener('click', closeMenu);
    showMenuBtn.addEventListener('click', openMenu);

    for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener("click", function () {
            closeMenu();
        });
    }

    function checkScreenWidth() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1024) {
            closeMenu();
        }
    }

    checkScreenWidth();

    window.addEventListener('resize', checkScreenWidth);
};