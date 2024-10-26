<template>
  <div class="intro-container d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="text-center">
      <!-- 로고에 애니메이션 효과 추가 -->
      <img src="/chairing_logo.png" alt="Chairing Logo" class="intro-logo mb-4">
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntroPage',
  mounted() {
    setTimeout(() => {
      this.$router.push('/login');
    }, 4000); // 4초 후 로그인 페이지로 이동
  }
};
</script>

<style scoped>
/* 전체 화면을 채우는 컨테이너 */
.intro-container {
  background-color: white; /* 원하는 배경 색상으로 설정 가능 */
}

/* 로고 애니메이션 효과 */
.intro-logo {
  width: 300px; /* 처음 크기 조정 (더 큼) */
  animation: rotateIn 3s ease forwards; /* 새로운 애니메이션 적용 */
}

/* 애니메이션 키프레임 정의 */
@keyframes rotateIn {
  0% {
    opacity: 0;
    transform: scale(0.3) rotate(-200deg); /* 작고 회전된 상태로 시작 */
  }
  50% {
    opacity: 1;
    transform: scale(1.1) rotate(10deg); /* 중간에서 커지며 살짝 튀어나옴 */
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg); /* 최종 크기와 위치 */
  }
}
</style>
