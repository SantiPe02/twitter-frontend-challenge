import styled from 'styled-components';

export const StyledAllChats = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledChatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1vh;
  padding: 2vh;
  border-top: 1px solid ${(props) => props.theme.colors.containerLine};

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.hover};
  }
`;

export const StyledChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;