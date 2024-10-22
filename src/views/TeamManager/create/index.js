document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createTeam');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Lấy dữ liệu từ form
        const name = document.getElementById('name').value;
        const backgroundName = document.getElementById('backgroundName').value;
        const image = document.getElementById('image').value;
        const category = document.getElementById('category').value;
        const rider1 = document.getElementById('rider1').value;
        const rider2 = document.getElementById('rider2').value;

        // Tạo đối tượng dữ liệu
        const data = {
            name,
            backgroundName,
            image,
            category,
            rider1,
            rider2
        };

        console.log('Dữ liệu từ form:', data);
       
        try {
            // Gửi request đến server
            const response = await fetch('http://localhost:3000/api/createTeamManager', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log('Kết quả từ server:', result);

            if (response.ok) {
            window.location.href = '../index/index.html';
            }

        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
        }
    });
});
