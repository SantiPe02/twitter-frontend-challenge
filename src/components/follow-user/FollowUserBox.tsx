import React, { useState } from "react";
import Button from "../button/Button";
import UserDataBox from "../user-data-box/UserDataBox";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../button/StyledButton";
import "./FollowUserBox.css";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../service/reactQueries";

interface FollowUserBoxProps {
  profilePicture?: string;
  name?: string;
  username?: string;
  id: string;
}

const FollowUserBox = ({
  profilePicture,
  name,
  username,
  id,
}: FollowUserBoxProps) => {
  const { t } = useTranslation();
  const [isFollowing, setIsFollowing] = useState(false);

  const followMutation = useFollowUserMutation();
  const unfollowMutation = useUnfollowUserMutation();

  const handleFollow = async () => {
    if (isFollowing) {
      unfollowMutation.mutate(id);
    } else {
      followMutation.mutate(id);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="box-container">
      <UserDataBox
        id={id}
        name={name!}
        profilePicture={profilePicture!}
        username={username!}
      />
      <Button
        text={isFollowing ? t("buttons.unfollow") : t("buttons.follow")}
        buttonType={isFollowing ? ButtonType.DELETE : ButtonType.FOLLOW}
        size={"SMALL"}
        onClick={handleFollow}
      />
    </div>
  );
};

export default FollowUserBox;
