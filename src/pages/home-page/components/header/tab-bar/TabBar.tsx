import React, { useState } from "react";
import Tab from "./tab/Tab";
import { setQuery, updateFeed } from "../../../../../redux/user";
import { useHttpRequestService } from "../../../../../service/HttpRequestService";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../../redux/hooks";
import { StyledTabBarContainer } from "./TabBarContainer";
import { useGetPosts } from "../../../../../service/reactQueries";

const TabBar = () => {
  const [activeFirstPage, setActiveFirstPage] = useState(true);
  const dispatch = useAppDispatch();
  const service = useHttpRequestService();
  const { t } = useTranslation();

  const handleClick = async (value: boolean, query: string) => {
    setActiveFirstPage(value);
    dispatch(setQuery(query));
    await service
      .getPosts(query)
      .catch((error) => {
        console.log(error);
      })
      .then((data) => {
        console.log(data);
        dispatch(updateFeed(data));
      });
  };

  return (
    <>
      <StyledTabBarContainer>
        <Tab
          active={activeFirstPage}
          text={t("header.for-you")}
          onClick={() => handleClick(true, "")}
        />
        <Tab
          active={!activeFirstPage}
          text={t("header.following")}
          onClick={() => handleClick(false, "following")}
        />
      </StyledTabBarContainer>
    </>
  );
};

export default TabBar;
