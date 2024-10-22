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
    fetch(`http://localhost:3000/api/rider/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Thông tin đội nhận được từ API:", data);
            displayTeamDetails(data);  // Gọi hàm để hiển thị thông tin đội
        })
        .catch(error => {
            console.error('Lỗi khi gọi API:', error);
            alert('Có lỗi xảy ra khi tải thông tin đội.');
        });
}

function displayTeamDetails(data) {
    // Lấy đối tượng team từ dữ liệu
    const team = data.team;

    // Cập nhật các trường thông tin
    document.getElementById('name').value = team.teamName || '';  // Tên nền
    document.getElementById('backgroundName').value = team.backgroundName || '';  // Tên nền
    document.getElementById('riderImage').value = team.riderImg || '';  // Hình ảnh rider
    document.getElementById('hastag').value = team.riderHashtag || '';  // Hashtag rider
    document.getElementById('category').value = team.rider_type || '';  // Loại rider
    document.getElementById('riderFirstName').value = team.firstname || '';  // Tên rider
    document.getElementById('riderLastName').value = team.lastname || '';  // Họ rider
    document.getElementById('riderCountry').value = team.country_id || '';  // ID quốc gia
    document.getElementById('riderTeam').value = team.team_id || '';  // ID đội
    document.getElementById('rider_number').value = team.rider_number || '';  // Số hiệu rider
}

function updateTeam(id) {
    const updatedData = {
        teamName: document.getElementById('name').value,
        backgroundName: document.getElementById('backgroundName').value,
        riderImg : document.getElementById('riderImage').value,
        riderHashtag : document.getElementById('hastag').value,
        rider_type : document.getElementById('category').value,
        firstname : document.getElementById('riderFirstName').value,
        lastname : document.getElementById('riderLastName').value,
        country_id : document.getElementById('riderCountry').value,
        team_id : document.getElementById('riderTeam').value,
        rider_number : document.getElementById('rider_number').value,
    };

    console.log('Dữ liệu cập nhật:', updatedData); 

    fetch(`http://localhost:3000/api/rider/${id}`, {
        method: 'PUT',
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
