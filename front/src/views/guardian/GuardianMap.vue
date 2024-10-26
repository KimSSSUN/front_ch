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
import axios from 'axios';

export default {
  name: 'GuardianMap',
  data() {
    return {
      currentTab: 'map',
      map: null, // 지도 객체를 저장하기 위한 변수
    };
  },
  mounted() {
    this.loadKakaoMap();
    this.fetchWheelchairLocation(); // 휠체어 위치 정보 가져오기
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
    initializeMap(centerLat, centerLng) {
      console.log(`Initializing map at latitude: ${centerLat}, longitude: ${centerLng}`);
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(centerLat, centerLng),
        level: 3,
      };
      this.map = new kakao.maps.Map(container, options);
    },
    fetchWheelchairLocation() {
      axios
        .get('http://localhost:8080/wheelchair/map', { 
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // 인증 헤더 추가
          }
        })
        .then((response) => {
          const location = response.data; // 백엔드에서 위치 정보 받기 (x, y 좌표)
          if (location && location.x && location.y) {
            this.initializeMap(location.x, location.y);
            this.updateMapMarker(location.x, location.y); // y를 위도, x를 경도로 설정
            console.log(location.x,location.y)
          } else {
            console.error('Invalid location data:', location);
          }
        })
        .catch((error) => {
          console.error('Error fetching wheelchair location:', error);
        });
    },
    updateMapMarker(lat, lng) {
      const markerPosition = new kakao.maps.LatLng(lat, lng);
      
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(this.map); // 지도에 마커 표시
      this.map.setCenter(markerPosition); // 지도의 중심을 마커 위치로 변경
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
