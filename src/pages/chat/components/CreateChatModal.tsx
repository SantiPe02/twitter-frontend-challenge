import React, { useState } from "react";
import Modal from "../../../components/modal/Modal";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledCreateChatInput } from "./StyledInput";
import { StyledSearchBarInput } from "../../../components/search-bar/SearchBarInput";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import { StyledSearchBarContainer } from "../../../components/search-bar/SearchBarContainer";
import { Author } from "../../../service";
import {
  StyledSearchUserResults,
  StyledSearchUserResultsContainer,
} from "./StyledSearchUserResults";
import { StyledP } from "../../../components/common/text";
import { useAppDispatch } from "../../../redux/hooks";
import { addChat } from "../../../redux/user";

interface CreateChatModalProps {
  show: boolean;
  onClose: () => void;
}

const CreateChatModal = ({ show, onClose }: CreateChatModalProps) => {
  const [chatName, setChatName] = useState<string>("");
  const [userIds, setUserIds] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Author[]>([]);
  const [next, setNext] = useState<boolean>(false);
  const service = useHttpRequestService();
  const dispatch = useAppDispatch();

  const handleChatNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(event.target.value);
  };

  const handleNext = () => {
    setNext(true);
  };

  console.log("userIds", userIds);

  const handleSearch = (event: any) => {
    setQuery(event.target.value);
    service.searchUsers(event.target.value, 4, 0).then((result) => {
      setResults(result);
    });
  };

  const handleCreateChat = () => {
    service
      .createChat(chatName)
      .then((chat) => {
        dispatch(addChat(chat));
        userIds.forEach((userId) => {
          service.addUserToChat(chat.id, userId).catch((error) => {
            console.error("error", error);
          });
        });
      })
      .finally(() => {
        onClose();
      });
  };

  return (
    <Modal
      show={show}
      onClose={() => onClose()}
      title={next ? "Add members" : "Create a new chat"}
      text={next ? "" : "Enter the name of the chat"}
      acceptButton={
        next ? (
          <Button
            text="Create"
            size="MEDIUM"
            buttonType={ButtonType.DEFAULT}
            onClick={handleCreateChat}
          />
        ) : (
          <Button
            text="Next"
            size="MEDIUM"
            buttonType={ButtonType.DEFAULT}
            onClick={handleNext}
            disabled={chatName.length === 0}
          />
        )
      }
    >
      {!next ? (
        <StyledCreateChatInput
          className="input"
          type="text"
          title="Chat name"
          placeholder="Enter chat name"
          required
          onChange={handleChatNameChange}
        />
      ) : (
        <StyledSearchBarContainer>
          <StyledSearchBarInput
            placeholder={query}
            value={query}
            onChange={handleSearch}
          />
          {results && results?.length > 0 && (
            <StyledSearchUserResultsContainer>
              {results.map((author) => (
                <StyledSearchUserResults>
                  <input
                    type="checkbox"
                    value={author.id}
                    placeholder={author.username}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setUserIds([...userIds, author.id]);
                      } else {
                        setUserIds(userIds.filter((id) => id !== author.id));
                      }
                    }}
                  />
                  <StyledP primary>{author.username}</StyledP>
                </StyledSearchUserResults>
              ))}
            </StyledSearchUserResultsContainer>
          )}
        </StyledSearchBarContainer>
      )}
    </Modal>
  );
};

export default CreateChatModal;
