<template>
  <div class="signup">
    <h1>Signup</h1>
    <form @submit.prevent="signupUser">
      <input type="text" v-model="username" placeholder="Name" required />
      
      <!-- 비밀번호 필드 먼저 -->
      <input type="password" v-model="password" placeholder="Password" required />
      
      <input type="text" v-model="phoneNumber" placeholder="ex)010-XXXX-XXXX" required />

      <!-- 역할 선택을 위한 셀렉트 박스 -->
      <select v-model="role" required>
        <option value="" disabled selected>Select Role</option>
        <option value="NORMAL">Normal</option>
        <option value="ADMIN">Admin</option>
        <option value="GUARDIAN">Guardian</option>
      </select>

      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignupPage',
  data() {
    return {
      username: '',
      password: '',
      phoneNumber: '',
      role: ''  // 선택된 역할 저장
    };
  },
  methods: {
    async signupUser() {
      try {
        // 회원가입 요청
        const response = await axios.post('http://localhost:8080/user/signup', {
          username: this.username,
          password: this.password,
          phoneNumber: this.phoneNumber,
          role: this.role  // 선택된 역할 전송
        });

        // 요청이 성공하면 로그인 페이지로 리다이렉트
        if (response.status === 201) {
          alert('회원가입이 완료되었습니다. 로그인 해주세요.');
          this.$router.push('/login');
        }
      } catch (error) {
        console.error("Signup failed:", error);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    }
  }
};
</script>

<style scoped>
/* 여기에 스타일 추가 */
.signup {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.signup h1 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

input, select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #333;
}
</style>
