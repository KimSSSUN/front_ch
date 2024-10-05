<template>
  <div class="map-container">
    <h5>Map</h5>
    <div id="map" class="map-content"></div>

    <!-- 하단 내비게이션 -->
    <nav class="bottom-nav d-flex justify-content-around align-items-center">
      <button class="nav-item" @click="goToMap">
        <i class="bi bi-map"></i>
        <span class="nav-text" :class="{ 'active': currentTab === 'map' }">Map</span>
      </button>
      <button class="nav-item" @click="goToProfile">
        <i class="bi bi-person"></i>
        <span class="nav-text" :class="{ 'active': currentTab === 'profile' }">Profile</span>
      </button>
    </nav>
  </div>
</template>

<script>
/* global kakao */
export default {
  name: 'GuardianMap',
  data() {
    return {
      currentTab: 'map',
    };
  },
  mounted() {
    this.loadKakaoMap();
  },
  methods: {
    loadKakaoMap() {
      if (typeof kakao !== 'undefined') {
        this.initializeMap();
      } else {
        const checkKakaoLoaded = setInterval(() => {
          if (typeof kakao !== 'undefined') {
            clearInterval(checkKakaoLoaded);
            this.initializeMap();
          }
        }, 500);
      }
    },
    initializeMap() {
      const container = document.getElementById("map"); 
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);

      const markerPosition = new kakao.maps.LatLng(37.5665, 126.9780);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    },
    goToMap() {
      this.$router.push("/guardian/map");
      this.currentTab = "map";
    },
    goToProfile() {
      this.$router.push("/guardian/profile");  // 프로필 페이지로 이동
      this.currentTab = "profile";  // 현재 탭을 프로필로 변경
    },
  }
};
</script>

<style scoped>
.map-container {
  text-align: center;
}

.map-content {
  width: 100%;
  height: 60vh; /* 적당한 크기로 고정 */
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #ddd;
  padding: 10px 0;
}

.nav-item {
  text-align: center;
  background-color: white;
  border: none;
  box-shadow: none;
}

.nav-item i {
  font-size: 1.6rem;
  display: block;
}

.nav-text {
  font-size: 0.75rem;
  margin-top: 4px;
  color: #666;
}

.nav-text.active {
  font-weight: bold;
  color: #007bff;
}
</style>
