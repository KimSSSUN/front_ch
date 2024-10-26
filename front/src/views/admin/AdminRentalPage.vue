<template>
  <div class="container mt-4">
    <!-- 대여 관리 리스트 -->
    <h5>관리자 모드</h5>
    <p>대여 관리</p>

    <!-- 대여 상태가 WAITING인 목록 표시 -->
    <ul v-if="waitingRentals.length > 0" class="list-group mb-5">
      <li v-for="rental in waitingRentals" :key="rental.rentalId" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h6>{{ rental.wheelchair?.type || '알 수 없는 유형' }} 휠체어 대여</h6>
          <small>{{ formatDate(rental.rentalDate) }} - {{ formatDate(rental.returnDate) }}</small>
        </div>
        <div>
          <button class="btn btn-success btn-sm me-2" @click="approveRental(rental.rentalId)">수락</button>
          <button class="btn btn-danger btn-sm" @click="rejectRental(rental.rentalId)">취소</button>
        </div>
      </li>
    </ul>
    <p v-else>대기 중인 대여 요청이 없습니다.</p>

    <!-- 하단 네비게이션 -->
    <nav class="bottom-nav d-flex justify-content-around align-items-center">
      <button class="nav-item" @click="goToHome">
        <i class="bi bi-house-door"></i>
        <span class="nav-text" :class="{ 'active': currentTab === 'home' }">Home</span>
      </button>
      <button class="nav-item" @click="goToWheelchair">
        <i class="bi bi-person-fill"></i>
        <span class="nav-text" :class="{ 'active': currentTab === 'wheelchair' }">Wheelchair</span>
      </button>
      <button class="nav-item" @click="goToRentals">
        <i class="bi bi-list"></i>
        <span class="nav-text" :class="{ 'active': currentTab === 'rentals' }">Rentals</span>
      </button>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentTab: 'rentals', // Rentals 탭을 기본 활성화
      waitingRentals: [] // WAITING 상태의 대여 목록
    };
  },
  mounted() {
    this.fetchWaitingRentals();
  },
  methods: {
    async fetchWaitingRentals() {
      try {
        // rentalStatus가 WAITING인 대여 목록을 API를 통해 가져옴
        const response = await axios.get('http://localhost:8080/rental/list');
        this.waitingRentals = response.data;
      } catch (error) {
        console.error('Failed to fetch waiting rentals:', error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    approveRental(rentalId) {
      // 수락 버튼을 눌렀을 때 대여를 승인하는 로직 추가
      axios.put(`http://localhost:8080/api/rentals/${rentalId}/approve`)
          .then(() => {
            this.fetchWaitingRentals(); // 리스트 새로고침
          })
          .catch((error) => {
            console.error('Failed to approve rental:', error);
          });
    },
    rejectRental(rentalId) {
      // 취소 버튼을 눌렀을 때 대여를 취소하는 로직 추가
      axios.put(`http://localhost:8080/api/rentals/${rentalId}/reject`)
          .then(() => {
            this.fetchWaitingRentals(); // 리스트 새로고침
          })
          .catch((error) => {
            console.error('Failed to reject rental:', error);
          });
    },
    goToHome() {
      this.$router.push('/normal');
      this.currentTab = 'home';
    },
    goToWheelchair() {
      this.$router.push('/admin/wheelchair');
      this.currentTab = 'wheelchair';
    },
    goToRentals() {
      this.$router.push('/admin/rental');
      this.currentTab = 'rentals';
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
