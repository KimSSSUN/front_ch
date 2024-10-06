<template>
  <div class="container mt-4 text-center">
    <!-- 뒤로가기 아이콘 -->
    <button @click="$router.go(-1)" class="btn btn-link mb-3">
      <i class="bi bi-arrow-left"></i>
    </button>

    <!-- 휠체어 정보 및 이미지 -->
    <h5>{{ selectedType === 'adult' ? '성인용 휠체어' : '유아용 휠체어' }}</h5>
    <img 
      :src="wheelchairImage" 
      alt="Wheelchair" 
      class="img-fluid mb-4" 
      style="width: 150px; height: auto;" 
    />

    <!-- 대여일, 반납일 선택 -->
    <div class="d-flex justify-content-around mb-3">
      <div>
        <label>대여일</label>
        <input type="date" class="form-control" v-model="rentalStartDate" @change="validateDates" />
      </div>
      <div>
        <label>반납일</label>
        <input type="date" class="form-control" v-model="rentalEndDate" @change="validateDates" />
      </div>
    </div>

    <p>최대 대여일수: 7일</p>
    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p> <!-- 경고 메시지 -->

    <!-- 대여하기 버튼 -->
    <button class="btn btn-dark btn-lg w-100" @click="rentWheelchair">대여하기</button>

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
      wheelchairTypes: [], // 휠체어 타입 목록 (필요에 따라 추가)
      selectedType: '', // 사용자가 선택한 휠체어 타입
      rentalStartDate: '', // 대여 시작일
      rentalEndDate: '', // 반납일
      rental: null,
      errorMessage: '', // 오류 메시지
      currentTab: 'rent', // 기본 탭 설정
    };
  },
  computed: {
    wheelchairImage() {
      return this.selectedType === 'adult'
        ? require('@/assets/wheelchair.jpg') // 성인용 이미지
        : require('@/assets/wheelchair.jpg'); // 유아용 이미지
    }
  },
  mounted() {
    // 라우터 쿼리에서 휠체어 타입 가져오기
    this.selectedType = this.$route.query.type || 'adult';
    this.currentTab = this.$route.query.tab || 'rent';  // 현재 탭 초기화
  },
  methods: {
    validateDates() {
      if (this.rentalStartDate && this.rentalEndDate) {
        const startDate = new Date(this.rentalStartDate);
        const endDate = new Date(this.rentalEndDate);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 7) {
          this.errorMessage = '대여일수는 최대 7일을 초과할 수 없습니다.';
        } else if (endDate < startDate) {
          this.errorMessage = '반납일은 대여일 이후여야 합니다.';
        } else {
          this.errorMessage = '';
        }
      }
    },
    async rentWheelchair() {
      if (this.errorMessage) {
        alert(this.errorMessage);
        return;
      }
      if (!this.rentalStartDate || !this.rentalEndDate) {
        alert('대여일과 반납일을 선택해주세요.');
        return;
      }

      // DTO에 맞게 변환하여 데이터 생성
      const rentalRequest = {
        wheelchairType: this.selectedType === 'adult' ? 'ADULT' : 'CHILD', // WheelchairType으로 변환
        rentalDate: this.rentalStartDate, // ISO 형식의 대여 시작일
        returnDate: this.rentalEndDate, // ISO 형식의 반납일
      };

      // 대여 요청
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/rental/rent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(rentalRequest), // DTO 형식으로 변환된 데이터 전송
        });

        if (response.ok) {
          const rentalData = await response.json();
          // 대여 완료 후 대여 정보 전달 (라우터에 쿼리 파라미터로 전달)
          this.$router.push({
            path: '/rent/check',
            query: {
              type: this.selectedType,
              startDate: this.rentalStartDate,
              endDate: this.rentalEndDate,
              tab: this.currentTab,  // 현재 탭 상태 전달
              rentalId: rentalData.id, // 대여 ID 추가
            }
          });
          alert('대여 요청이 성공적으로 처리되었습니다.');
        } else {
          alert('대여 요청 처리에 실패했습니다.');
        }
      } catch (error) {
        console.error('대여 요청 중 오류 발생:', error);
      }
    },
    // 네비게이션 이동 메서드
    goToHome() {
      this.$router.push({ path: '/normal', query: { tab: 'home' } });
      this.currentTab = 'home';  // 탭 업데이트
    },
    goToRent() {
      this.$router.push({ path: '/rent', query: { tab: 'rent' } });
      this.currentTab = 'rent';  // 탭 업데이트
    },
    goToCommunity() {
      this.$router.push({ path: '/community', query: { tab: 'community' } });
      this.currentTab = 'community';  // 탭 업데이트
    }
  }
};
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #ddd;
  padding: 10px 0;
  z-index: 1000; /* z-index 추가 */
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
