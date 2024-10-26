<template>
    <nav class="bottom-nav d-flex justify-content-around align-items-center">
      <button class="nav-item" @click="goToMap">
        <i class="bi bi-map"></i>
        <span class="nav-text" :class="{ 'active': currentTab === 'map' }">Map</span>
      </button>
      <button class="nav-item" @click="goToProfile">
        <i class="bi bi-person"></i>
        <span class="nav-text" :class="{ 'active': currentTab === 'profile' }">Profile</span>
      </button>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      currentTab: {
        type: String,
        required: true,
      },
    },
    methods: {
      goToMap() {
        this.$router.push("/guardian/map");
        this.$emit("update-tab", "map");  // 부모 컴포넌트에 현재 탭 변경 이벤트 전달
      },
      goToProfile() {
        this.$router.push("/guardian/profile");
        this.$emit("update-tab", "profile");
      },
    },
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
    z-index: 1000; /* 네비게이션을 항상 위에 표시 */
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
  