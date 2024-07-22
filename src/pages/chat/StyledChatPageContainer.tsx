import styled from 'styled-components';

export const StyledChatPageMenu = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 40%;
  border-right: 1px solid ${(props) => props.theme.colors.containerLine};
`;

export const StyledChatContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  border-right: 1px solid ${(props) => props.theme.colors.containerLine};
`;

export const StyledChatPageHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vh;
  gap: 5vh;
`;