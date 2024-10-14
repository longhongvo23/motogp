document.addEventListener('DOMContentLoaded', async () => {
    const yearSelect = document.querySelector('.primary-filter__filter-select--year');
    const typeSelect = document.querySelector('.primary-filter__filter-select--type');
    const eventSelect = document.querySelector('.primary-filter__filter-select--event');
    const categorySelect = document.querySelector('.primary-filter__filter-select--cat');
    const sessionSelect = document.querySelector('.primary-filter__filter-select--session');

    // Hàm lấy dữ liệu từ API
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return [];
        }
    };

    // Lấy và thêm dữ liệu cho các mục
    const loadData = async () => {
        // Thêm các option cho năm
        const years = ['2024', '2023', '2022', '2021', '2020'];
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });

        // Lấy dữ liệu loại (type)
        const types = [
            { value: 'GP', text: 'Grands Prix' },
            { value: 'ALL', text: 'All Events' }
        ];
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type.value;
            option.textContent = type.text;
            typeSelect.appendChild(option);
        });

        // Lấy dữ liệu sự kiện
        const events = await fetchData('http://localhost:3000/api/result/event'); // Gọi endpoint sự kiện
        events.forEach(event => {
            const option = document.createElement('option');
            option.value = event.id; // Hoặc thuộc tính tương ứng
            option.textContent = event.name; // Hoặc thuộc tính tương ứng
            eventSelect.appendChild(option);
        });

        // Lấy dữ liệu thể loại (category)
        const categories = await fetchData('http://localhost:3000/api/result/categori'); // Gọi endpoint category
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id; // Hoặc thuộc tính tương ứng
            option.textContent = category.name; // Hoặc thuộc tính tương ứng
            categorySelect.appendChild(option);
        });

        // Lấy dữ liệu session
        const sessions = await fetchData('http://localhost:3000/api/result/session'); // Gọi endpoint session
        sessions.forEach(session => {
            const option = document.createElement('option');
            option.value = session.id; // Hoặc thuộc tính tương ứng
            option.textContent = session.name; // Hoặc thuộc tính tương ứng
            sessionSelect.appendChild(option);
        });
    };

    // Gọi hàm để load dữ liệu khi DOM đã sẵn sàng
    loadData();
});
