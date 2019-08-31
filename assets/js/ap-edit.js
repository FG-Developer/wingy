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
        $('.tabs li').removeClass('active');
        $(this).addClass('active');
    });
});