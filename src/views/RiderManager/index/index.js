document.addEventListener('DOMContentLoaded', function () {
    console.log("Trang đã tải xong. Bắt đầu gọi API...");
    fetchMotoGPTeams();  // Gọi API khi trang được tải
});

// Hàm để gọi API với cơ chế retry
function fetchMotoGPTeams(retryCount = 3) {
    fetch('http://localhost:3000/api/getAllRiders')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Dữ liệu nhận được từ API:", data);
            teamsData = data;  // Lưu dữ liệu vào biến toàn cục
            renderMotoGPTeams(data);  // Hiển thị dữ liệu MotoGP mặc định khi trang tải
        })
        .catch(error => {
            console.error('Lỗi khi gọi API:', error);
            if (retryCount > 0) {
                console.log(`Thử lại lần ${4 - retryCount}...`);
                fetchMotoGPTeams(retryCount - 1);  // Gọi lại API nếu còn lần thử
            } else {
                alert('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
            }
        });
}

function renderMotoGPTeams(teams) {
    const tableBody = document.getElementById('teams-table-body');
    tableBody.innerHTML = ''; // Xóa nội dung cũ nếu có

    const riders = teams.riders || []; // Lấy danh sách riders từ đối tượng teams

    console.log('Rendering teams:', riders);

    riders.forEach((team, index) => {
        const row = document.createElement('tr');
        const checkboxId = `team-checkbox-${team.rider_id}`;
        row.innerHTML = `
            <td><input type="checkbox" id="${checkboxId}" class="team-checkbox" data-id="${team.rider_id}"></td>
            <td>
                <button class="edit-button" data-id="${team.rider_id}"><i class="fa-solid fa-pen-to-square"></i></button>
            </td>
            <td>${index + 1}</td>
            <td>${team.firstname + " " + team.lastname || 'N/A'}</td>
            <td><img src="${team.riderImg || ''}" alt="${team.teamName || 'N/A'}" style="width: 100px;"></td>
            <td><img src="${team.flagImg || ''}" style="width: 100px;"></td>
            <td>${team.riderHashtag || 'N/A'}</td>
            <td>${team.firstname || 'N/A'}</td>
            <td>${team.lastname || 'N/A'}</td>
            <td>${team.countryName || 'N/A'}</td>
            <td>${team.teamName || 'N/A'}</td>
        `;
        tableBody.appendChild(row);
    });

    setupEditButtons();
}

function deleteSelectedTeams() {
    const selectedCheckboxes = document.querySelectorAll('.team-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(checkbox => checkbox.getAttribute('data-id'));

    if (selectedIds.length === 0) {
        alert('Vui lòng chọn ít nhất một đội để xóa.');
        return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} đội đã chọn?`)) {
        fetch('http://localhost:3000/api/deleteRiderManager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: selectedIds }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Delete response:', data);
                fetchMotoGPTeams();  // Gọi lại API sau khi xóa để cập nhật dữ liệu
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Có lỗi xảy ra khi xóa dữ liệu.');
            });
    }
}

function setupEditButtons() {
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const teamId = this.getAttribute('data-id');
            // Chuyển hướng đến trang chỉnh sửa với teamId
            window.location.href = `../edit/index.html?id=${teamId}`;
        });
    });
}
