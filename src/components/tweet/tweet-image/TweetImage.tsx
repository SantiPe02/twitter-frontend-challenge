import React, { useState } from "react";
import { StyledTweetImage } from "./StyledTweetImage";
import ImageModal from "./ImageModal";
import { RemoveIcon } from "../../icon/Icon";
import {
  StyledContainer,
  StyledOverflowContainer,
} from "../../common/Container";
import { StyledRemoveIconContainer } from "./RemoveIconContainer";
import { s3Url } from "../../../util/Constants";
import { isUuid } from "../../../util/validate";

interface TweetImageProps {
  src: string;
  alt: string;
  removable?: boolean;
  removeFunction?: () => void;
}
const TweetImage = ({
  src,
  alt,
  removable,
  removeFunction,
}: TweetImageProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <StyledContainer maxHeight={`${100}%`}>
      <StyledOverflowContainer
        maxWidth={"100%"}
        borderRadius={"16px"}
        alignItems={"flex-end"}
      >
        {removable && (
          <StyledRemoveIconContainer>
            <RemoveIcon onClick={removeFunction} />
          </StyledRemoveIconContainer>
        )}
        <StyledTweetImage
          src={isUuid(src)? s3Url + src : src}
          alt={alt}
          onClick={() => setShowModal(true)}
        />
      </StyledOverflowContainer>
      <ImageModal
        show={showModal}
        src={s3Url + src}
        alt={alt}
        onClose={() => setShowModal(false)}
      />
    </StyledContainer>
  );
};
export default TweetImage;
