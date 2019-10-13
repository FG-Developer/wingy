let mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    slidesPerView: 6,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    nested: true,
    height: 430,
    spaceBetween: 10,
    on: {
        touchMove: function(event) {
            $('.item-content-detail').hide();
            $('.item-content').removeClass('active');
        }
    }
});

$('.main-data-list').removeClass('swiper-container-android');

var swiperNested = new Swiper('.swiper-container-nested', {
    direction: 'vertical',
    slidesPerView: 5,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    height: 350,
    freeMode: true,
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    mousewheel: true
});

setMarginToMainDataList();

var slideSpeed = 300;

$(function() {

    $(window).resize(function() {
        setMarginToMainDataList();
    });

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

    $(".data-item").on('click', function(e) {
        $(".data-item").removeClass('active');
        $(this).addClass('active');
        var accordionContentId = $(this).data('accordion-content');
        initRightAreaContent(accordionContentId);
    });

    $('.main-data-list').on('click', '.item-content', function(e) {
        closeRightArea();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.main-data-list .item:not(.active) .item-content-detail').slideUp(slideSpeed);
            $('.main-data-list .item:not(.active) .item-content-detail').removeClass('active');
        } else {
            $('.main-data-list .item-content').removeClass('active');
            $(this).addClass('active');

            $('.main-data-list .item:not(.active) .item-content-detail').hide();
            $('.main-data-list .item:not(.active) .item-content-detail').removeClass('active');
            $(this).parent().children('.item-content-detail').slideDown(slideSpeed);
            $(this).parent().find('.slider-item-contents').show();
        }

    });
});

function closeRightArea() {

    if ($(window).width() <= 600) {
        $('.right-area-container').fadeOut(slideSpeed);
    }

    $('.right-area-container').removeClass('active');
    $('.right-area-container .button-area').removeClass('active');
    $('.right-area-container .accordion-contents.active .item.active .content').slideUp(slideSpeed);
    $('.right-area-container .accordion-contents.active .item').removeClass('active');
    $('.right-area-container .accordion-contents').removeClass('active');

}

function initRightAreaContent(accordionContentId) {

    if ($(window).width() <= 600) {
        $('.right-area-container').fadeIn(slideSpeed);
    }

    $('.right-area-container').addClass('active');
    $('.right-area-container .button-area').addClass('active');
    $('.right-area-container .accordion-contents.active .item.active .content').slideUp(slideSpeed);
    $('.right-area-container .accordion-contents.active .item').removeClass('active');
    $('.right-area-container .accordion-contents').removeClass('active');
    $('.right-area-container .accordion-contents#' + accordionContentId).addClass('active');

}

function setMarginToMainDataList() {

    if ($(window).height() > 945) {
        var textAreaHeight = $('.text-area').height();
        var calendarAreaHeight = $('.calendar-area').height() + 15;
        var daysHeight = $('.days').height();
        var mainDataListHeight = $('.main-data-list').height() + 30;
        var marginTop = parseFloat($('section.container').css('padding-top').replace('px', ''));
        var totalHeight = textAreaHeight + calendarAreaHeight + daysHeight + mainDataListHeight + marginTop;
        var wh = $(window).height();

        $('.main-data-list').css('margin-top', (wh - totalHeight));
    } else {
        $('.main-data-list').css('margin-top', 30);
        $('.close-right-area').attr('src', 'assets/img/black-close.png');
    }


    $('.accordion-contents').css('max-height', $('.right-area-container').height() - 100);


}