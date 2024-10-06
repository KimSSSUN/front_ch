<template>
  <div class="login-page d-flex justify-content-center align-items-center">
    <div class="login-box">
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            id="username"
            class="form-control"
            v-model="username"
            placeholder="Username"
            required
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
            required
          />
        </div>

        <!-- 로그인 버튼 -->
        <button
          type="submit"
          class="btn btn-light btn-lg w-100 mb-2"
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
import axios from 'axios';

export default {
  data() {
    return {
      username: '', // 이메일 대신 사용자 이름을 사용
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/user/login', {
          username: this.username,
          password: this.password
        });

        if (response.status === 200) {
          const token = response.data.token; // 로그인 응답에서 토큰을 가져옴
          localStorage.setItem('token', token); // 토큰을 로컬 스토리지에 저장

          // 현재 사용자 정보 가져오기
          const userResponse = await axios.get('http://localhost:8080/user/current', {
            headers: {
              Authorization: `Bearer ${token}` // Bearer 토큰 포함
            }
          });

          if (userResponse.status === 200) {
            const userInfo = userResponse.data; // 현재 사용자 정보
            const role = userInfo.role; // 역할 정보
            localStorage.setItem('role', role); 
            console.log(role)
            console.log(localStorage.getItem('token'))

            // 사용자 모드에 따라 라우팅
            if (role === 'NORMAL') {
              this.$router.push('/normal');
            } else if (role === 'ADMIN') {
              this.$router.push('/admin/rental');
            } else if (role === 'GUARDIAN') {
              this.$router.push('/guardian/profile');
            } else {
              console.warn('Unknown role:', role);
            }
          }
        }
      } catch (error) {
        alert('사용자 이름 또는 비밀번호가 일치하지 않습니다.');
        console.error('Login failed:', error);
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
