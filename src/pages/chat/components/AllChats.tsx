import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ChatDTO } from "../../../service";
import { StyledH5, StyledP } from "../../../components/common/text";
import { useEffect } from "react";
import {
  StyledAllChats,
  StyledChatContainer,
  StyledChatInfo,
} from "../StyledAllChats";
import { StyledH6 } from "../../../components/common/text/H6";
import { setChat } from "../../../redux/user";
import { ArrowIcon } from "../../../components/icon/Icon";
import { socket } from "../../../service/socketService";
import { useGetMe } from "../../../service/reactQueries";

const AllChats = () => {
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector((state) => state.user);
  const { data: user } = useGetMe();

  useEffect(() => {}, [chats]);

  const handleChatClick = (chat: ChatDTO) => {
    dispatch(setChat(chat));
    socket.emit("join", chat.id);
  };

  return (
    <>
      {chats.length > 0 ? (
        <StyledAllChats>
          {chats.map((chat: ChatDTO) => (
            <StyledChatContainer
              key={chat.id}
              onClick={() => handleChatClick(chat)}
            >
              <StyledChatInfo>
                <StyledH6>{chat.name}</StyledH6>
                {chat.messages.length > 0 ? (
                  <StyledP primary>
                    {chat.messages[chat.messages.length - 1].senderId ===
                    user?.id ? (
                      <span>You: </span>
                    ) : (
                      <span>
                        {
                          chat.users.filter(
                            (u) =>
                              u.id ===
                              chat.messages[chat.messages.length - 1].senderId
                          )[0].username
                        }
                        :{" "}
                      </span>
                    )}
                    {chat.messages[chat.messages.length - 1].content}
                  </StyledP>
                ) : (
                  <StyledP primary>{}</StyledP>
                )}
              </StyledChatInfo>
              <ArrowIcon />
            </StyledChatContainer>
          ))}
        </StyledAllChats>
      ) : (
        <div>
          <StyledH5>Welcome to your inbox!</StyledH5>
          <StyledP primary>
            Here you can chat with other users. Start a new chat.
          </StyledP>
        </div>
      )}
    </>
  );
};

export default AllChats;
