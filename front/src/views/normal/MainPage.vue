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

    <!-- 하단 네비게이션: NavBar 공통 컴포넌트로 대체 -->
    <NavBar :currentTab="currentTab" />
  </div>
</template>

<script>
import axios from 'axios'; // axios 라이브러리 임포트
import NavBar from '@/components/NavBar.vue'; // NavBar 컴포넌트 import

export default {
  components: {
    NavBar
  },
  data() {
    return {
      selectedType: 'adult',  // 기본 선택은 '성인용'
      currentTab: 'home',     // 현재 활성화된 탭
      adultCount: 0,          // 성인용 휠체어 개수
      childCount: 0           // 유아용 휠체어 개수
    };
  },
  mounted() {
    // 페이지가 로드될 때 휠체어 개수 가져오기
    this.fetchWheelchairCounts();
  },
  methods: {
    fetchWheelchairCounts() {
      // 성인용 휠체어 개수 가져오기
      axios.get('http://localhost:8080/wheelchair/adult')
        .then(response => {
          this.adultCount = response.data;
        })
        .catch(error => {
          console.error('성인용 휠체어 개수 가져오기 실패:', error);
        });

      // 유아용 휠체어 개수 가져오기
      axios.get('http://localhost:8080/wheelchair/child')
        .then(response => {
          this.childCount = response.data;
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
          'Authorization': `Bearer ${this.getToken()}`
        }
      })
      .then(response => {
        if (response.data) {
          this.$router.push('/rent/check');
        } else {
          alert('현재 대여 중이지 않습니다.');
        }
      })
      .catch(error => {
        console.error('대여 확인 실패:', error);
      });
    },
    getToken() {
      return localStorage.getItem('token');
    },
    goToProfile() {
      // 프로필 페이지로 이동
      this.$router.push('/profile');
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
</style>
