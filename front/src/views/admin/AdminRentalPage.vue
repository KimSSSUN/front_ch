<template>
  <div class="container mt-4">
    <!-- 대여 관리 리스트 -->
    <h5>관리자 모드</h5>
    <p>대여 관리</p>
    
    <ul class="list-group mb-5">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h6>성인용 휠체어 대여</h6>
          <small>08/24 - 08/26</small>
        </div>
        <div>
          <button class="btn btn-success btn-sm me-2">수락</button>
          <button class="btn btn-danger btn-sm">취소</button>
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h6>유아용 휠체어 대여</h6>
          <small>09/01 - 09/06</small>
        </div>
        <div>
          <button class="btn btn-success btn-sm me-2">수락</button>
          <button class="btn btn-danger btn-sm">취소</button>
        </div>
      </li>
    </ul>

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
export default {
  data() {
    return {
      currentTab: 'rentals' // Rentals 탭을 기본 활성화
    };
  },
  methods: {
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
