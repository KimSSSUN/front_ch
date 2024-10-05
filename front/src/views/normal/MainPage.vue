<template>
  <div class="main-page container">
    <!-- 상단 헤더 -->
    <div class="header d-flex justify-content-between align-items-center">
      <h5>메인페이지</h5>
      <i class="bi bi-person-circle" @click="goToProfile"></i> <!-- 프로필로 이동 -->
    </div>

    <!-- 휠체어 현황 -->
    <h6 class="mt-3 mb-3">휠체어 현황</h6>
    <div class="row">
      <!-- 성인용 카드 -->
      <div class="col-6">
        <div 
          class="card wheelchair-card" 
          :class="{ 'active-card': selectedType === 'adult' }" 
          @click="selectCard('adult')"
        >
          <h6 class="card-title">성인용</h6>
          <p class="status">대여 가능</p>
          <p class="count">20</p>
        </div>
      </div>

      <!-- 유아용 카드 -->
      <div class="col-6">
        <div 
          class="card wheelchair-card" 
          :class="{ 'active-card': selectedType === 'child' }" 
          @click="selectCard('child')"
        >
          <h6 class="card-title">유아용</h6>
          <p class="status">대여 가능</p>
          <p class="count">10</p>
        </div>
      </div>
    </div>

    <!-- 버튼 섹션 -->
    <button class="btn btn-dark btn-lg w-100 mt-3" @click="goToRentPage">휠체어 대여하기</button>
    <button class="btn btn-light btn-lg w-100 mt-2" @click="checkRent">대여 확인</button>

    <!-- 하단 네비게이션 -->
    <nav class="bottom-nav d-flex justify-content-around align-items-center">
      <button class="nav-item" @click="goToHome">
        <i class="bi bi-house-door"></i>
        <span class="nav-text" :class="{ 'active': currentTab === 'home' }">Home</span>
      </button>
      <button class="nav-item" @click="goToRent">
        <i class="bi bi-cart"></i>
        <span class="nav-text" :class="{ 'active': currentTab === 'rent' }">Rent</span>
      </button>
      <button class="nav-item" @click="goToCommunity">
        <i class="bi bi-chat"></i>
        <span class="nav-text" :class="{ 'active': currentTab === 'community' }">Community</span>
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedType: 'adult',  // 기본 선택은 '성인용'
      currentTab: ''          // 현재 활성화된 탭 상태 (라우터 경로 기반)
    };
  },
  mounted() {
    // 페이지가 로드될 때 초기 탭 상태 설정
    this.updateCurrentTab(this.$route.path);
  },
  methods: {
    selectCard(type) {
      // 휠체어 타입 선택
      this.selectedType = type;
    },
    goToRentPage() {
      // 선택한 휠체어 타입을 쿼리로 전달하며 대여 페이지로 이동
      this.$router.push({ path: '/rent', query: { type: this.selectedType } });
    },
    checkRent() {
      // 대여 확인 페이지로 이동
      this.$router.push('/rent/check');
    },
    goToHome() {
      // 홈 페이지로 이동
      this.$router.push('/normal');
    },
    goToRent() {
      // 대여 페이지로 이동
      this.$router.push('/rent');
    },
    goToCommunity() {
      // 커뮤니티 페이지로 이동
      this.$router.push('/community');
    },
    goToProfile() {
      // 프로필 페이지로 이동
      this.$router.push('/profile');
    },
    updateCurrentTab(path) {
      // 현재 경로에 따라 탭 상태 업데이트
      if (path.includes('rent')) {
        this.currentTab = 'rent';
      } else if (path.includes('community')) {
        this.currentTab = 'community';
      } else {
        this.currentTab = 'home';
      }
    }
  },
  watch: {
    // 라우터 경로가 변경될 때마다 호출
    '$route.path': function(newPath) {
      this.updateCurrentTab(newPath);
    }
  }
};
</script>

<style scoped>
/* 메인 페이지 전체 레이아웃 */
.main-page {
  padding-top: 15px;
}

/* 상단 헤더 스타일 */
.header {
  margin-bottom: 10px;
}

.bi-person-circle {
  font-size: 1.6rem;
}

/* 휠체어 카드 스타일 */
.wheelchair-card {
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.wheelchair-card:hover {
  transform: scale(1.05);
}

.wheelchair-card {
  background-color: #adb5bd;
}

.wheelchair-card.active-card {
  background-color: #6c757d;
}

/* 네비게이션 스타일 */
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
  border: none;   /* 테두리 없애기 */
  box-shadow: none; /* 네모 그림자 제거 */
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
