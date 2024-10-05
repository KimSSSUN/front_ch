<template>
    <div class="header d-flex justify-content-between align-items-center">
      <h5>{{ title }}</h5>
      <i class="bi bi-person-circle" @click="goToProfile"></i> <!-- 프로필로 이동 -->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        default: '메인페이지'
      }
    },
    methods: {
      goToProfile() {
        this.$router.push('/profile');
      }
    }
  };
  </script>
  
  <style scoped>
  .header {
    margin-bottom: 10px;
  }
  .bi-person-circle {
    font-size: 1.6rem;
    cursor: pointer;
  }
  </style>
  