function showHideLoginForm() {
    $('.login-btn').off('click').on('click', function (e) {
        e.preventDefault();
        $('.pop-up-login').show();
        $('.pop-up-login').find('.login-form').show();
        $('.pop-up-login').find('.register-form').hide();
    });

    $('.open-login').off('click').on('click', function (e) {
        e.preventDefault();
        $('.pop-up-login').show();
        $('.pop-up-login').find('.login-form').show();
        $('.pop-up-login').find('.register-form').hide();
    });

    $('.pop-up-login .close-login-modal').off('click').on('click', function (e) {
        e.preventDefault();
        $('.pop-up-login').hide();
        $('.register-form').find('.notifications .fail').hide();
    });

    $('.pop-up-login .pop-up-bg').off('click').on('click', function (e) {
        e.preventDefault();
        $('.pop-up-login').hide();
        $('.register-form').find('.notifications .fail').hide();
    });
}

function loginRegisterchange() {
    $('#open-login').off('click').on('click', function (e) {
        e.preventDefault();
        $('.pop-up-login').find('.section-title').text('Đăng nhập');
        $('.pop-up-login').find('.register-form').hide();
        $('.pop-up-login').find('.login-form').show();
    });
    $('#open-register').off('click').on('click', function (e) {
        e.preventDefault();
        $('.pop-up-login').find('.section-title').text('Đăng ký');
        $('.pop-up-login').find('.register-form').show();
        $('.pop-up-login').find('.login-form').hide();
    });
}

function showError(message) {
    $('.register-form').find('.notifications .fail').text(message);
    $('.register-form').find('.notifications .fail').show();
}

function validateRegisterForm() {
    let username = $('.register-form').find('.username').val();
    let password = $('.register-form').find('.password').val();
    let confirmPassword = $('.register-form').find('.confirm-password').val();
    let firstName = $('.register-form').find('.first-name').val();
    let lastName = $('.register-form').find('.last-name').val();

    let usernameRegex = new RegExp("^(?=.{8,20}$)[a-zA-Z0-9]+$");
    let nameRegex = new RegExp("^[\sa-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$");
    let passwordRegex = new RegExp("^(?=.{8,20}$)[a-zA-Z0-9]+$");

    if (username === ""
        || password === ""
        || confirmPassword === ""
        || firstName === ""
        || lastName === "") {
        showError('Không được bỏ trống ô nào!');
        return false;
    }

    if(!nameRegex.test(firstName)) {
        showError('Họ và Tên không chỉ được phép chứa chữ cái và khoảng trống!');
        $('.register-form').find('.first-name').val("");
        $('.register-form').find('.password').val("");
        $('.register-form').find('.confirm-password').val("");
        return false;
    }

    if(!nameRegex.test(lastName)) {
        showError('Họ và Tên không chỉ được phép chứa chữ cái và khoảng trống!');
        $('.register-form').find('.last-name').val("");
        $('.register-form').find('.password').val("");
        $('.register-form').find('.confirm-password').val("");
        return false;
    }

    if(!usernameRegex.test(username)) {
        showError('Tên đăng nhập cần có từ 8 đến 20, bao gồm ký tự chữ in hoa, chữ thường và số!');
        $('.register-form').find('.username').val("");
        $('.register-form').find('.password').val("");
        $('.register-form').find('.confirm-password').val("");
        return false;
    }

    if(!passwordRegex.test(password)) {
        showError('Mật khẩu cần có từ 8 đến 20 ký tự, bao gồm chữ in hoa, chữ thường và số!');
        $('.register-form').find('.password').val("");
        $('.register-form').find('.confirm-password').val("");
        return false;
    }

    if (password !== confirmPassword) {
        showError('Mật khẩu xác nhận không trùng khớp!')
        $('.register-form').find('.password').val("");
        $('.register-form').find('.confirm-password').val("");
        return false;
    }

    return true;
}

function hideNotifications() {
    $('.register-form').find('.username').focus(function(e) {
        $('.register-form').find('.notifications .fail').hide();
    });
    $('.register-form').find('.password').focus(function(e) {
        $('.register-form').find('.notifications .fail').hide();
    });
    $('.register-form').find('.confirm-password').focus(function(e) {
        $('.register-form').find('.notifications .fail').hide();
    });
    $('.register-form').find('.first-name').focus(function(e) {
        $('.register-form').find('.notifications .fail').hide();
    });
    $('.register-form').find('.last-name').focus(function(e) {
        $('.register-form').find('.notifications .fail').hide();
    });
}

function signUp() {
    $('.register-form').find('.btns input').off('click').on('click', function(e) {
        e.preventDefault();
        let newUser = {
            first_name : $('.register-form').find('.first-name').val(),
            last_name : $('.register-form').find('.last-name').val(),
            username : $('.register-form').find('.username').val(),
            password : $('.register-form').find('.password').val(),
            confirmPassword : $('.register-form').find('.confirm-password').val()
        };
        let isAuthenticated = false;
        let userToken = localStorage.getItem('usertoken');
        if (userToken === null) isAuthenticated = false;
        else isAuthenticated = true;
        
        if(validateRegisterForm()) {
            $.post("http://localhost:3000/register", {newUser: newUser, isAuthenticated: isAuthenticated},
                function (data) {
                    if(data.type === "succeed") {
                        $('#open-login').click();
                    } else {
                        $('.register-form').find('.notifications .fail').text(data.message);
                        $('.register-form').find('.notifications .fail').show();
                        $('.register-form').find('.username').val("");
                        $('.register-form').find('.password').val("");
                        $('.register-form').find('.confirm-password').val("");
                    }
                }
            );
        }
    })
}

// function logout() {
//     $('.logout-btn').off('click').on('click', function(e) {
//         e.preventDefault();
//         $.get('http://localhost:3000/logout', function(data) {
//             $('.logout-btn').hide();
//             $('.login-btn').show();
//             $('#comment-posible').hide();
//             $('#comment-imposible').show();
//             $('.pop-up-content .comments .comment-list').css('height', '85%');
//             alert(data.message);
//         });
//     })
// }