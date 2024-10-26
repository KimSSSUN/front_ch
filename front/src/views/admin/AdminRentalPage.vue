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

    <!-- Bottom Navigation Component -->
    <AdminNav currentTab="rentals" />
  </div>
</template>

<script>
import axios from 'axios';
import AdminNav from '@/components/AdminNav.vue';

export default {
  components: {
    AdminNav,
  },
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
      axios.put(`http://localhost:8080/api/rentals/${rentalId}/approve`)
          .then(() => {
            this.fetchWaitingRentals();
          })
          .catch((error) => {
            console.error('Failed to approve rental:', error);
          });
    },
    rejectRental(rentalId) {
      axios.put(`http://localhost:8080/api/rentals/${rentalId}/reject`)
          .then(() => {
            this.fetchWaitingRentals();
          })
          .catch((error) => {
            console.error('Failed to reject rental:', error);
          });
    }
  }
};
</script>

<style scoped>
/* 기존 스타일 그대로 유지 */
</style>
