<template>
  <div class="signup-page container">
    <h3>Create an account</h3>

    <!-- 모드 선택 체크박스 -->
    <div class="form-check">
      <input type="checkbox" id="normalMode" v-model="normalMode" @change="onModeChange('normal')" />
      <label for="normalMode">노말 모드</label>
    </div>
    <div class="form-check">
      <input type="checkbox" id="adminMode" v-model="adminMode" @change="onModeChange('admin')" />
      <label for="adminMode">관리자 모드</label>
    </div>
    <div class="form-check">
      <input type="checkbox" id="guardianMode" v-model="guardianMode" @change="onModeChange('guardian')" />
      <label for="guardianMode">보호자 모드</label>
    </div>

    <!-- 관리자/보호자 모드의 코드 필드를 셀렉트박스 위로 배치 -->
    <!-- 관리자 모드 코드 입력 필드 -->
    <div v-if="adminMode">
      <div class="form-group">
        <label>관리자 코드</label>
        <input type="text" v-model="adminCode" placeholder="주어진 코드를 입력하세요" required />
      </div>
    </div>

    <!-- 보호자 모드에만 보이는 필드 -->
    <div v-if="guardianMode">
      <div class="form-group">
        <label>대여자 인증코드</label>
        <input type="text" v-model="guardianCode" placeholder="주어진 코드를 입력하세요" required />
      </div>
    </div>

    <!-- 공통 입력 필드 -->
    <div v-if="normalMode || adminMode || guardianMode">
      <div class="form-group">
        <label>Name</label>
        <input type="text" v-model="name" placeholder="Name" required />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" placeholder="Email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" placeholder="Password" required />
      </div>

      <div class="form-group">
        <label>Tel</label>
        <input type="text" v-model="phone" placeholder="ex)010-XXXX-XXXX" required />
      </div>
    </div>

    <button @click="submitForm">Sign up</button>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        normalMode: false,
        adminMode: false,
        guardianMode: false,
        name: '',
        email: '',
        password: '',
        phone: '',
        adminCode: '',
        guardianCode: ''
      };
    },
    methods: {
      onModeChange(mode) {
        // 모드를 선택하면 해당 모드만 true로 설정
        this.normalMode = mode === 'normal';
        this.adminMode = mode === 'admin';
        this.guardianMode = mode === 'guardian';
      },
      async submitForm() {
        const userInfo = {
          username: this.name,  // 서버에서는 username 필드를 기대하므로 변경
          email: this.email,    // username 대신 email을 보내지 않도록 주의
          phoneNumber: this.phone,  // phone을 phoneNumber로 변경
          password: this.password,
          role: this.normalMode ? 'NORMAL' : this.adminMode ? 'ADMIN' : 'GUARDIAN',  // 서버에서 UserRole enum이 기대하는 값으로 보내기
          guardianCode: this.guardianMode ? this.guardianCode : null  // 보호자 코드가 없는 경우 null 처리
        };

        try {
          const response = await axios.post('http://localhost:8080/user/signup', userInfo);
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
.signup-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.signup-page h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.form-check {
  margin-bottom: 10px;
}

.form-check label {
  font-weight: bold;
  margin-left: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  display: block;
}

.form-group input {
  width: 100%;
  padding: 10px;
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
