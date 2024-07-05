import { useEffect, useState } from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetPosts } from "../service/reactQueries";

export const useGetFeed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const posts = useAppSelector((state) => state.user.feed);
  const query = useAppSelector((state) => state.user.query);
  const { data } = useGetPosts(query);

  const dispatch = useAppDispatch();

  const service = useHttpRequestService();

  useEffect(() => {
    try {
      setLoading(true);
      setError(false);
      const updatedPosts = Array.from(new Set(data));
      dispatch(updateFeed(updatedPosts));
      dispatch(setLength(updatedPosts.length));
      setLoading(false);
    } catch (e) {
      setError(true);
      console.log(e);
    }
  }, [query]);

  return { posts, loading, error };
};
