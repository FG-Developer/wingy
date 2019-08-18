var slideSpeed = 300;


var currentTop = 0;

var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    slidesPerView: 6,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    centerInsufficientSlides: true,
    nested: true,
    height: 420,
    spaceBetween: 10,
    on: {
        click: function(e) {
            currentTop = e.screenY;
        }
    }
});

var swiperNested = new Swiper('.swiper-container-nested', {
    direction: 'vertical',
    slidesPerView: 4,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    centerInsufficientSlides: true,
    height: 260,
    spaceBetween: 15,
    on: {
        click: function(e) {
            currentTop += e.screenY;
            $('.section.content .right-area .right-area-container.active .section-connector').css('top', currentTop + 'px !important');
        }
    }
});

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
    })

    // $('.slick-carousel').slick({
    //     infinite: true,
    //     vertical: true,
    //     verticalSwiping: true,
    //     slidesToShow: 6,
    //     arrows: false,
    //     centerMode: true,
    //     focusOnSelect: true
    // });


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

    $('.menu-item').hover(function() {
        var top = $(this).position().top - 11;
        if ($(this).index() == 0) {
            top = -43;
        }
        $('.hover-slide').css('top', top);
    });

    $('.text-buttons a').click(function() {
        $('.text-buttons a').removeClass('active');
        $(this).addClass('active');
    });

    $('.days ul li a').click(function() {
        $('.days ul li a').removeClass('active');
        $(this).addClass('active');
    });

    $('.language a').click(function() {
        $('.language a').removeClass('active');
        $(this).addClass('active');
    });

    $('a.edit').click(function() {
        $(this).addClass('active');
        $('a.save').remove('active');
        var span_value = $('span.textarea').text();
        $('span.textarea').html('<textarea class="comment" name="comment">' + span_value + '</textarea>');
    });

    $('a.save').click(function() {
        $(this).addClass('active');
        $('a.edit').remove('active');
        var span_value = $('textarea.comment').val();
        $('span.textarea').text(span_value);
    });

    $(".datepicker").datepicker({
        dateFormat: "dd.mm.yy",
        beforeShow: function(input, inst) {
            setTimeout(function() {
                inst.dpDiv.css({
                    width: $('.calendar-area').outerWidth(),
                    marginTop: input.offsetHeight - 20,
                    left: $('.calendar-area').offset().left
                });
            });
        }
    }).datepicker('setDate', new Date());

    $(window).resize(function() {
        $('.ui-datepicker').css({
            width: $('.calendar-area').outerWidth(),
            marginTop: $(".datepicker").offsetHeight - 20,
            left: $('.calendar-area').offset().left
        });
    });

    $('button.prev').click(function() {
        var period = $('.days li a.active').text();
        var new_date = getNewDate(period, 'prev');

        $(".datepicker").datepicker('setDate', new_date);
    });

    $('button.next').click(function() {
        var period = $('.days li a.active').text();
        var new_date = getNewDate(period, 'next');

        $(".datepicker").datepicker('setDate', new_date);
    });
});

function getNewDate(period, operator) {
    var operator = operator == 'prev' ? '-' : '+';
    var date = $('.datepicker').datepicker('getDate');
    switch (period) {
        case 'daily':
            date.setDate(date.getDate() + 1);
            break;
        case 'weekly':
            date.setDate(date.getDate() + 7);
            break;
        case 'monthly':
            date.setMonth(date.getMonth() + 1);
            break;
        case 'yearly':
            date.setFullYear(date.getFullYear() + 1);
            break;
    }

    return date;
}

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