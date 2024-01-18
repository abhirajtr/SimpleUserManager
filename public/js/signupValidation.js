const messageTimeout = 2000;
$(document).ready(() => {
    $('form').on('submit', handleFormSubmit)
});

function handleFormSubmit(event) {
    event.preventDefault();
    if (isValidForm()) {
        const formData = $('form').serialize();
        $.ajax({
            url: '/auth/signup',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: handleSuccess,
            error: handleError
        })
    }

}

function isValidForm() {
    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const emailRegex = /^[a-z0-9]+@gmail\.com$/;

    if (username === '' || password === '') {
        displayMessage('All fields are required.');
        return false;
    }
    if (email === '' || !emailRegex.test(email)) {
        displayMessage('Please enter a valid Gmail address.');
        $('#email').focus();
        return false
    }
    return true;
}

function displayMessage(message) {
    $('#validationmsg').text(message);
    setTimeout(() => {
        $('#validationmsg').text('');
    }, messageTimeout);
}

function handleSuccess(response) {
    // Redirect to the URL provided in the response
    window.location.href = response.redirect;
}

function handleError(xhr) {
    // Changed: Extracted the error message from responseJSON for clarity
    const errorMessage = xhr.responseJSON.message;
    
    if (xhr.status === 409) {
        displayMessage(errorMessage);
        
        setTimeout(() => {
            window.location.href = '/auth/';
        },3000);

        $('#email').focus();
    }
}