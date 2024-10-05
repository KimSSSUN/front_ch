<template>
    <div class="bottom-nav d-flex justify-content-around align-items-center">
      <button class="btn btn-link nav-item" @click="goToHome">
        <i class="bi bi-house-door"></i>
        <span>Home</span>
      </button>
      <button class="btn btn-link nav-item" @click="goToRent">
        <i class="bi bi-cart"></i>
        <span>Rent</span>
      </button>
      <button class="btn btn-link nav-item" @click="goToCommunity">
        <i class="bi bi-chat"></i>
        <span>Community</span>
      </button>
    </div>
  </template>
  
  <script>
  export default {
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
    color: black;
  }
  .nav-item i {
    font-size: 1.4rem;
  }
  .nav-item span {
    font-size: 0.75rem;
  }
  </style>