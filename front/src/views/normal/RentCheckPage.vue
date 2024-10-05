<template>
  <div class="container mt-4 text-center">
    <h5>예약 현황</h5>

    <!-- 예약 번호 -->
    <div class="reservation-number mt-4">
      <strong>예약 번호</strong>
      <p>{{ reservationNumber }}</p>
    </div>

    <!-- 예약 기간 -->
    <div class="rental-period mt-4">
      <strong>예약 기간</strong>
      <p>{{ formattedRentalPeriod }}</p>
    </div>

    <!-- 휠체어 타입 -->
    <div class="wheelchair-type mt-4">
      <strong>휠체어 타입</strong>
      <p>{{ wheelchairType }}</p>
    </div>

    <!-- 예약 상태 -->
    <div class="reservation-status mt-4" :class="statusClass">
      <strong>상태</strong>
      <p>{{ status }}</p>
    </div>

    <!-- 상태 바 -->
    <div class="status-bar mt-3">
      <div class="progress-bar" :style="{ width: statusProgress + '%' }"></div>
    </div>

    <!-- 예약 취소 버튼 -->
    <button 
      v-if="status !== 'Cancelled'" 
      class="btn btn-danger w-100 mt-3" 
      @click="cancelReservation"
    >
      예약 취소
    </button>

    <!-- 네비게이션 바 -->
    <nav class="bottom-nav d-flex justify-content-around align-items-center mt-4">
      <button class="nav-item" @click="goToHome">
        <i class="bi bi-house-door"></i>
        <span class="nav-text">Home</span>
      </button>
      <button class="nav-item" @click="goToRent">
        <i class="bi bi-cart"></i>
        <span class="nav-text">Rent</span>
      </button>
      <button class="nav-item" @click="goToCommunity">
        <i class="bi bi-chat"></i>
        <span class="nav-text">Community</span>
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reservationNumber: 'WCR123456',  // 예약 번호
      wheelchairType: '',              // 휠체어 타입
      rentalStartDate: '',             // 대여 시작일
      rentalEndDate: '',               // 대여 종료일
      status: 'Confirmed',             // 상태
    };
  },
  computed: {
    formattedRentalPeriod() {
      return `${this.rentalStartDate} - ${this.rentalEndDate}`;
    },
    statusProgress() {
      return this.status === 'Confirmed' ? 100 : this.status === 'Cancelled' ? 0 : 50;  // 상태에 따른 진행바 크기
    },
    statusClass() {
      return this.status === 'Cancelled' ? 'text-danger' : 'text-success'; // 상태에 따른 스타일 변경
    }
  },
  mounted() {
    const query = this.$route.query;
    this.wheelchairType = query.type || '성인용';   // 휠체어 타입 (쿼리에서 가져옴)
    this.rentalStartDate = query.startDate || '2023-08-17'; // 대여 시작일
    this.rentalEndDate = query.endDate || '2023-08-24';     // 대여 종료일
  },
  methods: {
    goToHome() {
      this.$router.push('/normal');
    },
    goToRent() {
      this.$router.push('/rent');
    },
    goToCommunity() {
      this.$router.push('/community');
    },
    cancelReservation() {
      if (confirm('정말 예약을 취소하시겠습니까?')) {
        this.status = 'Cancelled';  // 상태를 취소로 변경
        alert('예약이 취소되었습니다.');
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
}

.reservation-number, .rental-period, .wheelchair-type, .reservation-status {
  text-align: left;
  margin-bottom: 20px;
}

.status-bar {
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
}

.progress-bar {
  height: 10px;
  background-color: #007bff;
  border-radius: 5px;
}

/* 하단 내비게이션 스타일 통일 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #ddd;
  padding: 10px 0;
  z-index: 1000;
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
