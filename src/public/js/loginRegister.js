function showHideLoginForm() {
    $('.login-btn').on('click', function (e) {
        e.preventDefault();
        $('.pop-up-login').show();
        $('.pop-up-login').find('.login-form').show();
        $('.pop-up-login').find('.register-form').hide();
        $('.pop-up-login .validate-box').css('height', '250px');
    });

    $('.open-login').on('click', function (e) {
        e.preventDefault();
        $('.pop-up-login').show();
        $('.pop-up-login').find('.login-form').show();
        $('.pop-up-login').find('.register-form').hide();
    });

    $('.pop-up-login .close-login-modal').on('click', function (e) {
        e.preventDefault();
        $('.pop-up-login').hide();
        $('.register-form').find('.notifications .fail').hide();
        $('.pop-up-login .validate-box').css('height', '332px');
    });

    $('.pop-up-login .pop-up-bg').on('click', function (e) {
        e.preventDefault();
        $('.pop-up-login').hide();
        $('.register-form').find('.notifications .fail').hide();
        $('.pop-up-login .validate-box').css('height', '332px');
    });
}

function loginRegisterchange() {
    $('#open-login').on('click', function (e) {
        e.preventDefault();
        $('.pop-up-login').find('.section-title').text('Đăng nhập');
        $('.pop-up-login').find('.register-form').hide();
        $('.pop-up-login').find('.login-form').show();
        $('.pop-up-login .validate-box').css('height', '250px');
    });
    $('#open-register').on('click', function (e) {
        e.preventDefault();
        $('.pop-up-login').find('.section-title').text('Đăng ký');
        $('.pop-up-login').find('.register-form').show();
        $('.pop-up-login').find('.login-form').hide();
        $('.pop-up-login .validate-box').css('height', '332px');
    });
}

function validateRegisterForm() {
    let username = $('.register-form').find('.username').val();
    let password = $('.register-form').find('.password').val();
    let confirmPassword = $('.register-form').find('.confirm-password').val();
    let firstName = $('.register-form').find('.first-name').val();
    let lastName = $('.register-form').find('.last-name').val();

    if (username === ""
        || password === ""
        || confirmPassword === ""
        || firstName === ""
        || lastName === "") {
        $('.register-form').find('.notifications .fail').text('Không được bỏ trống ô nào!');
        $('.register-form').find('.notifications .fail').show();
        $('.pop-up-login .validate-box').css('height', '370px');
        return false;
    }

    if (password !== confirmPassword) {
        $('.register-form').find('.notifications .fail').text('Mật khẩu xác nhận không trùng khớp!');
        $('.register-form').find('.notifications .fail').show();
        $('.pop-up-login .validate-box').css('height', '370px');
        $('.register-form').find('.password').val("");
        $('.register-form').find('.confirm-password').val("");
        return false;
    }

    return true;
}

function hideNotifications() {
    $('.register-form').find('.username').focus(function(e) {
        $('.register-form').find('.notifications .fail').hide();
        $('.pop-up-login .validate-box').css('height', '332px');
    });
    $('.register-form').find('.password').focus(function(e) {
        $('.register-form').find('.notifications .fail').hide();
        $('.pop-up-login .validate-box').css('height', '332px');
    });
    $('.register-form').find('.confirm-password').focus(function(e) {
        $('.register-form').find('.notifications .fail').hide();
        $('.pop-up-login .validate-box').css('height', '332px');
    });
    $('.register-form').find('.first-name').focus(function(e) {
        $('.register-form').find('.notifications .fail').hide();
        $('.pop-up-login .validate-box').css('height', '332px');
    });
    $('.register-form').find('.last-name').focus(function(e) {
        $('.register-form').find('.notifications .fail').hide();
        $('.pop-up-login .validate-box').css('height', '332px');
    });
}

function signUp() {
    $('.register-form').find('.btns input').on('click', function(e) {
        e.preventDefault();
        let newUser = {
            first_name : $('.register-form').find('.first-name').val(),
            last_name : $('.register-form').find('.last-name').val(),
            username : $('.register-form').find('.username').val(),
            password : $('.register-form').find('.password').val(),
            confirmPassword : $('.register-form').find('.confirm-password').val()
        };
        
        if(validateRegisterForm()) {
            $.post("/user/add-new", {newUser: newUser},
                function (data) {
                    if(data.type === "succeed") {
                        $('#open-login').click();
                    } else {
                        $('.register-form').find('.notifications .fail').text(data.message);
                        $('.register-form').find('.notifications .fail').show();
                        $('.pop-up-login .validate-box').css('height', '370px');
                        $('.register-form').trigger('reset');
                    }
                }
            );
        }
    })
}

function logout() {
    $('.logout-btn').on('click', function(e) {
        e.preventDefault();
        $.get('/logout', function(data) {
            $('.logout-btn').hide();
            $('.login-btn').show();
            $('#comment-posible').hide();
            $('#comment-imposible').show();
            $('.pop-up-content .comments .comment-list').css('height', '85%');
            alert(data.message);
        });
    })
}

$(document).ready(function () {
    showHideLoginForm();
    loginRegisterchange();
    signUp();
    hideNotifications();
    logout();
});