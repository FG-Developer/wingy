$(function() {

    $('.change-brand-logo').on('click', function() {
        $('#brand-logo').trigger('click');
    });

    $('#brand-logo').on('change', function() {
        var preview = $('img.brand-logo');
        var file = document.querySelector('#brand-logo').files[0];
        var reader = new FileReader();

        reader.onloadend = function() {
            $(preview).attr('src', reader.result);
            sendFileToServer();
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    })

    setTimeout(() => {
        var height = $('.container').outerHeight();
        var navHeight = $('.nav-top').outerHeight() + $('.menu').outerHeight() + 50;
        if (height < navHeight) {
            height = navHeight;
        }
        $('nav').height(height);
    }, 100);

    var top = $('.menu-item.active').position().top;
    if ($('.menu-item.active').index() == 0) {
        $('.hover-slide').css('top', top - 43);
    } else {
        $('.hover-slide').css('top', top - 11);
    }

    $('.menu-item').hover(function() {
        var top = $(this).position().top - 11;
        if ($(this).index() == 0) {
            top = -43;
        }
        $('.hover-slide').css('top', top);
    });

    $('.menu-item').mouseleave(function() {
        if ($('.menu-item.active').index() == 0) {
            $('.hover-slide').css('top', top - 43);
        } else {
            $('.hover-slide').css('top', top - 11);
        }
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

    if ($(".datepicker").length) {
        var datePicker = $(".datepicker").datepicker({
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

        $('.wrapper').scroll(function() {
            var dateInputPosition = $(datePicker[0]).offset().top;
            $('.ui-datepicker').css({
                top: dateInputPosition + 40,
            });
        });

        $(window).resize(function() {
            $('.ui-datepicker').css({
                width: $('.calendar-area').outerWidth(),
                top: $(".datepicker").offsetHeight - 20,
                left: $('.calendar-area').offset().left
            });
        });
    }

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

    $('div.mobile').on('click', function() {
        $('body').toggleClass('mobile');
    });
});

function sendFileToServer() {
    // send file to server from here
}

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