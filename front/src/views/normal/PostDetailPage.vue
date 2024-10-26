<template>
  <div class="post-detail container mt-4">
    <!-- 네비게이션 바 -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <!-- 왼쪽 상단 Back 버튼 -->
      <button class="btn btn-outline-secondary btn-sm" @click="goBack">
        <i class="bi bi-arrow-left"></i>
      </button>
      <!-- 가운데 커뮤니티 글 제목 (Post Title) -->
      <h5 class="mb-0 text-center">{{ post.title }}</h5>
      <!-- 오른쪽 상단 Profile 버튼 (아이콘으로 변경) -->
      <button class="btn btn-outline-secondary btn-sm" @click="goToProfile">
        <i class="bi bi-person-circle"></i>
      </button>
    </div>

    <!-- 포스트 내용 -->
    <div class="card shadow-sm p-4 mb-4">
      <p class="post-content">{{ post.content }}</p>
      <img v-if="post.imageUrl" :src="'http://localhost:8080' + post.imageUrl" alt="Post Image" class="post-image" />
    </div>

    <!-- 삭제 버튼 -->
    <button v-if="isPostOwner" class="btn btn-danger w-100 mb-4" @click="deletePost">Delete Post</button>

    <!-- 댓글 목록 -->
    <h6 class="comments-title">Comments</h6>
    <ul class="list-group mb-4">
      <li v-for="comment in post.comments" :key="comment.commentId" class="list-group-item d-flex justify-content-between align-items-center">
        <span>{{ comment.content }}</span>
        <button v-if="isCommentOwner(comment)" class="btn btn-danger btn-sm" @click="deleteComment(comment.commentId)">Delete</button>
      </li>
    </ul>

    <!-- 댓글 입력 폼 -->
    <div class="input-group mb-5">
      <input type="text" v-model="newComment" class="form-control" placeholder="Add a comment" />
      <button class="btn btn-success" @click="addComment">Submit</button>
    </div>

    <!-- 하단 네비게이션 -->
    <NavBar />
  </div>
</template>

<script>
import axios from '@/axios';
import NavBar from '@/components/NavBar.vue'; // NavBar 컴포넌트 가져오기

export default {
  components: {
    NavBar // NavBar 컴포넌트 등록
  },
  data() {
    return {
      post: {},
      newComment: '',
      currentUserId: null
    };
  },
  async created() {
    await this.fetchPost();
    await this.fetchComments();
    await this.fetchCurrentUser();
  },
  computed: {
    isPostOwner() {
      return this.post.user && this.post.user.userId === this.currentUserId;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goToProfile() {
      this.$router.push('/profile');
    },
    async fetchPost() {
      const postId = this.$route.params.postId;
      try {
        const response = await axios.get(`http://localhost:8080/community/post/${postId}`);
        this.post = response.data;
      } catch (error) {
        console.error('Error fetching post:', error);
        this.post = null;
      }
    },
    async fetchComments() {
      const postId = this.$route.params.postId;
      try {
        const response = await axios.get(`http://localhost:8080/community/post/${postId}/comments`);
        this.post.comments = response.data;
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    async fetchCurrentUser() {
      const token = localStorage.getItem('jwtToken');
      try {
        const response = await axios.get('http://localhost:8080/user/current', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.currentUserId = response.data.userId;
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    },
    async addComment() {
      const postId = this.$route.params.postId;
      try {
        await axios.post(`http://localhost:8080/community/post/${postId}/comment`, {
          content: this.newComment
        });
        this.newComment = '';
        await this.fetchComments();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
    async deletePost() {
      const postId = this.post.postId;
      try {
        await axios.delete(`http://localhost:8080/community/post/${postId}/delete`);
        this.$router.push('/community');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    },
    async deleteComment(commentId) {
      const postId = this.post.postId;
      try {
        await axios.delete(`http://localhost:8080/community/post/${postId}/comment/${commentId}/delete`);
        await this.fetchComments();
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    },
    isCommentOwner(comment) {
      return comment.user && comment.user.userId === this.currentUserId;
    }
  }
};
</script>

<style scoped>
.post-detail {
  max-width: 600px;
  margin: 0 auto;
}

.card {
  border-radius: 15px;
  background-color: #f8f9fa;
}

.d-flex {
  display: flex;
}

.justify-content-between {
  justify-content: space-between;
}

.align-items-center {
  align-items: center;
}

.bi-arrow-left {
  font-size: 1.5rem;
}

.bi-person-circle {
  font-size: 1.5rem;
}

.post-content {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.post-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 10px;
}

.comments-title {
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.list-group-item {
  font-size: 1rem;
}

.input-group {
  display: flex;
  align-items: center;
}

.input-group input {
  border-radius: 5px;
  margin-right: 10px;
}

.btn {
  border-radius: 20px;
}

.btn-danger {
  margin-top: 20px;
}
</style>
