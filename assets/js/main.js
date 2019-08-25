var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    slidesPerView: 6,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    centerInsufficientSlides: true,
    nested: true,
    height: 420,
    spaceBetween: 10
});

var swiperNested = new Swiper('.swiper-container-nested', {
    direction: 'vertical',
    slidesPerView: 4,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    centerInsufficientSlides: true,
    height: 260,
    spaceBetween: 15
});

var slideSpeed = 300;

$(function() {
    $('.accordion-contents .item .header').click(function() {
        var item = $(this).parent('.item');
        var currentActive = $('.accordion-contents .item.active');

        $(currentActive).children('.content').slideUp(300);

        $('.accordion-contents .item').removeClass('active');
        if ($(currentActive).index() !== $(item).index()) {
            $(item).children('.content').slideDown(slideSpeed);
            $(item).addClass('active');
        }
    });

    $(".close-right-area").on('click', function(e) {
        closeRightArea();
    });

    $(".slider-item-contents").on('click', '.data-item', function(e) {
        var accordionContentId = $(this).data('accordion-content');
        initRightAreaContent(accordionContentId);
    });

    $('.main-data-list').on('click', '.item-content', function(e) {

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $('.main-data-list .item-content').removeClass('active');
            $(this).addClass('active');
        }

        closeRightArea();

        var passiveSlide = $('.main-data-list .swiper-slide:not(.swiper-slide-active)');
        $(passiveSlide).find('.item-content-detail').hide();
        $(passiveSlide).find('.slider-item-contents').hide();

        var slideClicked = $('.main-data-list').find(".swiper-slide.swiper-slide-active");
        $(slideClicked).children('.item-content-detail').slideToggle(slideSpeed, function() {
            $(slideClicked).find('.slider-item-contents').fadeIn(slideSpeed);
        });
    });
});

function closeRightArea() {
    $('.right-area-container').removeClass('active');
    $('.right-area-container .button-area').removeClass('active');
    $('.right-area-container .accordion-contents').removeClass('active');
}

function initRightAreaContent(accordionContentId) {
    $('.right-area-container').addClass('active');
    $('.right-area-container .button-area').addClass('active');
    $('.right-area-container .accordion-contents.active .item.active .content').slideUp(slideSpeed);
    $('.right-area-container .accordion-contents.active .item').removeClass('active');
    $('.right-area-container .accordion-contents').removeClass('active');
    $('.right-area-container .accordion-contents#' + accordionContentId).addClass('active');

    var offsetValue = $('.swiper-container-nested .swiper-slide-active').offset();
}