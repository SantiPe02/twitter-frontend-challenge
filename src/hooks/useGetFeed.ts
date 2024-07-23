import { useEffect, useState } from "react";
import { setLength, setQuery, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useHttpRequestService } from "../service/HttpRequestService";

interface GetFeedProps {
  initialQuery: string;
}

export const useGetFeed = ({ initialQuery }: GetFeedProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const posts = useAppSelector((state) => state.user.feed);
  const dispatch = useAppDispatch();
  dispatch(setQuery(initialQuery));
  const query = useAppSelector((state) => state.user.query);


  const service = useHttpRequestService();

  useEffect(() => {
    try {
      setLoading(true);
      setError(false);
      service.getPosts(query).then((res) => {
        const updatedPosts =
          res && posts ? Array.from(new Set([...posts, ...res])) : [];
        dispatch(updateFeed(updatedPosts));
        dispatch(setLength(updatedPosts.length));
        setLoading(false);
      });
    } catch (e) {
      setError(true);
    }
  }, [query]);

  return { posts, loading, error };
};
