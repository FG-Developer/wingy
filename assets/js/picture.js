$(function() {

    var defaultContent = $(".picture-container .content.default");
    $(".picture-container .content.default").remove();

    $(document).on('click', '.picture-container .content .close-btn', function(e) {
        e.stopPropagation();
        $(this).parent('.content.active').removeClass('active');
    });

    $(document).on('click', '.picture-container .content', function() {
        $('.picture-container .content').removeClass('active');
        $(this).addClass('active');
        $(this).find('.start_date, .end_date').datetimepicker({
            dateFormat: "dd.mm.yy",
            beforeShow: function(input, inst) {
                $('#ui-datepicker-div').addClass('picture-page-calendar');
            }
        }).datepicker('setDate', new Date());
    });

    $('.add-new-picture').on('click', function() {
        defaultContent.removeClass('default');
        defaultContent.clone().prependTo(".picture-container .container");
        setHeightNavBar();
    });

    $('.picture-container .content btn.save').on('click', function() {
        $('.picture-container .content').removeClass('active');
        $(this).addClass('active');
    });

    $(document).on('click', '.picture-container .content.active .desktop-bg', function(e) {
        $('.desktop-bg-input').trigger('click');
    });

    $(document).on('click', '.picture-container .content.active .mobile-bg', function() {
        $('.mobile-bg-input').trigger('click');
    });

    $(document).on('click', '.picture-container .content.active .delete-btn', function() {
        $(this).parent('.content').remove();
        setHeightNavBar();
    });

});

var setHeightNavBar = function() {
    var height = $('section.container').outerHeight();
    console.log(height);
    var navHeight = $('.nav-top').outerHeight() + $('.menu').outerHeight() + 50;
    if (height < navHeight) {
        height = navHeight;
    }
    $('nav').height(height);
}