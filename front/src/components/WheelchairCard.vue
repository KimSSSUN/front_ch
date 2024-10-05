<template>
    <div 
      class="card wheelchair-card" 
      :class="{ 'active-card': isActive }" 
      @click="$emit('select')"
    >
      <h6 class="card-title">{{ title }}</h6>
      <p class="status">{{ status }}</p>
      <p class="count">{{ count }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      status: String,
      count: Number,
      isActive: Boolean
    }
  };
  </script>
  
  <style scoped>
  .wheelchair-card {
    padding: 20px;
    border-radius: 15px;
    text-align: center;
    color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  .wheelchair-card.active-card {
    background-color: #6c757d;
  }
  .wheelchair-card:hover {
    transform: scale(1.05);
  }
  </style>
  