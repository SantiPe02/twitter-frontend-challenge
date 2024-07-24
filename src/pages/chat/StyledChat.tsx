import styled from "styled-components";

export const StyledChat = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const StyledSendMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vh;
  padding: 2vh;
  border-top: 1px solid ${(props) => props.theme.colors.containerLine};
`;

export const StyledChatInput = styled.input`
  border: none;
  outline: none;
  background: none;
  width: 100%;
  border-radius: 20px;
  padding: 1vh;
  border: 1px solid ${(props) => props.theme.colors.outline};

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.main};
  }
`;

export const StyledMessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  gap: 0.5vh;
  padding: 1vh;
  overflow-y: auto;
`;

export const StyledChatBubble = styled.div<{ isSender: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  padding: 1.5vh;
  border-radius: 20px;
  max-width: 30%;
  background-color: ${(props) =>
    props.isSender ? props.theme.colors.main : props.theme.colors.hover};

  p {
    font-family: ${(props) => props.theme.font.default};
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
    letter-spacing: -0.15px;
    margin: 0;
    color: ${(props) => (props.isSender ? "white" : props.theme.text.default)};
  }

  span {
    font-family: ${(props) => props.theme.font.default};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
    letter-spacing: -0.15px;
    margin: 0;
    color: ${(props) => (props.isSender ? "white" : props.theme.text.default)};
  }
`;

export const StyledNoChatOpen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const StyledChatHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vh;
  gap: 2vh;
  border-bottom: 1px solid ${(props) => props.theme.colors.containerLine};
`;

export const StyledChatDisplay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
