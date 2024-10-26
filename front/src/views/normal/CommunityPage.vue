<!-- CommunityPage.vue -->
<template>
  <div class="community-page container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <button class="btn btn-link p-0" @click="goBack">
        <i class="bi bi-arrow-left"></i>
      </button>
      <h5>오늘의 소식</h5>
      <i class="bi bi-bell"></i>
    </div>

    <input type="text" class="form-control mb-3" placeholder="Search notices" />

    <ul class="list-group mb-5">
      <li v-for="(notice, index) in notices" :key="index" class="list-group-item d-flex justify-content-between align-items-center" @click="goToPostDetail(notice.postId)">
        <div>
          <h6>{{ notice.title }}</h6>
          <small>{{ notice.content }}</small>
          <small class="text-muted ms-3">Posted by: {{ notice.user.username }}</small>
        </div>
      </li>
    </ul>

    <button class="btn btn-dark plus-btn" @click="isCreatePostVisible = !isCreatePostVisible">
      <i class="bi bi-plus"></i>
    </button>

    <div v-if="isCreatePostVisible" class="create-post-modal">
      <div class="modal-content">
        <h5>오늘의 소식 업로드</h5>
        <button class="close-modal" @click="hideCreatePost">X</button>

        <input v-model="newPost.title" placeholder="Title" class="form-control mb-3" required />
        <textarea v-model="newPost.content" placeholder="Write your notice here" class="form-control mb-3" required></textarea>

        <input type="file" @change="onFileChange" class="form-control mb-3" />
        
        <div v-if="imageUrl" class="mb-3">
          <img :src="imageUrl" alt="Preview" class="img-fluid" />
        </div>

        <button class="btn btn-dark w-100" @click="submitPost">Post</button>
      </div>
    </div>

    <!-- NavBar 컴포넌트 사용 -->
    <NavBar :currentTab="'community'" />
  </div>
</template>

<script>
import axios from '@/axios';
import NavBar from '@/components/NavBar.vue';


export default {
  components: {
    NavBar
  },
  data() {
    return {
      notices: [],
      isCreatePostVisible: false,
      newPost: {
        title: '',
        content: '',
        imageUrl: null,
      },
      imageUrl: null
    };
  },
  mounted() {
    this.fetchNotices();
  },
  methods: {
    goBack() {
      this.$router.push('/normal');
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.newPost.imageUrl = file;
        this.imageUrl = URL.createObjectURL(file);
      }
    },
    async fetchNotices() {
      try {
        const response = await axios.get('http://localhost:8080/community');
        this.notices = response.data;
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    },
    async submitPost() {
      const formData = new FormData();
      formData.append('title', this.newPost.title);
      formData.append('content', this.newPost.content);
      if (this.newPost.imageUrl) {
        formData.append('imageUrl', this.newPost.imageUrl);
      }

      try {
        await axios.post('http://localhost:8080/community/createPost', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        this.fetchNotices();
        this.isCreatePostVisible = false;
      } catch (error) {
        console.error('Error submitting post:', error);
      }

      this.newPost = { title: '', content: '', imageUrl: null };
    },
    hideCreatePost() {
      this.isCreatePostVisible = false;
    },
    goToPostDetail(postId) {
      this.$router.push({ name: 'PostDetail', params: { postId } });
    }
  }
};
</script>

<style scoped>


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
  right: 15px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
</style>
