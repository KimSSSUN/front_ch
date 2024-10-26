<template>
  <div class="map-container">
    <h5>Map</h5>
    <div id="map" class="map-content"></div>

    <!-- 공통 네비게이션 컴포넌트 추가 -->
    <GurdianNav :currentTab="currentTab" @update-tab="updateTab" />
  </div>
</template>

<script>
import GurdianNav from "@/components/GurdianNav.vue"; // 공통 컴포넌트 임포트

/* global kakao */
export default {
  name: 'GuardianMap',
  components: { GurdianNav },  // 공통 컴포넌트 등록
  data() {
    return {
      currentTab: 'map',  // 기본 활성화 탭
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
    updateTab(tab) {
      this.currentTab = tab;  // 탭 업데이트
    }
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
</style>
