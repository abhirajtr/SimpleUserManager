const messageTimeout = 2000;
$(document).ready(() => {
    $('#loginForm').on('submit', handleFormSubmit);
})
function handleFormSubmit(event) {
    event.preventDefault();
    if (isValidForm()) {
        const formData = $('#loginForm').serialize();
        $.ajax({
            url: '/auth/login',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: handleSuccess,
            error: handleError
        })
    }
}
function isValidForm() {
    const email = $('#email')
    const password = $('#password')
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (email.val() === '' || !emailRegex.test(email.val())) {
        displayMessage('Please enter a valid email address.');
        email.focus();
        return false;
    }
    if (password.val() === '') {
        displayMessage('Please enter the password.');
        password.focus();
        return false;
    }
    return true;
}
function displayMessage(message) {
    $('#validationMessage').text(message);
    setTimeout(() => {
        $('#validationMessage').text('');
    }, messageTimeout);
}
function handleSuccess(response) {
    window.location.href = response.redirect
}
function handleError(xhr) {
    if (xhr.status === 404) {
        $('#email').focus();
    }
    if (xhr.status === 401) {
        $('#password').focus();
    }
    displayMessage(xhr.responseJSON.message)
}