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

    <!-- Bottom Navigation Component -->
    <AdminNav currentTab="wheelchair" />
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
      currentTab: 'wheelchair',
      total: 0,
      available: 0,
      broken: 0,
      rented: 0,
      waiting: 0,
      wheelchairList: [],
      selectedStatus: 'ALL'
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
      this.selectedStatus = status;
      try {
        const response = await axios.get(url);
        this.wheelchairList = response.data;
      } catch (error) {
        console.error("휠체어 목록을 가져오는 데 실패했습니다.", error);
      }
    }
  }
};
</script>

<style scoped>
/* 기존 스타일 그대로 유지 */
</style>
