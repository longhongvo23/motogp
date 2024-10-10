document.addEventListener("DOMContentLoaded", async () => {
  // Lấy rider_id từ URL
  const params = new URLSearchParams(window.location.search);
  const riderId = params.get("rider_id"); // Lấy giá trị rider_id từ URL
  const riderDetailsContainer = document.getElementById("riderDetails");

  if (riderId) {
    try {
      const response = await fetch(`http://localhost:3000/api/riders/${riderId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch rider details");
      }

      const riderDetails = await response.json();

      // Kiểm tra xem dữ liệu có đầy đủ không
      if (riderDetails) {
        const backgroundClass = getBackgroundClass(riderDetails.teamName);

        riderDetailsContainer.innerHTML = `
                  <div class="rider-hero">
                      <div class="rider-hero__container">
                          <a id="backRiderBtn" class="rider-hero__back-button">
                              <i class="fa-solid fa-chevron-left" style="color: #ffffff;"></i>
                              ALL RIDERS
                          </a>
            
                          <div class="rider-hero__background">
                              <div class="${backgroundClass}"></div>
                              <div class="rider-hero__background-info">
                                  <div class="rider-hero__background-initials">${riderDetails.backgroundName}</div>
                                  <div class="rider-hero__background-name">${riderDetails.lastName}</div>
                              </div>
                              <div class="rider-hero__background-gradient"></div>
                              <div class="rider-hero__background-image">
                                  <div class="rider-image-container">
                                      <div class="rider-image">
                                          <div class="u-observed lazy-image-wrapper">
                                              <picture class="picture">
                                                  <img class="img undefined picture__img" src="${riderDetails.riderImg}" alt="${riderDetails.firstName} ${riderDetails.lastName}" />
                                              </picture>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="rider-hero__background-image-gradient"></div>
                          </div>
            
                          <div class="rider-hero__info-container">
                              <span class="rider-hero__info-hashtag">${riderDetails.riderHashtag}</span>
                              <span class="rider-hero__info-name">${riderDetails.firstName} ${riderDetails.lastName}</span>
                              <div class="rider-hero__details-container">
                                  <span class="rider-hero__details-country">
                                      <div class="rider-hero__flag-container">
                                          <img class="rider-hero__details-flag" src="${riderDetails.flagImg}" alt="${riderDetails.countryName} Flag" />
                                      </div>
                                      ${riderDetails.countryName}
                                  </span>
                                  <span class="rider-hero__details-team">${riderDetails.teamName}</span>
                              </div>
                              <a class="rider-hero__shop-now-button">
                                  <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i> Shop Now
                              </a>
                              <div class="rider-hero__current-season-container">
                                  <div class="rider-hero__current-season-title">Current Season</div>
                                  <div class="rider-hero__current-season-stats-container">
                                      <div class="rider-hero__current-season-stats-stat">
                                          <span class="rider-hero__current-season-stats-title">Position</span>
                                          <span class="rider-hero__current-season-stats-value">${riderDetails.currentPos}</span>
                                      </div>
                                      <div class="rider-hero__current-season-stats-stat">
                                          <span class="rider-hero__current-season-stats-title">Points</span>
                                          <span class="rider-hero__current-season-stats-value">${riderDetails.currentPoint}</span>
                                      </div>
                                      <div class="rider-hero__current-season-stats-stat">
                                          <span class="rider-hero__current-season-stats-title">Victories</span>
                                          <span class="rider-hero__current-season-stats-value">${riderDetails.currentVic}</span>
                                      </div>
                                  </div>
                                  <a id="backResultStandingBtn" class="rider-hero__results-and-standings-button">
                                      Results & Standings <i class="fa-regular fa-chevron-right" style="color: #ffffff;"></i>
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>

                  <section class="profile-tabs">
                      <div class="tabs widget-outer-spacing">
                          <ul class="tabs__list tabs__list--center">
                              <li class="tabs__item">
                                  <button id="tab-overview" class="tabs__link is-active">
                                      <span class="tabs__link-text">Overview</span>
                                  </button>
                              </li>
                              <li class="tabs__item">
                                  <button id="tab-news" class="tabs__link">
                                      <span class="tabs__link-text">News</span>
                                  </button>
                              </li>
                              <li class="tabs__item">
                                  <button id="tab-video" class="tabs__link">
                                      <span class="tabs__link-text">Video</span>
                                  </button>
                              </li>
                          </ul>
                      </div>

                      <div id="tab-content-overview" class="tabs__tab-content tabs__tab-content--grey">
                          <div class="rider-stats">
                              <div class="rider-stats__header">
                                  <header class="widget-header widget-header--no-cta">
                                      <h2 class="widget-header__title">Rider Stats</h2>
                                  </header>
                                  <div class="rider-stats__supplier"></div>
                              </div>

                              <div class="rider-stats__container">
                                  <div class="rider-stats__menu-container">
                                      <button class="rider-stats__menu-button active">Total</button>
                                      <button class="rider-stats__menu-button">MotoGP™</button>
                                      <button class="rider-stats__menu-button">Moto2™</button>
                                      <button class="rider-stats__menu-button">Moto3™</button>
                                  </div>

                                  <div class="rider-stats__stats-container rider-stats__stats-container--tablet">
                                      <div class="rider-stats__stats-stat">
                                          <span class="rider-stats__stats-stat-title">WORLD CHAMPIONSHIPS</span>
                                          <span class="rider-stats__stats-stat-value">${riderDetails.totalWorldCham}</span>
                                      </div>
                                      <div class="rider-stats__stats-stat">
                                          <span class="rider-stats__stats-stat-title">Victories</span>
                                          <span class="rider-stats__stats-stat-value">${riderDetails.totalVic}</span>
                                      </div>
                                      <div class="rider-stats__stats-stat">
                                          <span class="rider-stats__stats-stat-title">Podiums</span>
                                          <span class="rider-stats__stats-stat-value">${riderDetails.totalPod}</span>
                                      </div>
                                      <div class="rider-stats__stats-stat">
                                          <span class="rider-stats__stats-stat-title">Poles</span>
                                          <span class="rider-stats__stats-stat-value">${riderDetails.totalPole}</span>
                                      </div>
                                      <div class="rider-stats__stats-stat">
                                          <span class="rider-stats__stats-stat-title">Races</span>
                                          <span class="rider-stats__stats-stat-value">${riderDetails.totalRace}</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <!-- Thêm phần News và Video nếu cần thiết -->
                      <!-- Ví dụ: -->
                      <!--
                      <div id="tab-content-news" class="tabs__tab-content">
                          <p>News content goes here...</p>
                      </div>
                      <div id="tab-content-video" class="tabs__tab-content">
                          <p>Video content goes here...</p>
                      </div>
                      -->
                  </section>

                  <div class="rider-hero__teammate-container">
                      <a class="rider-hero__teammate-profile">
                          <div class="rider-hero__teammate">
                              <div class="rider-hero__teammate-image-container">
                                  <div class="rider-image-container">
                                      <div class="rider-image">
                                          <div class="u-observed lazy-image-wrapper">
                                              <picture class="picture">
                                                  <img class="img undefined picture__img" src="${riderDetails.teammateImg}" alt="${riderDetails.teammateName}" />
                                              </picture>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div class="rider-hero__teammate-details">
                                  <span class="rider-hero__teammate-title">Teammate</span>
                                  <span class="rider-hero__teammate-name">${riderDetails.teammateName}</span>
                              </div>
                              <i class="fa-regular fa-chevron-right" style="color: #ffffff;"></i>
                          </div>
                      </a>
                  </div>
              `;
      }
    } catch (error) {
      console.error("Error fetching rider details:", error);
      riderDetailsContainer.innerHTML = `<p>Error loading rider details.</p>`;
    }
  } else {
    riderDetailsContainer.innerHTML = `<p>No rider selected.</p>`;
  }
});

// Hàm để lấy class cho background dựa trên teamName
function getBackgroundClass(teamName) {
  const teamClasses = {
    "Gresini Racing MotoGP": "rider-hero__background-team-colour gresini",
    "Ducati Lenovo Team": "rider-hero__background-team-colour ducati",
    "Red Bull KTM Factory Racing": "rider-hero__background-team-colour red-bull",
    "Monster Energy Yamaha MotoGP Team": "rider-hero__background-team-colour monster",
    "Repsol Honda Team": "rider-hero__background-team-colour repsol",
    // Thêm các đội khác tại đây...
  };

  return teamClasses[teamName] || "rider-hero__background-team-colour"; // Giá trị mặc định nếu không tìm thấy
}
