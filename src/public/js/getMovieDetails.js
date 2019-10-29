function formatDate(date) {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    return `${day}/${month}/${year}`;
}

function showMovieInfos(movieInfo, movieCategories, movieCountries) {
    let movieInfoElem = $('.pop-up-content').find('.movie-info').find('.movie-dl-list');

    let directorsElem = "";

    movieInfo.directors.forEach(function (director) {
        directorsElem += `<a href="#">${director}</a>,`;
    });

    let countriesElem = "";

    movieCountries.forEach(function (country) {
        countriesElem += `<a href="#">${country.title}</a>,`;
    });

    let categoriesElem = "";

    movieCategories.forEach(function (category) {
        categoriesElem += `<a href="#">${category.title}</a>,`;
    });

    movieInfoElem.html(`
    <p class="movie-dl-item">
        <span class="dl-title"> Trạng thái: </span>
        <span class="dl-value">${movieInfo.status}</span>
    </p>
    <p class="movie-dl-item">
        <span class="dl-title"> Thời lượng: </span>
        <span class="dl-value">${movieInfo.time} phút</span>
    </p>
    <p class="movie-dl-item">
        <span class="dl-title"> IMDb: </span>
        <span class="dl-value">${movieInfo.IMDb}</span>
    </p>
    <p class="movie-dl-item">
        <span class="dl-title"> Đạo diễn: </span>
        <span class="dl-value">${directorsElem}</span>
    </p>
    <p class="movie-dl-item">
        <span class="dl-title"> Ngày khởi chiếu: </span>
        <span class="dl-value">${formatDate(movieInfo.release_date)}</span>
    </p>
    <p class="movie-dl-item">
        <span class="dl-title"> Quốc gia: </span>
        <span class="dl-value">${countriesElem}</span>
    </p>
    <p class="movie-dl-item">
        <span class="dl-title"> Thể loại: </span>
        <span class="dl-value">${categoriesElem}</span>
    </p>
    `);
}

/**
 * Send ajax request to get movie's infomations
 * @param {String} movieId 
 */
function requestForMovieInfos(movieId) {
    $.get(`/movie/info/${movieId}`,
        function (data) {
            let movieInfo = data.movieInfo;
            let movieCategories = data.movieCategories;
            let movieCountries = data.movieCountries;

            $('.pop-up-window').find('form #movie-id').val(movieId);

            //movie-thumbnail
            let movieThumbnailBig = $('.pop-up-content').find('.thumb .thumb-bg');
            let movieThumbnailSm = $('.pop-up-content').find('.thumb-sm .thumb-bg');
            movieThumbnailBig.attr('src', movieInfo.thumbnail);
            movieThumbnailSm.attr('src', movieInfo.thumbnail);

            //movie-title
            let movieTitle = $('.pop-up-content').find('.movie-info');
            movieTitle.find('.movie-title-vn').text(movieInfo.title_vn);
            movieTitle.find('.movie-title-en').text(movieInfo.title_en);

            //movie-infomations
            showMovieInfos(movieInfo, movieCategories, movieCountries);

            //star-rating
            let starRating = $('.pop-up-content').find('.movie-info').find('.star-rating');
            let movieStarRating = Math.floor(movieInfo.star_rating);
            starRating.empty();
            for (let i = 0; i < movieStarRating; i++)
                starRating.append('<span class="fa fa-star checked"></span>');
            for (let i = movieStarRating; i < 5; i++)
                starRating.append('<span class="fa fa-star"></span>');

            //movie-descriptions
            let movieDescriptions = $('.pop-up-content').find('.summary-content');
            movieDescriptions.html(movieInfo.descriptions);

            //movie-related-keywords
            let movieTags = $('.pop-up-content').find('.tag-box');
            movieTags.empty();
            let keywords = movieInfo.keywords;
            keywords.forEach(function (keyword) {
                movieTags.append(`<li class="tag-item">
                    <a href="">${keyword}</a>
                </li>`);
            });

            //add Listener for Watch Movie and Trailer Buttons
            watchAndTrailerButton(movieInfo.trailer_link, movieInfo.watch_link);
        }
    );
}



function getMovieComments(movieId) {
    $.get(`/movie/comments/${movieId}`,
        function (comments) {
            let commentListElem = $('.comment-list');
            commentListElem.empty();
            comments.forEach(function (comment) {

                commentListElem.append(`<div class="comment">
                <div class="avatar">
                    <img src="${comment.userInfo.avatar}" alt="">
                </div>
                <div class="comment-details">
                    <div class="user-name">${comment.userInfo.first_name} ${comment.userInfo.last_name}</div>
                    <div class="comment-content">
                        ${comment.content}
                    </div>
                </div>
            </div>`);
            });
        }
    );
}

function getMovieDetails() {
    $('.movie-link').parent().on('click', function (e) {
        e.preventDefault();
        $('.pop-up-window').find('form #comment-content').val('');
        let target = $(this).data('target');
        requestForMovieInfos(target);
        getMovieComments(target);
        $('.pop-up-window').show();
        $('.movie-details').hide();
        $('.movie-summary').show();
    });
}

$(document).ready(function () {
    getMovieDetails();
});