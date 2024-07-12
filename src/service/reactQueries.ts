import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useHttpRequestService } from "./HttpRequestService";
import { PostData } from ".";
import { useDispatch } from "react-redux";
import { updateFeed } from "../redux/user";

//Posts:

export const useGetPostById = (postId: string) => {
  const service = useHttpRequestService();

  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => service.getPostById(postId),
  });
};

export const useGetPaginatedPosts = (
  limit: number,
  after: string,
  query: string
) => {
  const service = useHttpRequestService();

  return useQuery({
    queryKey: ["paginatedPosts", limit, after, query],
    queryFn: () => service.getPaginatedPosts(limit, after, query),
  });
};

export const useGetPosts = (query: string) => {
  const service = useHttpRequestService();

  return useQuery({
    queryKey: ["posts", query],
    queryFn: () => service.getPosts(query),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const service = useHttpRequestService();

  return useMutation({
    mutationFn: (data: PostData) => service.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["paginatedPosts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useGetMe = () => {
  const service = useHttpRequestService();

  return useQuery({ queryKey: ["me"], queryFn: () => service.me() });
};

export const useCreateReaction = () => {
  const queryClient = useQueryClient();
  const service = useHttpRequestService();

  return useMutation({
    mutationFn: (data: { postId: string; reaction: string }) =>
      service.createReaction(data.postId, data.reaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["paginatedPosts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
};

export const useDeleteReaction = () => {
  const queryClient = useQueryClient();
  const service = useHttpRequestService();

  return useMutation({
    mutationFn: (data: { postId: string; reaction: string }) =>
      service.deleteReaction(data.postId, data.reaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["paginatedPosts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const service = useHttpRequestService();

  return useMutation({
    mutationFn: () => service.deleteProfile(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const service = useHttpRequestService();

  return useMutation({
    mutationFn: (data: PostData) => service.createComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["paginatedPosts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

export const useGetCommentsByPostId = (postId: string) => {
  const service = useHttpRequestService();

  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => service.getCommentsByPostId(postId),
  });
};

export const useFollowUserMutation = () => {
  const queryClient = useQueryClient();
  const service = useHttpRequestService();

  return useMutation({
    mutationFn: (userId: string) => service.followUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["paginatedPosts"] });
    },
  });
};

export const useUnfollowUserMutation = () => {
  const queryClient = useQueryClient();
  const service = useHttpRequestService();

  return useMutation({
    mutationFn: (userId: string) => service.unfollowUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["paginatedPosts"] });
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const service = useHttpRequestService();

  return useMutation({
    mutationFn: (postId: string) => service.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["paginatedPosts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
