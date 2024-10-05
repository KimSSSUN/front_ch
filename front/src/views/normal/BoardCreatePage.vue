<template>
  <div class="container mt-4">
    <!-- 상단 제목과 닫기 버튼 -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5>오늘의 소식 업로드</h5>
      <button class="btn btn-link" @click="goBack">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>

    <!-- 글쓰기 폼 -->
    <input type="text" class="form-control mb-3" placeholder="Title" />
    <textarea class="form-control mb-3" rows="5" placeholder="Write your notice here"></textarea>

    <!-- 사진 추가 버튼 -->
    <div class="mb-3">
      <button class="btn btn-light">
        <i class="bi bi-image"></i> Add a photo
      </button>
    </div>

    <!-- 글쓰기 완료 버튼 -->
    <button class="btn btn-dark w-100">Post</button>
  </div>
</template>

<script>
export default {
  name: 'BoardCreatePage',
  methods: {
    // 이전 페이지로 돌아가기
    goBack() {
      this.$router.go(-1);  // 이전 페이지로 돌아감
    }
  }
}
</script>

<style scoped>
.bi-x-lg {
  font-size: 1.5rem;
}
</style>
