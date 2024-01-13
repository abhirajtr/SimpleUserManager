const usernameInput = $('#username')
const emailInput = $('#email');
const validationMessage = $('#validationMessage');
const timeoutDelay = 2000;
const userIdValue = $('#userIdValue').text().trim();
$(() => {
    $('form').on('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            const formData = $(this).serialize() + `&userId=${userIdValue}`;
            $.ajax({
                url: '/admin/editUser',
                type: 'POST',
                data: formData,
                success: function(response) {
                    // console.log(response.updatedUser);
                    const updatedUser = response.updatedUser
                    usernameInput.val(updatedUser.username);
                    emailInput.val(updatedUser.email);
                    validationMessage.removeClass('text-red-600');
                    validationMessage.addClass('text-emerald-600');
                    displayMessage(response.message);
                }
            })
        }
    });
});

function validateForm() {
    const username = usernameInput.val().trim();
    const email = emailInput.val().trim();
    if (!username) {
        displayMessage('Please provide a username for the update.');
        usernameInput.focus();
        return false;
    }
    if (!email) {
        displayMessage('Please provide an email address for the update.');
        emailInput.focus();
        return false;
    }
    return true;
};

function displayMessage(message) {
    validationMessage.text(message);
    setTimeout(() => {
        validationMessage.text('');
    }, timeoutDelay);
};