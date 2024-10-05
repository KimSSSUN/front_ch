<!-- src/components/NavBar.vue -->
<template>
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
  </template>
  
  <script>
  export default {
    props: {
      currentTab: {
        type: String,
        required: true
      }
    },
    methods: {
      goToHome() {
        this.$router.push('/normal');
      },
      goToRent() {
        this.$router.push('/rent/check');
      },
      goToCommunity() {
        this.$router.push('/community');
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
  