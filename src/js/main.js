import scrollSmooth from './helpers/smooth-scroll.js';
import menu from './modules/header.js';
import slider from './modules/slider.js';

function main() {
  slider();
}

scrollSmooth();
menu()

if (document.documentElement.clientWidth < 480) {
  window.addEventListener('scroll',
    function () {
      return setTimeout(main, 1000);
    }, {
      once: true
    });
} else {
  main();
};
