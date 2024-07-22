import styled from "styled-components";

export const StyledCreateChatInput = styled.input`
  border: none;
  outline: none;
  background: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1vh;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.outline};

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.main};
  }
`;
