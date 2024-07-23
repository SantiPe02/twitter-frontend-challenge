import React, { useRef, useState } from "react";
import { DeleteIcon } from "../../icon/Icon";
import Modal from "../../modal/Modal";
import Button from "../../button/Button";
import { updateComments, updateFeed } from "../../../redux/user";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../../button/StyledButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Post } from "../../../service";
import { StyledDeletePostModalContainer } from "./DeletePostModalContainer";
import { useDeletePostMutation } from "../../../service/reactQueries";
import { useClickOutside } from "../../../hooks/useClickOutside";

interface DeletePostModalProps {
  show: boolean;
  onClose: () => void;
  id: string;
}

export const DeletePostModal = ({
  show,
  id,
  onClose,
}: DeletePostModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const feed = useAppSelector((state) => state.user.feed);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const deletePostMutation = useDeletePostMutation();
  const comments = useAppSelector((state) => state.user.comments);

  const handleDelete = () => {
    try {
      deletePostMutation.mutate(id);
      const newFeed = feed.filter((post: Post) => post.id !== id);
      dispatch(updateFeed(newFeed));
      const newCommentFeed = comments.filter((post: Post) => post.id !== id);
      dispatch(updateComments(newCommentFeed));
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  const outsideClickRef = useRef<HTMLDivElement | null>(null);
  const handler = () => {
    if (showModal) {
      return;
    }
    onClose();
  };

  useClickOutside(outsideClickRef, handler);

  return (
    <>
      {show && (
        <>
          <StyledDeletePostModalContainer
            ref={outsideClickRef}
            onClick={() => setShowModal(true)}
          >
            <DeleteIcon />
            <p>{t("buttons.delete")}</p>
          </StyledDeletePostModalContainer>
          <Modal
            title={t("modal-title.delete-post") + "?"}
            text={t("modal-content.delete-post")}
            show={showModal}
            onClose={handleClose}
            acceptButton={
              <Button
                text={t("buttons.delete")}
                buttonType={ButtonType.DELETE}
                size={"MEDIUM"}
                onClick={handleDelete}
              />
            }
          />
        </>
      )}
    </>
  );
};

export default DeletePostModal;
