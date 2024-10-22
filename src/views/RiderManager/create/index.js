document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createRider');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        console.log("submit");

        // Lấy dữ liệu từ form
        const name = document.getElementById('name').value;
        const backgroundName = document.getElementById('backgroundName').value;
        const riderImg = document.getElementById('riderImage').value;
        const riderHashtag = document.getElementById('hastag').value;
        const rider_type = document.getElementById('category').value;
        const firstname = document.getElementById('riderFirstName').value;
        const lastname = document.getElementById('riderLastName').value;
        const country_id = document.getElementById('riderCountry').value;
        const team_id = document.getElementById('riderTeam').value;
        const rider_number = document.getElementById('rider_number').value;

        // Tạo đối tượng dữ liệu
        const data = {
            name,
            backgroundName,
            riderImg,
            riderHashtag,
            rider_type,
            firstname,
            lastname,
            country_id,
            team_id,
            rider_number,
        };

        console.log('Dữ liệu từ form:', data);

        try {
            // Gửi request đến server
            const response = await fetch('http://localhost:3000/api/createRiderManager', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log('Kết quả từ server:', result);

            if (response.ok) {
                // Điều hướng sau khi gửi thành công
                window.location.href = '../index/index.html';
            }

        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
        }
    });
});
