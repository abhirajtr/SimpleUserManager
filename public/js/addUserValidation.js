const username = $('#username');
const email = $('#email');
const password = $('#password');
const validationMessage = $('#validationMessage');
const timeoutDuration = 2000;
$((event) => {
    $('form').on('submit', function (event) {
        event.preventDefault();
        let formData = $(this).serialize();
        if (validateForm()) {
            $.ajax({
                url: '/admin/addUser',
                type: 'POST',
                data: formData,
                dataType: 'json',
                success: function (response) {
                    // window.location.href = response.redirect;
                        return displayMessage(response.message, 'green')
                    displayMessage(response.message);
                },
                error: function (xhr, status, error) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        displayMessage(response.message);
                    } catch (err) {
                        displayMessage(err);
                    }
                }
            })
        }
    })
})

function validateForm() {
    if (username.val() === '') {
        username.focus();
        displayMessage('Please enter a username.')
        return false;
    }
    if (email.val() === "") {
        email.focus();
        displayMessage('Please enter an email address.')
        return false;
    }
    if (password.val === '') {
        password.focus();
        displayMessage('Please enter a password.')
        return false;
    }
    return true;
}

function displayMessage(message, color = 'red') {
    if (color == 'green') {
        validationMessage.removeClass('text-red-600');
        validationMessage.addClass('text-green-600');
    }
    validationMessage.text(message);
    setTimeout(() => {
        validationMessage.text('')
    }, timeoutDuration)
}