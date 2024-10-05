<template>
  <div class="login-page d-flex justify-content-center align-items-center">
    <div class="login-box">
      <form>
        <div class="mb-4">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
            placeholder="Email"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
            placeholder="Password"
          />
        </div>

        <!-- 로그인 버튼 -->
        <button
          type="button"
          class="btn btn-light btn-lg w-100 mb-2"
          @click="login"
        >
          로그인
        </button>

        <!-- 회원가입 버튼 -->
        <button
          type="button"
          class="btn btn-dark btn-lg w-100"
          @click="$router.push('/signup')"
        >
          회원가입
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (!storedUserInfo) {
        alert('등록된 유저 정보가 없습니다. 회원가입을 해주세요.');
        return;
      }

      const userInfo = JSON.parse(storedUserInfo);

      // 이메일과 비밀번호를 비교하여 로그인 처리
      if (this.email === userInfo.email && this.password === userInfo.password) {
        if (userInfo.mode === 'user') {
          this.$router.push('/normal');
        } else if (userInfo.mode === 'admin') {
          this.$router.push('/admin/rental');
        } else if (userInfo.mode === 'guardian') {
          this.$router.push('/guardian/profile');
        }
      } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
    }
  }
};
</script>


<style scoped>
/* 로그인 페이지 전체 */
.login-page {
  height: 100vh;
  background-color: white;
}

/* 로그인 박스 */
.login-box {
  width: 360px;
  padding: 20px;
  background-color: white;
}

/* 버튼들 스타일 */
.btn-lg {
  font-size: 1rem;
  height: 50px;
  border-radius: 30px;
}

.btn-light {
  background-color: #f5f5f5;
  border-color: transparent;
}

.btn-dark {
  background-color: black;
  border-color: black;
}

/* Google, Facebook 버튼의 크기 조정 */
.w-45 {
  width: 45%;
}

/* 텍스트 스타일 조정 */
.form-label {
  font-size: 0.9rem;
  color: black;
  font-weight: bold;
}

input.form-control {
  border-radius: 10px;
  height: 50px;
  font-size: 1rem;
  padding: 10px 20px;
  border: 1px solid #ddd;
}

a {
  font-size: 0.9rem;
  text-decoration: none;
}

.text-muted {
  font-size: 0.85rem;
}
</style>
