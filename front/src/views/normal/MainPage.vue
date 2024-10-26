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
          <p class="count">{{ adultCount }}</p> <!-- 동적으로 표시 -->
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
          <p class="count">{{ childCount }}</p> <!-- 동적으로 표시 -->
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
import axios from 'axios'; // axios 라이브러리 임포트

export default {
  data() {
    return {
      selectedType: 'adult',  // 기본 선택은 '성인용'
      currentTab: '',          // 현재 활성화된 탭 상태 (라우터 경로 기반)
      adultCount: 0,          // 성인용 휠체어 개수
      childCount: 0           // 유아용 휠체어 개수
    };
  },
  mounted() {
    // 페이지가 로드될 때 초기 탭 상태 설정 및 휠체어 개수 가져오기
    this.updateCurrentTab(this.$route.path);
    this.fetchWheelchairCounts(); // 휠체어 개수 가져오기
  },
  methods: {
    fetchWheelchairCounts() {
      // 성인용 휠체어 개수 가져오기
      axios.get('http://localhost:8080/wheelchair/adult')
        .then(response => {
          this.adultCount = response.data; // 성인용 개수 설정
        })
        .catch(error => {
          console.error('성인용 휠체어 개수 가져오기 실패:', error);
        });

      // 유아용 휠체어 개수 가져오기
      axios.get('http://localhost:8080/wheelchair/child')
        .then(response => {
          this.childCount = response.data; // 유아용 개수 설정
        })
        .catch(error => {
          console.error('유아용 휠체어 개수 가져오기 실패:', error);
        });
    },
    selectCard(type) {
      // 휠체어 타입 선택
      this.selectedType = type;
    },
    goToRentPage() {
      // 선택한 휠체어 타입을 쿼리로 전달하며 대여 페이지로 이동
      this.$router.push({ path: '/rent', query: { type: this.selectedType } });
    },
    checkRent() {
      // 대여 확인 API 호출
      axios.get('http://localhost:8080/rental/checkRent', {
        headers: {
          'Authorization': `Bearer ${this.getToken()}` // JWT 토큰 추가
        }
      })
      .then(response => {
        if (response.data) {
          // 현재 대여 중일 경우 대여 현황 페이지로 이동
          this.$router.push('/rent/check');
        } else {
          // 대여 중이 아닐 경우 알림 표시
          alert('현재 대여 중이지 않습니다.');
        }
      })
      .catch(error => {
        console.error('대여 확인 실패:', error);
      });
    },
    getToken() {
      // 토큰을 가져오는 로직 (예: 로컬 스토리지에서 가져오기)
      return localStorage.getItem('token');
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
