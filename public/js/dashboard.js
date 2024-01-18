$(document).ready(function () {
    function attachBlockButtonHandler() {
        $('.blockButton').on('click', function () {
            var button = $(this);
            var userId = button.data('userid');
            var action = button.data('action');

            $.ajax({
                type: 'POST',
                url: action,
                data: { userId: userId },
                success: function (response) {
                    // Update the UI based on the server response
                    if (response.status) {
                        // Toggle block status and button text
                        var isBlocked = !button.hasClass('bg-green-600');
                        button.toggleClass('bg-green-600 bg-red-700');
                        button.text(isBlocked ? 'Unblock' : 'Block');

                        // Update status text in the same row
                        const statusColumn = button.closest('tr').find('#status-column');
                        statusColumn.html(isBlocked ? '<span class="text-red-700">Blocked</span>' : '<span class="text-green-600">Unblocked</span>');
                    }
                },
                error: function (error) {
                    console.error('Error:', error);
                }
            });
        });
    }

    // Attach the block button handler on initial page load
    attachBlockButtonHandler();

    const searchInput = $('#searchInput');
    let searchTimer;
    searchInput.on('keydown', function () {
        clearTimeout(searchTimer);

        searchTimer = setTimeout(function () {
            const searchTerm = searchInput.val();
            $.ajax({
                type: 'POST',
                data: {searchTerm},
                url: `/admin/searchUser`,
                success: function (users) {
                    const tbody = $('#usersTable');
                    tbody.empty(); // Clear existing rows

                    // Iterate through the search results and append new rows to the tbody
                    users.forEach(user => {
                        const rowHtml = `
                                                <tr data-userId="${user._id}">
                            <td class="whitespace-nowrap px-10 py-4">
                                <div class="flex items-center">
                                    <div class="ml-2">
                                        <div class="text-sm font-medium text-gray-900">
                                            ${user.username}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-10 py-4">
                                <div class="text-sm text-gray-900">
                                    ${user.email}
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-10 py-4">
                                <a href="/admin/editUser/${user._id}"
                                    class="rounded-md bg-blue-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ">
                                    Edit
                                </a>
                            </td>
                            <td class="whitespace-nowrap px-14 py-4">
                                <div class="text-sm font-medium text-gray-900" id="status-column">
                                    ${user.isBlocked ? '<span class="text-red-700">Blocked</span>' : '<span class="text-green-600">Unblocked</span>'}
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-12 py-4 text-sm text-gray-700" id="btn">
                                <div class="flex items-center">
                                    ${user.isBlocked ?
                                `<button class="w-20 bg-green-600 rounded-md px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black blockButton"
                                            data-userid="${user._id}" data-action="/admin/unblockUser">
                                            Unblock
                                        </button>` :
                                `<button class="w-20 bg-red-700 rounded-md px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black blockButton"
                                            data-userid="${user._id}" data-action="/admin/blockUser">
                                            Block
                                        </button>`}
                                </div>
                            </td>
                        </tr>
                        `;
                        tbody.append(rowHtml);
                    });

                    // After updating the search results, reattach the block button handler
                    attachBlockButtonHandler();
                }
            });
        }, 500);
    });
});