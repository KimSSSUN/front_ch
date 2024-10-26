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
import axios from 'axios';  // Axios 추가

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
  login() {
    axios.post('http://localhost:8080/user/login', {  // 8080에 요청 보내기
      username: this.email,  // 이메일을 username 필드로 전달
      password: this.password
    })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      this.$router.push('/profile');  // 로그인 성공 후 프로필 페이지로 이동
    })
    .catch(error => {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      alert('로그인에 실패했습니다.');
    });
  }
}



};
</script>

<style scoped>
/* 스타일 그대로 유지 */
.login-page {
  height: 100vh;
  background-color: white;
}
.login-box {
  width: 360px;
  padding: 20px;
  background-color: white;
}
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
.w-45 {
  width: 45%;
}
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
