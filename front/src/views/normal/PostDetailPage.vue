<template>
    <div class="post-detail">
      <nav class="navigation-bar">
        <button class="back-button" @click="goBack">Back</button>
        <h1 class="navigation-title">Post Details</h1>
        <button class="profile-button" @click="goToProfile">Profile</button>
      </nav>
  
      <h1 class="post-title">{{ post.title }}</h1>
      
      <p class="post-content">{{ post.content }}</p>
      <img v-if="post.imageUrl" :src="'http://localhost:8080' + post.imageUrl" alt="Post Image" class="post-image" />
  
      <button v-if="isPostOwner" class="delete-button" @click="deletePost">Delete Post</button>
  
      <h2 class="comments-title">Comments</h2>
      <ul class="comments-list">
        <li v-for="comment in post.comments" :key="comment.commentId" class="comment-item">
          <span>{{ comment.content }}</span>
          <button v-if="isCommentOwner(comment)" class="delete-comment-button" @click="deleteComment(comment.commentId)">Delete Comment</button>
        </li>
      </ul>
  
      <form class="comment-form" @submit.prevent="addComment">
        <input type="text" v-model="newComment" class="comment-input" placeholder="Add a comment" />
        <button type="submit" class="submit-button">Submit</button>
      </form>
  
      <!-- Bottom Navigation Component -->
      <BottomNav />
    </div>
  </template>
  
  <script>
  import axios from '@/axios';
  import BottomNav from '@/components/BottomNav.vue'; // BottomNav 컴포넌트 가져오기
  
  export default {
    components: {
      BottomNav // BottomNav 컴포넌트 등록
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
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  /* Navigation Bar Styles */
  .navigation-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
  }
  
  .back-button,
  .profile-button {
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }
  
  .navigation-title {
    flex: 1;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  
  .post-title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .post-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
  
  .post-content {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .delete-button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .comments-title {
    font-size: 20px;
    margin-top: 30px;
  }
  
  .comments-list {
    list-style-type: none;
    padding: 0;
  }
  
  .comment-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .delete-comment-button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .comment-form {
    display: flex;
    margin-top: 20px;
  }
  
  .comment-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .submit-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  