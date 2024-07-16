import React from "react";
import Feed from "./Feed";
import { useGetFeed } from "../../hooks/useGetFeed";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRef } from "react";
import { LIMIT } from "../../util/Constants";
import { setLastPostId, setQuery } from "../../redux/user";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

const ContentFeed = () => {
  const dispatch = useAppDispatch();
  const { lastPostId } = useAppSelector((state) => state.user);
  const { posts, loading } = useGetFeed({
    initialQuery: `?limit=${LIMIT}&after=${lastPostId}`,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const onScrollCallback = () => {
    if (posts!!.length > 0 && !loading) {
      dispatch(setLastPostId(posts[posts.length - 1].id));
      dispatch(setQuery(`?limit=${LIMIT}&after=${lastPostId}`));
    }
  };

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  useInfiniteScroll(scrollRef, onScrollCallback, observerOptions);

  return (
    <div>
      <Feed posts={posts} loading={loading} />
      {!loading && <div ref={scrollRef}></div>}
    </div>
  );
};
export default ContentFeed;
