function dropdown() {
    $('.nav-item').mouseover(function() {
        $(this).find('.dropdown-list').show();
    });
    $('.nav-item').mouseout(function() {
        $(this).find('.dropdown-list').hide();
    });
}

function carousel() {
    //let startPos =  $('.top-movie-wrapper').offset().left;
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
                left: "+="+step
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
                left: "-="+step
            }, 800);
        } 
    })
};

function autoCarousel() {
    $('.top-movie-list').find('.next-btn').click();
}

function watchAndTrailerButton(trailerLink, movieLink) {
    $('.watch-btn').on('click', function(e) {
        e.preventDefault();
        $('.movie-details').hide();
        $('.player-window').show();
        $('.player-window').find('.trailer-btn').show();
        $('.player-window').find('.watch-btn').hide();

        $('.player-window').find('video source').attr('src', movieLink);
        $('.player-window').find('video')[0].load();
    });

    $('.trailer-btn').on('click', function(e) {
        e.preventDefault();
        $('.movie-details').hide();
        $('.player-window').show();
        $('.player-window').find('.trailer-btn').hide();
        $('.player-window').find('.watch-btn').show();

        $('.player-window').find('video source').attr('src', trailerLink);
        $('.player-window').find('video')[0].load();
    });
}

function popUpModals() {
    $('.summary-btn').on('click', function(e) {
        e.preventDefault();
        $('.movie-details').hide();
        $('.movie-summary').show();
        $('.player-window').find('video')[0].pause();
    });

    $('.download-btn').on('click', function(e) {
        e.preventDefault();
        $('.movie-details').hide();
        $('.movie-download').show();
    });

    $('.pop-up-bg').on('click', function(e) {
        e.preventDefault();
        $('.pop-up-window').hide();
        $('.player-window').find('video')[0].pause();
    });
}

function popDownModals() {
    $('.close-modal-btn').on('click', function(e) {
        e.preventDefault();
        $('.pop-up-window').hide();
        $('.player-window').find('video')[0].pause();
    });
}

$(document).ready(function () {
    $(this).scrollTop(0);
    dropdown();
    carousel();
    setInterval(function() {
        autoCarousel();
    }, 7000);
    popUpModals();
    popDownModals();
});