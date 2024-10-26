<template>
  <div class="container mt-4">
    <!-- 휠체어 현황 -->
    <h5>관리자 모드</h5>
    <p>휠체어 현황</p>

    <div class="row text-center mb-5">
      <div
          class="col"
          :class="{ 'active-card': selectedStatus === 'ALL' }"
          @click="fetchWheelchairs('ALL')">
        <div class="card p-3 inner-card">
          <h6>Total</h6>
          <p>{{ total }}</p>
        </div>
      </div>
      <div
          class="col"
          :class="{ 'active-card': selectedStatus === 'AVAILABLE' }"
          @click="fetchWheelchairs('AVAILABLE')">
        <div class="card p-3 inner-card" >
          <h6>Available</h6>
          <p>{{ available }}</p>
        </div>
      </div>
      <div
          class="col"
          :class="{ 'active-card': selectedStatus === 'BROKEN' }"
          @click="fetchWheelchairs('BROKEN')">
        <div class="card p-3 inner-card">
          <h6>Broken</h6>
          <p>{{ broken }}</p>
        </div>
      </div>
      <div
          class="col"
          :class="{ 'active-card': selectedStatus === 'WAITING' }"
          @click="fetchWheelchairs('WAITING')">
        <div class="card p-3 inner-card">
          <h6>Waiting</h6>
          <p>{{ waiting }}</p>
        </div>
      </div>
      <div
          class="col"
          :class="{ 'active-card': selectedStatus === 'RENTED' }"
          @click="fetchWheelchairs('RENTED')">
        <div class="card p-3 inner-card">
          <h6>Rented</h6>
          <p>{{ rented }}</p>
        </div>
      </div>
    </div>

    <!-- 휠체어 목록 -->
    <div v-if="wheelchairList.length > 0" class="mt-4">
      <h5>휠체어 목록</h5>
      <ul class="list-group">
        <li v-for="wheelchair in wheelchairList" :key="wheelchair.id" class="list-group-item">
          휠체어 ID: {{ wheelchair.wheelchairId }} / 상태: {{ wheelchair.status }}
        </li>
      </ul>
    </div>

    <!-- 하단 네비게이션 -->
    <nav class="bottom-nav d-flex justify-content-around align-items-center">
      <button class="nav-item" @click="goToHome">
        <i class="bi bi-house-door"></i>
        <span class="nav-text" :class="{ 'active': currentTab === 'home' }">Home</span>
      </button>
      <button class="nav-item" @click="goToWheelchair">
        <i class="bi bi-person-fill"></i> <!-- 휠체어 아이콘 대체 -->
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
      currentTab: 'wheelchair', // 현재 휠체어 탭 활성화
      total: 0, // 총 휠체어 수
      available: 0, // 사용 가능한 휠체어 수
      broken: 0, // 고장난 휠체어 수
      rented: 0, // 대여 중인 휠체어 수
      waiting: 0, // 대여 요청 대기중인 휠체어 수
      wheelchairList: [], // 선택된 상태의 휠체어 목록
      selectedStatus: 'ALL' // 선택된 상태
    };
  },
  mounted() {
    this.fetchWheelchairCounts();
  },
  methods: {
    async fetchWheelchairCounts() {
      try {
        const response = await axios.get('http://localhost:8080/api/wheelchairs/count');
        this.total = response.data.total;
        this.available = response.data.available;
        this.broken = response.data.broken;
        this.rented = response.data.rented;
        this.waiting = response.data.waiting;
      } catch (error) {
        console.error("휠체어 데이터를 가져오는 데 실패했습니다.", error);
      }
    },
    async fetchWheelchairs(status) {
      let url = `http://localhost:8080/api/wheelchairs?status=${status}`;
      this.selectedStatus = status; // 선택된 상태 변경
      try {
        const response = await axios.get(url);
        this.wheelchairList = response.data;
      } catch (error) {
        console.error("휠체어 목록을 가져오는 데 실패했습니다.", error);
      }
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

.inner-card {
  background-color: white;
  transition: background-color 0.3s ease;
}

.card {
  cursor: pointer;
}

.active-card .inner-card {
  background-color: #666; /* 어두운 회색으로 변경 */
  color: white;
}

/* 선택되지 않은 카드에만 hover 스타일 적용 */
.inner-card:not(.inner-card):hover {
  background-color: #666;
}

.inner-card:hover {
  background-color: #666;
}
</style>
