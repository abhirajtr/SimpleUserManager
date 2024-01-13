$(() => {
    $('#signupForm').on('submit', function (event) {
        // console.log("clicked");
        event.preventDefault();
        let formData = $(this).serialize();
        // console.log("formData", formData);
        if (validateForm()) {
            // $('form').submit();
            $.ajax({
                url: '/auth/signup',
                type: 'POST',
                data: formData,
                dataType: 'json',
                success: function (response) {
                    handleSuccess(response);
                },
                error: function (xhr, status, error) {
                    handleError(xhr);
                }
            })
        }
    })
})

function validateForm() {
    let username = $('#username').val();
    let email = $('#email').val();
    let password = $('#password').val();

    let emailRegex = /^[^\s@]+@gmail\.com$/;

    if (username === '' || password === '') {
        displayMessage('All fields are required')
        return false;
    }
    if (email === '' || !emailRegex.test(email)) {
        displayMessage('Inavlid email address!');
        return false;
    }
    return true;
}

function displayMessage(msg) {
    $('#validationmsg').text(msg);
    setTimeout(() => {
        $('#validationmsg').text('');
    }, 2000)
}
function handleSuccess(response) {
    window.location.href = response.redirect;
}

function handleError(xhr) {
    try {
        const response = JSON.parse(xhr.responseText);
        displayMessage(response.message);
        if (xhr.status === 409) {
            $('#email').focus();
        }
    } catch (err) {
        console.error('Error parsing JSON response');
        // displayMessage('Unauthorized. Incorrect password!');
    }
}