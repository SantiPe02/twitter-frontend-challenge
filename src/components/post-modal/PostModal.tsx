import React, { ReactNode } from "react";
import { StyledBlurredBackground } from "../common/BlurredBackground";
import { ModalCloseButton } from "../common/ModalCloseButton";
import { StyledTweetModalContainer } from "../tweet-modal/TweetModalContainer";

interface PostModalProps {
  onClose: () => void;
  show: boolean;
  children: ReactNode;
}

export const PostModal = ({ onClose, show, children }: PostModalProps) => {

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <>
      {show && (
        <div onClick={onClose}>
          <StyledBlurredBackground>
            <StyledTweetModalContainer onClick={handleModalClick}>
              <ModalCloseButton onClick={onClose} />
              {children}
            </StyledTweetModalContainer>
          </StyledBlurredBackground>
        </div>
      )}
    </>
  );
};
