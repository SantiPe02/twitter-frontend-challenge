import { useEffect, useState } from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetCommentsByPostId } from "../service/reactQueries";

interface UseGetCommentsProps {
  postId: string;
}

export const useGetComments = ({ postId }: UseGetCommentsProps) => {
  const [error, setError] = useState(false);
  const posts = useAppSelector((state) => state.user.feed);
  const { data, isLoading: loading } = useGetCommentsByPostId(postId);

  const dispatch = useAppDispatch();

  const service = useHttpRequestService();

  useEffect(() => {
    try {
      setError(false);
      const updatedPosts = Array.from(new Set(data));
      dispatch(updateFeed(updatedPosts));
      dispatch(setLength(updatedPosts.length));
    } catch (e) {
      setError(true);
      console.log(e);
    }
  }, [postId, loading]);

  return { posts, loading, error };
};
