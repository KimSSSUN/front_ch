<template>
  <div class="profile-container text-center">
    <h5>Guardian Profile</h5>
    <div class="profile-card">
      <img :src="profileImage" alt="Profile" class="profile-img" />
      <h6>{{ guardianName }}</h6>
      <p>{{ guardianLocation }}</p>
    </div>

    <div class="info-card">
      <h6>Phone: {{ guardianPhone }}</h6>
      <h6>Email: {{ guardianEmail }}</h6>
    </div>

    <!-- 로그아웃 버튼 -->
    <button class="btn btn-danger btn-lg w-100 mt-4" @click="logout">로그아웃</button>

    <!-- 로그아웃 메시지 -->
    <p v-if="showLogoutMessage" class="text-success mt-3">{{ logoutMessage }}</p>

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
export default {
  data() {
    return {
      currentTab: 'profile', // 현재 활성화된 탭
      profileImage: require("@/assets/profile.jpg"), // 임의의 프로필 이미지 경로
      guardianName: "김땡땡",
      guardianLocation: "수원, 대한민국",
      guardianPhone: "010-1234-5678",
      guardianEmail: "guardian@example.com",
      showLogoutMessage: false, // 로그아웃 메시지 표시 여부
      logoutMessage: '로그아웃되었습니다!' // 로그아웃 메시지
    };
  },
  methods: {
    goToMap() {
      // Map 버튼 클릭 시 지도로 이동
      this.$router.push("/guardian/map");
      this.currentTab = "map"; // 현재 탭을 map으로 변경
    },
    goToProfile() {
      // Profile 버튼 클릭 시 프로필 페이지로 이동
      this.$router.push("/guardian/profile");
      this.currentTab = "profile"; // 현재 탭을 profile로 변경
    },
    logout() {
      // localStorage에서 유저 정보 삭제
      localStorage.removeItem('userInfo');

      // 로그아웃 메시지 표시
      this.showLogoutMessage = true;

      // 2초 후에 로그인 페이지로 이동
      setTimeout(() => {
        this.$router.push('/login');
      }, 2000); // 2초 대기 후 로그인 페이지로 이동
    }
  }
};
</script>

<style scoped>
.profile-container {
  margin-top: 20px;
}

.profile-card {
  margin-bottom: 20px;
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.info-card {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #ddd;
  padding: 10px 0;
  z-index: 1000; /* 네비게이션을 항상 위에 표시 */
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

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
  font-size: 1rem;
  padding: 10px;
}

.text-success {
  color: green;
  font-weight: bold;
  font-size: 1rem;
}
</style>
