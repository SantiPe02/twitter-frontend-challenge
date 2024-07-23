import type { PostData, SingInData, SingUpData } from "./index";
import axios from "axios";
import { S3Service } from "./S3Service";

const url =
  process.env.REACT_APP_API_URL || "https://twitter-ieea.onrender.com/api";

const getAuthHeaders = () => ({
  Authorization: localStorage.getItem("token"),
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

const httpRequestService = {
  signUp: async (data: Partial<SingUpData>) => {
    const res = await axios.post(`${url}/auth/signup`, data);
    if (res.status === 201) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
  },
  signIn: async (data: SingInData) => {
    const res = await axios.post(`${url}/auth/login`, data);
    if (res.status === 200) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      return true;
    }
  },
  createPost: async (data: PostData) => {
    const imagesId = data.images?.map((i) => i.name);
    console.log(imagesId);
    const res = await axios.post(
      `${url}/post`,
      { content: data.content, images: imagesId },
      {
        headers: getAuthHeaders(),
      }
    );
    console.log(res.data);
    if (res.status === 201) {
      const { upload } = S3Service;
      for (const imageUrl of res.data.images) {
        const index: number = res.data.images.indexOf(imageUrl);
        await upload(data.images![index], imageUrl);
      }
      return res.data;
    }
  },
  getPaginatedPosts: async (limit: number, after: string, query: string) => {
    const res = await axios.get(`${url}/post/${query}`, {
      headers: getAuthHeaders(),
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getPosts: async (query: string) => {
    const res = await axios.get(`${url}/post/${query}`, {
      headers: getAuthHeaders(),
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getRecommendedUsers: async (limit: number, skip: number) => {
    const res = await axios.get(`${url}/user`, {
      headers: getAuthHeaders(),
      params: {
        limit,
        skip,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  me: async () => {
    const res = await axios.get(`${url}/user/me`, {
      headers: getAuthHeaders(),
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getPostById: async (id: string) => {
    const res = await axios.get(`${url}/post/${id}`, {
      headers: getAuthHeaders(),
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  createReaction: async (postId: string, reaction: string) => {
    const res = await axios.post(
      `${url}/reaction/${postId}`,
      { reactionType: reaction },
      {
        headers: getAuthHeaders(),
      }
    );
    if (res.status === 201) {
      return res.data;
    }
  },
  deleteReaction: async (postId: string, reaction: string) => {
    const res = await axios.delete(`${url}/reaction/${postId}`, {
      data: { reactionType: reaction },
      headers: getAuthHeaders(),
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  followUser: async (userId: string) => {
    const res = await axios.post(
      `${url}/follower/follow/${userId}`,
      {},
      {
        headers: getAuthHeaders(),
      }
    );
    if (res.status === 201) {
      return res.data;
    }
  },
  unfollowUser: async (userId: string) => {
    const res = await axios.delete(`${url}/follower/unfollow/${userId}`, {
      headers: getAuthHeaders(),
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  searchUsers: async (username: string, limit: number, skip: number) => {
    try {
      const cancelToken = axios.CancelToken.source();

      const response = await axios.get(`${url}/user/by_username/${username}`, {
        headers: getAuthHeaders(),
        params: {
          limit,
          skip,
        },
        cancelToken: cancelToken.token,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (!axios.isCancel(error)) console.log(error);
    }
  },

  getProfile: async (id: string) => {
    const res = await axios.get(`${url}/user/profile/${id}`, {
      headers: getAuthHeaders(),
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getPaginatedPostsFromProfile: async (
    limit: number,
    after: string,
    id: string
  ) => {
    const res = await axios.get(`${url}/post/by_user/${id}`, {
      headers: getAuthHeaders(),
      params: {
        limit,
        after,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  },
  getPostsFromProfile: async (id: string) => {
    const res = await axios.get(`${url}/post/by_user/${id}`, {
      headers: getAuthHeaders(),
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  isLogged: async () => {
    const res = await axios.get(`${url}/user/me`, {
      headers: getAuthHeaders(),
    });
    return res.status === 200;
  },

  getProfileView: async (id: string) => {
    const res = await axios.get(`${url}/user/${id}`, {
      headers: getAuthHeaders(),
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  deleteProfile: async () => {
    const res = await axios.delete(`${url}/user`, {
      headers: getAuthHeaders(),
    });

    if (res.status === 204) {
      localStorage.removeItem("token");
    }
  },

  getChats: async () => {
    const res = await axios.get(`${url}/chat`, {
      headers: getAuthHeaders(),
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  getMutualFollows: async () => {
    const res = await axios.get(`${url}/follow/mutual`, {
      headers: getAuthHeaders(),
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  createChat: async (name: string) => {
    const res = await axios.post(
      `${url}/chat`,
      { name: name },
      {
        headers: getAuthHeaders(),
      }
    );

    if (res.status === 201) {
      return res.data;
    }
  },

  getChat: async (id: string) => {
    const res = await axios.get(`${url}/chat/${id}`, {
      headers: getAuthHeaders(),
    });

    if (res.status === 200) {
      return res.data;
    }
  },

  addUserToChat: async (chatId: string, userId: string) => {
    const res = await axios.post(
      `${url}/chat/add-user/${chatId}`,
      { userId: userId },
      {
        headers: getAuthHeaders(),
      }
    );

    return res.status
  },

  deleteChat: async (id: string) => {
    const res = await axios.delete(`${url}/chat/${id}`, {
      headers: getAuthHeaders(),
    });

    return res.status
  },

  deletePost: async (id: string) => {
    await axios.delete(`${url}/post/${id}`, {
      headers: getAuthHeaders(),
    });
  },

  createComment: async (data: PostData) => {
    const res = await axios.post(
      `${url}/comment/${data.parentId}`,
      { content: data.content, images: data.images },
      {
        headers: getAuthHeaders(),
      }
    );

    if (res.status === 201) {
      return res.data;
    }
  },
  getPaginatedCommentsByPostId: async (
    id: string,
    limit: number,
    after: string
  ) => {
    const res = await axios.get(`${url}/post/comment/by_post/${id}`, {
      headers: getAuthHeaders(),
      params: {
        limit,
        after,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  },
  getCommentsByPostId: async (id: string) => {
    const res = await axios.get(`${url}/comment/${id}`, {
      headers: getAuthHeaders(),
    });
    if (res.status === 200) {
      return res.data;
    }
  },
};

const useHttpRequestService = () => httpRequestService;

export { useHttpRequestService };
