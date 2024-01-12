const username = $('#username');
const email = $('#email');
const password = $('#password');
const validationMessage = $('#validationMessage');
const timeoutDuration = 2000;
$((event) => {
    $('form').on('submit', function(event){
        event.preventDefault();
        let formData = $(this).serialize();
        if (validateForm()) {
            $.ajax({
                url: '/admin/addUser',
                type: 'POST',
                data: formData,
                dataType: 'json',
                success: function(response) {
                    window.location.href = response.redirect;
                },
                error: function(xhr, status, error) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        displayMessage(response.message);
                    } catch (err) {
                        displayMessage
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
    if(password.val === '') {
        password.focus();
        displayMessage('Please enter a password.')
        return false;
    }
    return true;
}

function displayMessage(message) {
    validationMessage.text(message);
    setTimeout(() => {
        validationMessage.text('')
    }, timeoutDuration)
}