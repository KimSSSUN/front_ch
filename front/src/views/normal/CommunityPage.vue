<template>
  <div class="community-page container mt-4">
    <!-- 상단 뒤로가기와 제목, 알림 아이콘 -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <button class="btn btn-link p-0" @click="goBack">
        <i class="bi bi-arrow-left"></i> <!-- 뒤로가기 아이콘 -->
      </button>
      <h5>오늘의 소식</h5>
      <i class="bi bi-bell"></i> <!-- 알림 아이콘 -->
    </div>

    <!-- 검색창 -->
    <input type="text" class="form-control mb-3" placeholder="Search notices" />

    <!-- 공지 목록 -->
    <ul class="list-group mb-5">
      <li v-for="(notice, index) in notices" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h6>{{ notice.title }}</h6>
          <small>{{ notice.content }}</small>
        </div>
      </li>
    </ul>

    <!-- 플러스 버튼 -->
    <button class="btn btn-dark plus-btn" @click="showCreatePost">
      <i class="bi bi-plus"></i>
    </button>

    <!-- 글 작성 모달 -->
    <div v-if="isCreatePostVisible" class="create-post-modal">
      <div class="modal-content">
        <h5>오늘의 소식 업로드</h5>
        <button class="close-modal" @click="hideCreatePost">X</button>

        <input v-model="newPost.title" placeholder="Title" class="form-control mb-3" />
        <textarea v-model="newPost.content" placeholder="Write your notice here" class="form-control mb-3"></textarea>

        <!-- 사진 업로드 -->
        <input type="file" @change="onFileChange" class="form-control mb-3" />

        <!-- 이미지 미리보기 -->
        <div v-if="imageUrl" class="mb-3">
          <img :src="imageUrl" alt="Preview" class="img-fluid" />
        </div>

        <button class="btn btn-dark w-100" @click="submitPost">Post</button>
      </div>
    </div>

    <!-- 하단 네비게이션 -->
    <nav class="bottom-nav d-flex justify-content-around align-items-center">
      <button class="nav-item" @click="goToHome">
        <i class="bi bi-house-door"></i>
        <span class="nav-text" :class="{ 'active': currentTab === 'home' }">Home</span>
      </button>
      <button class="nav-item" @click="goToRent">
        <i class="bi bi-cart"></i>
        <span class="nav-text" :class="{ 'active': currentTab === 'rent' }">Rent</span>
      </button>
      <button class="nav-item" @click="goToCommunity">
        <i class="bi bi-chat"></i>
        <span class="nav-text" :class="{ 'active': currentTab === 'community' }">Community</span>
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notices: [
        { title: '안녕하세요', content: '' },
        { title: '반가워요', content: '' },
        { title: '세번째 글입니다', content: '' },
      ],
      isCreatePostVisible: false,
      newPost: {
        title: '',
        content: '',
        image: null
      },
      imageUrl: null,
      currentTab: 'community' // 커뮤니티 페이지 기본 활성화
    };
  },
  methods: {
    goBack() {
      this.$router.push('/normal');
    },
    goToHome() {
      this.$router.push('/normal');
      this.currentTab = 'home';
    },
    goToRent() {
      this.$router.push('/rent/check');
      this.currentTab = 'rent';
    },
    goToCommunity() {
      this.$router.push('/community');
      this.currentTab = 'community';
    },
    showCreatePost() {
      this.isCreatePostVisible = true;
    },
    hideCreatePost() {
      this.isCreatePostVisible = false;
    },
    onFileChange(event) {
      this.newPost.image = event.target.files[0];
      this.imageUrl = URL.createObjectURL(this.newPost.image);
    },
    submitPost() {
      // 글 작성 후 게시글 추가
      this.notices.push({
        title: this.newPost.title,
        content: this.newPost.content,
        image: this.newPost.image
      });

      // 작성 완료 후 초기화
      this.newPost = { title: '', content: '', image: null };
      this.imageUrl = null;
      this.hideCreatePost();
    }
  }
};
</script>

<style scoped>
/* 네비게이션 스타일 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #ddd;
  padding: 10px 0;
}

.nav-item {
  text-align: center;
  background-color: white;
  border: none;
  box-shadow: none;
}

.nav-item i {
  font-size: 1.6rem;
  display: block;
}

.nav-text {
  font-size: 0.75rem;
  margin-top: 4px;
  color: #666;
}

.nav-text.active {
  font-weight: bold;
  color: #007bff;
}
/* 플러스 버튼 스타일 */
.plus-btn {
  position: fixed;
  bottom: 100px; /* 버튼을 더 위로 올리기 */
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background-color: black;
  color: white;
  border: none;
}


/* 글 작성 모달 */
.create-post-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
