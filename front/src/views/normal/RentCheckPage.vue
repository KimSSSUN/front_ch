<template>
  <div class="container mt-4 text-center">
    <h5>대여 현황</h5>

    <!-- 대여 코드 -->
    <div class="reservation-number mt-4">
      <strong>대여 코드</strong>
      <p>{{ currentRental.rentalCode }}</p>
    </div>

    <!-- 대여 기간 -->
    <div class="rental-period mt-4">
      <strong>대여 기간</strong>
      <p>{{ formattedRentalPeriod }}</p>
    </div>

    <!-- 휠체어 타입 -->
    <div class="wheelchair-type mt-4" v-if="currentRental.wheelchair">
      <strong>휠체어 타입</strong>
      <p>{{ currentRental.wheelchair.type }}</p>
    </div>

    <!-- 예약 상태 -->
    <div class="reservation-status mt-4" :class="statusClass">
      <strong>상태</strong>
      <p>{{ currentRental.status }}</p>
    </div>

    <!-- 상태 바 -->
    <div class="status-bar mt-3">
      <div class="progress-bar" :style="{ width: statusProgress + '%' }"></div>
    </div>

    <!-- 대여 취소하기 또는 미리 반납하기 버튼 -->
    <button 
      v-if="currentRental.status === 'WAITING'" 
      class="btn btn-warning w-100 mt-3" 
      @click="cancelReservation"
    >
      대여 취소하기
    </button>

    <button 
      v-else-if="currentRental.status !== 'Cancelled' && currentRental.status !== 'RETURNED'" 
      class="btn btn-danger w-100 mt-3" 
      @click="returnRental"
    >
      미리 반납하기
    </button>

    <!-- 공통 NavBar 컴포넌트 사용 -->
    <NavBar :currentTab="'rent'" />
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      user: null,
      currentRental: {
        wheelchair: {}
      },
    };
  },
  computed: {
    formattedRentalPeriod() {
      return `${this.currentRental.rentalDate} - ${this.currentRental.returnDate}`;
    },
    statusProgress() {
      return this.currentRental.status === 'ACTIVE' ? 50 : this.currentRental.status === 'Cancelled' ? 0 : 100;
    },
    statusClass() {
      return this.currentRental.status === 'Cancelled' ? 'text-danger' : 'text-success';
    },
  },
  created() {
    this.fetchCurrentUser();
  },
  methods: {
    async fetchCurrentUser() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/rental/currRent', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data;
        this.currentRental = this.user || {};
      } catch (error) {
        console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
      }
    },
    async returnRental() {
      if (confirm('정말 반납하시겠습니까?')) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:8080/rental/return', {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            alert('반납이 완료되었습니다.');
            this.currentRental.status = 'RETURNED';
            this.fetchCurrentUser();
            this.$router.push('/normal');
          } else {
            alert('반납 처리 중 오류가 발생했습니다.');
          }
        } catch (error) {
          console.error('반납 처리 중 오류:', error);
          alert('반납 처리 중 오류가 발생했습니다.');
        }
      }
    },
    async cancelReservation() {
      if (confirm('정말 대여를 취소하시겠습니까?')) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:8080/rental/cancel', {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            alert('대여가 취소되었습니다.');
            this.currentRental.status = 'Cancelled';
            this.fetchCurrentUser();
            this.$router.push('/normal');
          } else {
            alert('대여 취소 중 오류가 발생했습니다.');
          }
        } catch (error) {
          console.error('대여 취소 중 오류:', error);
          alert('대여 취소 중 오류가 발생했습니다.');
        }
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

.reservation-number,
.rental-period,
.wheelchair-type,
.reservation-status {
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
</style>
