let calendarData = null;  // Biến toàn cục để lưu trữ dữ liệu sau khi gọi API

document.addEventListener('DOMContentLoaded', function () {
  console.log("Trang đã tải xong. Bắt đầu gọi API...");

  // Gọi API chỉ một lần khi trang được tải
  fetch('http://localhost:3000/api/calendar')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log("Dữ liệu nhận được từ API:", data);
      calendarData = data;  // Lưu dữ liệu vào biến toàn cục
      renderCalendar(data);  // Hiển thị dữ liệu MotoGP mặc định khi trang tải
    })
    .catch(error => {
      console.error('Lỗi khi gọi API:', error);
      // alert('Có lỗi xảy ra khi tải dữ liệu. Vui lòng kiểm tra console để biết thêm chi tiết.');
    });
});

// Hàm hiển thị dữ liệu vào danh sách đội
// Hàm hiển thị dữ liệu vào danh sách sự kiện
function renderCalendar(calendar) {
  const wrap = document.getElementsByClassName('wrap-calendar');
  const GrandPrix = document.getElementById('GrandPrix');
  const AllEvents = document.getElementById('AllEvents');
  GrandPrix.innerHTML = ``;
  AllEvents.innerHTML = ``;

  if (!wrap.length) { // Kiểm tra tồn tại của phần tử .wrap-calendar
    console.error('Không tìm thấy phần tử .wrap-calendar trong HTML.');
    return;
  }
  console.log("Bắt đầu render danh sách sự kiện...");

  if (calendar.length === 0) {
    GrandPrix.innerHTML = `<p>Không có sự kiện Grands Prix.</p>`;
    AllEvents.innerHTML = `<p>Không có sự kiện All Event.</p>`;
    return;
  }

  let currentMonthGP = null; // Theo dõi tháng hiện tại cho Grands Prix
  let currentMonthAE = null; // Theo dõi tháng hiện tại cho All Events

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  calendar.forEach((c, index) => {
    const startDate = new Date(c.start_date);
    const endDate = new Date(c.end_date);
    const eventMonth = startDate.getMonth(); // Lấy tháng từ 0 (January) đến 11 (December)

    if (c.event_type === 'Grands Prix') {
      if (eventMonth !== currentMonthGP) {
        currentMonthGP = eventMonth;
        GrandPrix.innerHTML += `
                    <div class="calendar-listings__month active">
                        <div class="calendar-listings__month-title">${monthNames[eventMonth]}</div>
                    </div>
                `;
      }

      GrandPrix.innerHTML += `
                <ul class="calendar-listings__month-listings">
                  <li class="calendar-listing__event-container calendar-listing__event-container--finished">
                    <a class="calendar-listing__event">
                      <div class="calendar-listing__status-container">
                        <div class="calendar-listing__status-type">GP${index + 1}</div>
                        <div class="calendar-listing__status-bar">
                          <div class="calendar-listing__status-icon"></div>
                          <div class="calendar-listing__status-text">
                            ${c.status}
                          </div>
                        </div>
                      </div>
                      <div class="calendar-listing__information">
                        <div class="calendar-listing__details">
                          <div class="calendar-listing__date-container">
                            <div class="calendar-listing__date-start-container">
                              <div class="calendar-listing__date-start-day">
                                ${startDate.getDate()}
                              </div>
                              <div class="calendar-listing__date-start-month">
                                ${monthNamesShort[eventMonth]}
                              </div>
                            </div>
                            <div class="calendar-listing__date-end-container">
                              <div class="calendar-listing__date-end-day">
                                ${endDate.getDate()}
                              </div>
                              <div class="calendar-listing__date-end-month">
                                ${monthNamesShort[eventMonth]}
                              </div>
                            </div>
                          </div>
                          <div class="calendar-listing__title">
                                ${c.event_name}
                            <div class="calendar-listing__location-container calendar-listing__location-container--desktop">
                              <div class="calendar-listing__location-flag">
                                <img class="calendar-listing_flag"
                                  src="${c.flagImg}" alt="QA flag"
                                  loading="lazy" />
                              </div>
                              <div class="calendar-listing__location-track-name">
                                ${c.circuit_name}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              `;
    } else if (c.event_type === 'All Event') {
      if (eventMonth !== currentMonthAE) {
        currentMonthAE = eventMonth;
        AllEvents.innerHTML += `
                    <div class="calendar-listings__month active">
                        <div class="calendar-listings__month-title">${monthNames[eventMonth]}</div>
                    </div>
                `;
      }

      AllEvents.innerHTML += `
                <ul class="calendar-listings__month-listings">
                  <li class="calendar-listing__event-container calendar-listing__event-container--finished">
                    <a class="calendar-listing__event">
                      <div class="calendar-listing__status-container">
                        <div class="calendar-listing__status-type">GP${index + 1}</div>
                        <div class="calendar-listing__status-bar">
                          <div class="calendar-listing__status-icon"></div>
                          <div class="calendar-listing__status-text">
                            ${c.status}
                          </div>
                        </div>
                      </div>
                      <div class="calendar-listing__information">
                        <div class="calendar-listing__details">
                          <div class="calendar-listing__date-container">
                            <div class="calendar-listing__date-start-container">
                              <div class="calendar-listing__date-start-day">
                                ${startDate.getDate()}
                              </div>
                              <div class="calendar-listing__date-start-month">
                                ${monthNamesShort[eventMonth]}
                              </div>
                            </div>
                            <div class="calendar-listing__date-end-container">
                              <div class="calendar-listing__date-end-day">
                                ${endDate.getDate()}
                              </div>
                              <div class="calendar-listing__date-end-month">
                                ${monthNamesShort[eventMonth]}
                              </div>
                            </div>
                          </div>
                          <div class="calendar-listing__title">
                                ${c.event_name}
                            <div class="calendar-listing__location-container calendar-listing__location-container--desktop">
                              <div class="calendar-listing__location-flag">
                                <img class="calendar-listing_flag"
                                  src="${c.flagImg}" alt="QA flag"
                                  loading="lazy" />
                              </div>
                              <div class="calendar-listing__location-track-name">
                                ${c.circuit_name}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              `;
    }
  });

}




