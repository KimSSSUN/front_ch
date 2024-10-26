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

    <!-- 공통 네비게이션 컴포넌트 추가 -->
    <GurdianNav :currentTab="currentTab" @update-tab="updateTab" />
  </div>
</template>

<script>
import axios from 'axios';
import GurdianNav from "@/components/GurdianNav.vue"; // 공통 컴포넌트 임포트

export default {
  components: { GurdianNav },  // 공통 컴포넌트 등록
  data() {
    return {
      currentTab: 'profile', // 현재 활성화된 탭
      profileImage: require("@/assets/profile.jpg"), // 기본 프로필 이미지 경로
      guardianName: "가디언 이름",
      guardianLocation: "위치 정보 없음",
      guardianPhone: "전화번호 없음",
      guardianEmail: "이메일 없음",
      showLogoutMessage: false, // 로그아웃 메시지 표시 여부
      logoutMessage: '로그아웃되었습니다!' // 로그아웃 메시지
    };
  },
  methods: {
    goToMap() {
      this.$router.push("/guardian/map");
      this.currentTab = "map";  // 현재 탭 업데이트
    },
    logout() {
      localStorage.removeItem('token');
      this.showLogoutMessage = true;
      setTimeout(() => {
        this.$router.push('/login');
      }, 2000);
    },
    fetchGuardianInfo() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인 후 접근해주세요.');
        this.$router.push('/login');
        return;
      }
      axios.get('http://localhost:8080/user/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const guardianInfo = response.data;
        this.guardianName = guardianInfo.name || '가디언 이름 없음';
        this.guardianLocation = guardianInfo.location || '위치 정보 없음';
        this.guardianPhone = guardianInfo.phone || '전화번호 없음';
        this.guardianEmail = guardianInfo.email || '이메일 없음';
        this.profileImage = guardianInfo.profileImage || require('@/assets/profile.jpg');
      })
      .catch((error) => {
        console.error('가디언 정보를 가져오는 중 오류 발생', error);
        alert('가디언 정보를 가져오지 못했습니다.');
      });
    },
    updateTab(tab) {
      this.currentTab = tab;  // 탭 업데이트
    }
  },
  mounted() {
    this.fetchGuardianInfo();
  },
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
</style>
