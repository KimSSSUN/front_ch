<template>
  <div class="signup-page container">
    <h3>Create an account</h3>

    <!-- 모드 선택 체크박스 -->
    <div class="form-check">
      <input type="checkbox" id="userMode" v-model="userMode" @change="onModeChange('user')" />
      <label for="userMode">유저 모드</label>
    </div>
    <div class="form-check">
      <input type="checkbox" id="adminMode" v-model="adminMode" @change="onModeChange('admin')" />
      <label for="adminMode">관리자 모드</label>
    </div>
    <div class="form-check">
      <input type="checkbox" id="guardianMode" v-model="guardianMode" @change="onModeChange('guardian')" />
      <label for="guardianMode">보호자 모드</label>
    </div>

    <!-- 공통 입력 필드 -->
    <div v-if="userMode || adminMode || guardianMode">
      <div class="form-group">
        <label>Name</label>
        <input type="text" v-model="formData.name" placeholder="Name" required />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="formData.email" placeholder="Email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="formData.password" placeholder="Password" required />
      </div>

      <div class="form-group">
        <label>Tel</label>
        <input type="text" v-model="formData.phone" placeholder="ex)010-XXXX-XXXX" required />
      </div>
    </div>

    <!-- 보호자 모드에만 보이는 필드 -->
    <div v-if="guardianMode">
      <div class="form-group">
        <label>대여자 인증코드</label>
        <input type="text" v-model="formData.guardianCode" placeholder="주어진 코드를 입력하세요" required />
      </div>
    </div>

    <!-- 관리자 모드 코드 입력 필드 -->
    <div v-if="adminMode">
      <div class="form-group">
        <label>관리자 코드</label>
        <input type="text" v-model="formData.adminCode" placeholder="주어진 코드를 입력하세요" required />
      </div>
    </div>

    <button @click="submitForm">Sign up</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMode: false,
      adminMode: false,
      guardianMode: false,
      formData: {
        name: '',
        email: '',
        password: '',
        phone: '',
        adminCode: '',
        guardianCode: ''
      }
    };
  },
  methods: {
    onModeChange(mode) {
      this.userMode = mode === 'user';
      this.adminMode = mode === 'admin';
      this.guardianMode = mode === 'guardian';
    },
    submitForm() {
      const userInfo = {
        name: this.formData.name,
        email: this.formData.email,
        phone: this.formData.phone,
        password: this.formData.password,
        mode: this.userMode ? 'user' : this.adminMode ? 'admin' : 'guardian',
        guardianCode: this.formData.guardianCode,
      };

      // 보호자 모드일 경우 인증 코드 확인
      if (this.guardianMode && this.formData.guardianCode !== '1111') {
        alert('잘못된 보호자 인증 코드입니다.');
        return;
      }

      // 관리자 모드일 경우 관리자 코드 확인
      if (this.adminMode && this.formData.adminCode !== '1234') {
        alert('잘못된 관리자 코드입니다.');
        return;
      }

      // 입력된 정보를 localStorage에 저장
      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      alert('회원가입이 완료되었습니다. 로그인 해주세요.');
      this.$router.push('/login');
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
