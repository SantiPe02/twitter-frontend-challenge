import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  StyledChat,
  StyledChatBubble,
  StyledChatDisplay,
  StyledChatHeader,
  StyledChatInput,
  StyledMessagesContainer,
  StyledNoChatOpen,
  StyledSendMessageContainer,
} from "../StyledChat";
import { socket } from "../../../service/socketService";
import { StyledH5, StyledP } from "../../../components/common/text";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { addMessage } from "../../../redux/user";
import { useGetMe } from "../../../service/reactQueries";

const Chat = () => {
  const dispatch = useAppDispatch();
  const { currentChat } = useAppSelector((state) => state.user);
  const [message, setMessage] = useState<string>("");
  const { data: user } = useGetMe();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (currentChat && currentChat.id && user) {
      const sendMessage = {
        chatId: currentChat.id,
        content: message,
        senderId: user.id,
        date: new Date(),
      };
      if (socket.connected) {
        socket.emit("message", sendMessage.content);
        dispatch(addMessage(sendMessage));
        socket.emit("chats");
        setMessage("");
      } else {
        console.log("Socket not connected");
      }
    } else {
      console.error(
        "No se puede enviar el mensaje, currentChat o user es nulo"
      );
    }
  };

  const getMessageDate = (date: Date) => {
    const messageDate = new Date(date);
    return messageDate.toLocaleDateString();
  };

  return (
    <StyledChat>
      {currentChat ? (
        <StyledChatDisplay>
          <StyledChatHeader>
            <StyledH5>{currentChat?.name}</StyledH5>
            <StyledP primary>
              Members: {currentChat?.users.map((u) => u.username).join(", ")}
            </StyledP>
          </StyledChatHeader>
          <StyledMessagesContainer>
            {currentChat.messages &&
              currentChat.messages.length > 0 &&
              currentChat.messages?.map((message) => (
                <StyledChatBubble
                  key={message.id}
                  isSender={user.id === message.senderId}
                >
                  <p>{message.content}</p>
                  <span>{getMessageDate(message.date)}</span>
                </StyledChatBubble>
              ))}
          </StyledMessagesContainer>
          <StyledSendMessageContainer>
            <StyledChatInput value={message} onChange={handleInputChange} />
            <Button
              text="Send"
              size={"20vh"}
              buttonType={ButtonType.DEFAULT}
              onClick={handleSendMessage}
              disabled={message.length === 0}
            />
          </StyledSendMessageContainer>
        </StyledChatDisplay>
      ) : (
        <StyledNoChatOpen>
          <StyledH5>Welcome to your inbox!</StyledH5>
          <p>Here you can chat with other users.</p>
        </StyledNoChatOpen>
      )}
    </StyledChat>
  );
};

export default Chat;
