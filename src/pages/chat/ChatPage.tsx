import React, { useEffect, useState } from "react";
import {
  StyledChatContainer,
  StyledChatPageHeader,
  StyledChatPageMenu,
} from "./StyledChatPageContainer";
import AllChats from "./components/AllChats";
import { useAppDispatch } from "../../redux/hooks";
import { socket } from "../../service/socketService";
import { setChats } from "../../redux/user";
import Button from "../../components/button/Button";
import { ButtonType } from "../../components/button/StyledButton";
import CreateChatModal from "./components/CreateChatModal";
import Chat from "./components/Chat";

const ChatPage = () => {
  const dispatch = useAppDispatch();
  const [showCreateChatModal, setShowCreateChatModal] =
    useState<boolean>(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("chats");
    });
    socket.connect();

    socket.on("chats", (chats) => {
      dispatch(setChats(chats));
    });

    socket.on("message", (message) => {
      console.log("Received message", message);
      socket.emit("chats");
    });

    return () => {
      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
      socket.disconnect();
    };
  }, []);

  return (
    <StyledChatContainer>
      <StyledChatPageMenu>
        <StyledChatPageHeader>
          <div>
            <Button
              text="New chat"
              size="medium"
              buttonType={ButtonType.DEFAULT}
              onClick={() => setShowCreateChatModal(true)}
            />
          </div>
        </StyledChatPageHeader>
        <AllChats />
        {showCreateChatModal && (
          <CreateChatModal
            show={showCreateChatModal}
            onClose={() => setShowCreateChatModal(false)}
          />
        )}
      </StyledChatPageMenu>
      <Chat />
    </StyledChatContainer>
  );
};

export default ChatPage;
