function dropdown() {
    $('.nav-item').mouseover(function() {
        $(this).find('.dropdown-list').show();
    });
    $('.nav-item').mouseout(function() {
        $(this).find('.dropdown-list').hide();
    });
}

function carousel() {
    let startPos =  $('.top-movie-wrapper').offset().left;
    let step = 1256;
    let counter = 0;
    $('.top-movie-list').find('.prev-btn').on('click', function(e) {
        e.preventDefault();
        if(counter === 0) {
            return false;
        }
        else {
            counter--;
            $('.top-movie-wrapper').animate({
                left: `+=${step}`
            }, 800);
        }
    })
    $('.top-movie-list').find('.next-btn').on('click', function(e) {
        e.preventDefault();
        if(counter === 3) {
            counter=0;
            $('.top-movie-wrapper').animate({
                left: 12
            }, 1000);
            return false;
        }
        else {
            counter++;
            $('.top-movie-wrapper').animate({
                left: `-=${step}`
            }, 800);
        } 
    })
};

function autoCarousel() {
    $('.top-movie-list').find('.next-btn').click();
}

$(document).ready(function () {
    dropdown();
    carousel();
    setInterval(function() {
        autoCarousel();
    }, 5000);
});