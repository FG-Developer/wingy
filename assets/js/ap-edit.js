jcWheelZoom = JcWheelZoom.create('.area-chart-img');

window.addEventListener('resize', function() {
    jcWheelZoom.prepare();
});

document.getElementById('zoom-in').addEventListener('click', function() {
    jcWheelZoom.zoomUp();
});

document.getElementById('zoom-out').addEventListener('click', function() {
    jcWheelZoom.zoomDown();
});

$(function() {
    $('.tabs li').on('click', function() {

        $('.form-container').hide();
        $('.tab-close').hide();
        $('.tabs li').removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('edit-image')) {
            $('.edit-image-container').show();
            $('.tab-close').show();

        }

        if ($(this).hasClass('edit-area')) {
            $('.edit-area-container').show();
            $('.tab-close').show();
        }
    });

    $('.tab-close').on('click', function() {
        $(this).hide();
        $('.form-container').hide();
    });

    $('#zone').on('change', function() {
        var currentVal = $(this).val();
        $('.area-chart-img').attr('src', 'assets/img/' + currentVal);
    });

    $('.change-zone-input').on('change', function() {
        var preview = $('img.area-chart-img');
        var file = document.querySelector('.change-zone-input').files[0];
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

    $('.change-zone').on('click', function() {
        $('.change-zone-input').trigger('click');
    });
});