$(function() {

    checkWindowHeight();
    $(window).resize(function() {
        checkWindowHeight();
    });

    function checkWindowHeight() {
        if ($(window).height() + 10 < $('.menu').height() + $('.nav-top').height()) {
            $('.menu-container').css('position', 'static');
        }
    }

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
    });

    var top = $('li.menu-item.active').position().top;
    $('.hover-slide').css('top', top - 30);

    $('.menu-item').hover(function() {
        var top = $(this).position().top - 30;
        $('.hover-slide').css('top', top);
    });

    $('.menu-item').mouseleave(function() {
        $('.hover-slide').css('top', top - 30);
    });

    $('.text-buttons a').click(function() {
        $('.text-buttons a').removeClass('active');
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
            numberOfMonths: 2,
            dateFormat: "dd.mm.yy",
            showOtherMonths: true,
            selectOtherMonths: true,
            onSelect: function(selectedDate) {
                if (!$(this).data().datepicker.first) {
                    $(this).data().datepicker.inline = true
                    $(this).data().datepicker.first = selectedDate;
                } else {
                    var dt_from = compareDate($(this).data().datepicker.first);
                    var dt_to = compareDate(selectedDate);

                    if (selectedDate > $(this).data().datepicker.first) {

                        $('#from').val($(this).data().datepicker.first);
                        $('#to').val(selectedDate);

                        $('.from-date').text($(this).data().datepicker.first);
                        $('.to-date').text(selectedDate);

                        $('.datestring .from .date').text(dt_from.getDate() + ' ' + getMonthName(dt_from) + ' ' + dt_from.getFullYear());
                        $('.datestring .from .day').text(getDayName(dt_from));

                        $('.datestring .to .date').text(dt_to.getDate() + ' ' + getMonthName(dt_to) + ' ' + dt_to.getFullYear());
                        $('.datestring .to .day').text(getDayName(dt_to));

                    } else {
                        $('#from').val(selectedDate);
                        $('#to').val($(this).data().datepicker.first);

                        $('.from-date').text(selectedDate);
                        $('.to-date').text($(this).data().datepicker.first);

                        $('.datestring .from .date').text(dt_to.getDate() + ' ' + getMonthName(dt_to) + ' ' + dt_to.getFullYear());
                        $('.datestring .from .day').text(getDayName(dt_to));

                        $('.datestring .to .date').text(dt_from.getDate() + ' ' + getMonthName(dt_from) + ' ' + dt_from.getFullYear());
                        $('.datestring .to .day').text(getDayName(dt_from));

                    }
                    $(this).data().datepicker.inline = false;
                }
                insertMessage();
            },
            beforeShow: function(input, instance) {
                insertMessage();
            },
            onChangeMonthYear: function() {
                insertMessage();
            },
            beforeShowDay: function(date) {

                var date1 = compareDate($('#from').val());
                var date2 = compareDate($('#to').val());

                if (date >= date1 && date <= date2) {
                    if (date.getTime() == date1.getTime()) {
                        return [true, 'ui-state-selected-range-start', ''];
                    } else if (date.getTime() == date2.getTime()) {
                        return [true, 'ui-state-selected-range-end', ''];
                    } else {
                        return [true, 'ui-state-selected-range', ''];
                    }
                }

                return [true, '', ''];
            },
            onClose: function() {
                delete $(this).data().datepicker.first;
                $(this).data().datepicker.inline = false;
            }
        });

        $('.wrapper').scroll(function() {
            var dateInputPosition = $(datePicker[0]).offset().top;
            $('.ui-datepicker').css({
                top: dateInputPosition + 40,
            });
        });

        $(window).resize(function() {
            if ($(window).width() >= 940) {
                $('body').removeClass('mobile');
            }
        });
    }

    $('div.mobile .menu-items').on('click', function() {
        $('body').addClass('mobile');
    });

    $('div.mobile .close-icon').on('click', function() {
        $('body').removeClass('mobile');
    });

    $('body').on('click', '.ui-datepicker .days ul li', function() {
        $('.days ul li').removeClass('active');
        $(this).addClass('active');
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

function compareDate(str1) {
    // str1 format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
    var dt1 = parseInt(str1.substring(0, 2));
    var mon1 = parseInt(str1.substring(3, 5));
    var yr1 = parseInt(str1.substring(6, 10));
    var date1 = new Date(yr1, mon1 - 1, dt1);
    return date1;
}

function getDayName(date) {
    return date.toLocaleString(locale, { weekday: 'long' });
}

function getMonthName(date) {
    return date.toLocaleString(locale, { month: 'long' });
}

function setDefaultDate() {

    var toDay = new Date();
    var toDayFormat = toDay.getDate() + "." + toDay.getMonth() + "." + toDay.getFullYear();

    $('#from').val(toDayFormat);
    $('#to').val(toDayFormat);

    $('.from-date').text(toDayFormat);
    $('.to-date').text(toDayFormat);

    $('.datestring .from .date').text(toDay.getDate() + ' ' + getMonthName(toDay) + ' ' + toDay.getFullYear());
    $('.datestring .from .day').text(getDayName(toDay));

    $('.datestring .to .date').text(toDay.getDate() + ' ' + getMonthName(toDay) + ' ' + toDay.getFullYear());
    $('.datestring .to .day').text(getDayName(toDay));
}

$('#ui-datepicker-div').delegate('.ui-datepicker-prev, .ui-datepicker-next', 'click', insertMessage);

function insertMessage() {
    var days = '<div class="days">' +
        '<ul>' +
        '<li class="active">daily</li>' +
        '<li>weekly</li>' +
        '<li>monthly</li>' +
        '<li>yearly</li>' +
        '</ul>' +
        '</div>';

    clearTimeout(insertMessage.timer);

    if ($('#ui-datepicker-div').is(':visible')) {
        $('#ui-datepicker-div').append(days);
    } else {
        insertMessage.timer = setTimeout(insertMessage, 10);
    }
}