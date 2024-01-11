let msgTime = 1000;
$(() => {
    $('#login-form').submit(function (event) {
        event.preventDefault();
        let formData = $(this).serialize();
        console.log(formData);
        if (validateForm()) {
            $.ajax({
                url: "/auth/login",
                type: 'POST',
                data: formData,
                success: function (response) {
                    // console.log("message");
                    // console.log(response.message);
                    displayMessage(response.message);
                    if (response.redirect) {
                        window.location.href = response.redirect;
                    }
                },
                error: function (xhr, status, error) {
                    try {
                        // console.log(typeof xhr.status);

                        const response = JSON.parse(xhr.responseText);
                        displayMessage(response.message);
                        if(xhr.status === 404) {
                            $('#email').focus();
                        }
                        if(xhr.status === 401) {
                            $('#password').focus();
                        }
                    } catch (parseError) {
                        console.error('Error parsing JSON response', parseError);
                        displayMessage('Unauthorized. Incorrect password!');
                    }
                }
            })
        }
    })
});

function displayMessage(message) {
    $('#validationMessage').text(message);
    setTimeout(() => {
        $('#validationMessage').text('');

    }, msgTime)
}

function validateForm() {
    let email = $('#email').val();
    let password = $('#password').val();
    let emailRegex = /^[^\s@]+@gmail\.com$/;

    if (email === '' || !emailRegex.test(email)) {
        displayMessage("Please enter a valid email address!");
        $('#email').focus();
        return false;
    }
    if (password === '') {
        displayMessage("Please enter the password!");
        $('#password').focus();
        return false;
    }

    return true;
}