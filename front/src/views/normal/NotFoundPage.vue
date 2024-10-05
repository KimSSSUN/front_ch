<!-- src/views/NotFoundPage.vue -->
<template>
    <div class="container text-center mt-5">
      <h1>404 - 페이지를 찾을 수 없습니다.</h1>
      <p>요청하신 페이지가 존재하지 않습니다. 다시 시도해주세요.</p>
      <router-link to="/" class="btn btn-dark mt-3">메인 페이지로 돌아가기</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFoundPage',
  };
  </script>
  