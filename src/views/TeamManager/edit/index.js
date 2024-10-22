document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get('id');  // Lấy teamId từ URL

    if (teamId) {
        getTeamById(teamId);  // Gọi hàm để lấy thông tin đội
    } else {
        console.error('Không tìm thấy teamId trong URL');
    }

    const form = document.getElementById('details');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn chặn gửi form theo cách mặc định
        updateTeam(teamId); // Gọi hàm cập nhật sản phẩm
    });
});

function getTeamById(id) {
    fetch(`http://localhost:3000/api/teams/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Thông tin đội nhận được từ API:", data);
            displayRiderDetails(data);  // Gọi hàm để hiển thị thông tin đội
        })
        .catch(error => {
            console.error('Lỗi khi gọi API:', error);
            alert('Có lỗi xảy ra khi tải thông tin đội.');
        });
}

function displayRiderDetails(data) {
    document.getElementById('name').value = data.teamName || '';  // Tên đội
    document.getElementById('backgroundName').value = data.backgroundName || '';  // Tên nền
    document.getElementById('image').value = data.motoImg || '';  // Hình ảnh đội
    document.getElementById('category').value = data.teamType || '';  // Danh mục (loại đội)

    if (data.riders && data.riders.length > 0) {
        document.getElementById('rider1').value = data.riders[0].name || '';  // Tên rider 1
    }
    if (data.riders && data.riders.length > 1) {
        document.getElementById('rider2').value = data.riders[1].name || '';  // Tên rider 2
    }
}

function updateTeam(id) {
    const updatedData = {
        teamName: document.getElementById('name').value,
        backgroundName: document.getElementById('backgroundName').value,
        motoImg: document.getElementById('image').value,
        team_type: document.getElementById('category').value,
        riders: [
            { name: document.getElementById('rider1').value },
            { name: document.getElementById('rider2').value }
        ]
    };

    fetch(`http://localhost:3000/api/teams/${id}`, {
        method: 'PUT', // Hoặc 'PATCH' nếu API của bạn hỗ trợ
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log("Cập nhật đội thành công:", data);
        alert('Cập nhật thông tin đội thành công!');
    })
    .catch(error => {
        console.error('Lỗi khi cập nhật đội:', error);
        alert('Có lỗi xảy ra khi cập nhật thông tin đội.');
    });
}
