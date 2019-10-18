function dropdown() {
    $('.nav-item').mouseover(function() {
        let toggleTarget = $(this).find('.nav-link').data('toggle');
        $(`#${toggleTarget}`).show();
    });
    $('.nav-item').mouseout(function() {
        let toggleTarget = $(this).find('.nav-link').data('toggle');
        $(`#${toggleTarget}`).hide();
    });
}

$(document).ready(function () {
    dropdown();
});