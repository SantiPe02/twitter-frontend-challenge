import React from "react";
import Avatar from "../common/avatar/Avatar";
import icon from "../../assets/icon.jpg";
import { useNavigate } from "react-router-dom";

import { StyledUserDataBox } from "./StyledUserDataBoxContainer";
import { StyledUserInfo } from "./StyledUserInfoContainer";

interface UserDataBoxProps {
  name?: string;
  username?: string;
  profilePicture?: string;
  id: string;
  onClick?: () => void;
}
export const UserDataBox = ({
  name,
  username,
  profilePicture,
  id,
  onClick,
}: UserDataBoxProps) => {
  const navigate = useNavigate();

  return (
    <StyledUserDataBox onClick={onClick}>
      <Avatar
        width={"48px"}
        height={"48px"}
        src={profilePicture ?? icon}
        onClick={() => onClick ?? navigate(`/profile/${id}`)}
        alt={name ?? "Name"}
      />
      <StyledUserInfo>
        <p>{name ?? "Name"}</p>
        <p style={{ color: "#566370" }}>{"@" + username ?? "@Username"}</p>
      </StyledUserInfo>
    </StyledUserDataBox>
  );
};

export default UserDataBox;
