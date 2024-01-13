$(function(){
    $('body').on('click', '#blockUserBtn', function (event) {
        event.preventDefault();
        const userId = $(this).closest('tr').data('userid'); 
        blockUser(userId);
    });
    $('body').on('click', '#unblockUserBtn', function (event) {
        event.preventDefault();
        const userId = $(this).closest('tr').data('userid'); 
        unblockUser(userId);
    });
})

function blockUser(userId) {
    $.ajax(({
        url: `/admin/blockUser`,
        type: 'POST',
        data: {userId},
        success: function(response) {
            updateStatus(userId, 'Blocked');
        },
        error: function(xhr) {
            
        }
    }))
}

function unblockUser(userId) {
    $.ajax(({
        url: `/admin/unblockUser`,
        type: 'POST',
        data: {userId},
        success: function(response) {
            updateStatus(userId, 'Unblocked');
        }
    }))
}

function updateStatus(userId, status) {
    console.log("Hit");
    const statusElement = $(`tr[data-userId="${userId}"] #status-column`);
    if(status === 'Blocked') {
        statusElement.html(`<span class="text-red-700">${status}</span>`);
    } else {
        statusElement.html(`<span class="text-green-600">${status}</span>`);
    }
}