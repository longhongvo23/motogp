document.addEventListener('DOMContentLoaded', function () {
    console.log("Trang đã tải xong. Bắt đầu gọi API...");

    // Gọi API chỉ một lần khi trang được tải
    fetch('http://localhost:3000/api/teams')
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
            // alert('Có lỗi xảy ra khi tải dữ liệu. Vui lòng kiểm tra console để biết thêm chi tiết.');
        });
});

function renderMotoGPTeams(teams) {
    const tableBody = document.getElementById('teams-table-body');
    tableBody.innerHTML = ''; // Xóa nội dung cũ nếu có

    teams.forEach((team, index) => {
        const row = document.createElement('tr');
        const checkboxId = `team-checkbox-${team.team_id}`;
        row.innerHTML = `
            <td><input type="checkbox" id="${checkboxId}" class="team-checkbox" data-id="${team.team_id}"></td>
            <td>
                <button class="edit-button" data-id="${team.team_id}"><i class="fa-solid fa-pen-to-square"></i></button>
            </td>
            <td>${index + 1}</td>
            <td>${team.teamName}</td>
            <td>${team.backgroundName}</td>
            <td><img src="${team.motoImg}" alt="${team.teamName}" style="width: 100px;"></td>
            <td>${team.team_type}</td>
            <td>${team.riderName1}</td>
            <td>${team.riderName2}</td>
        `;
        tableBody.appendChild(row);
    });
    setupEditButtons();
}

function setupSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('select-all');
    selectAllCheckbox.addEventListener('change', function () {
        const checkboxes = document.querySelectorAll('.team-checkbox');
        checkboxes.forEach(checkbox => checkbox.checked = this.checked);
    });
}

function deleteSelectedTeams() {
    const selectedCheckboxes = document.querySelectorAll('.team-checkbox:checked');
    console.log('Selected checkboxes:', selectedCheckboxes);

    const selectedIds = Array.from(selectedCheckboxes).map(checkbox => {
        const id = checkbox.getAttribute('data-id');
        console.log('Checkbox data-id:', id);
        return id;
    });
    console.log('Selected IDs:', selectedIds);

    if (selectedIds.length === 0) {
        alert('Vui lòng chọn ít nhất một đội để xóa.');
        return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} đội đã chọn?`)) {
        console.log('Sending delete request with IDs:', selectedIds);
        fetch('http://localhost:3000/api/deleteTeamManager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: selectedIds }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Delete response:', data);
                // Reload the data after deletion
                return fetch('http://localhost:3000/api/teams');
            })
            .then(response => response.json())
            .then(data => {
                console.log('Updated data after deletion:', data);
                teamsData = data;
                renderMotoGPTeams(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Có lỗi xảy ra khi xóa dữ liệu.');
            });
    }
}

function setupEditButtons() {
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const teamId = this.getAttribute('data-id');
            // Chuyển hướng đến trang chỉnh sửa với teamId
            window.location.href = `../edit/index.html?id=${teamId}`;
        });
    });
}