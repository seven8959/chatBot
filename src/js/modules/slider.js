export default () => {
    $('.slider__inner').slick({
        slidesToShow: 1,
        dots: false,
        slidesToScroll: 1,
        infinite: false,
        prevArrow: '.arrow__left',
        nextArrow: '.arrow__right',
    });
}