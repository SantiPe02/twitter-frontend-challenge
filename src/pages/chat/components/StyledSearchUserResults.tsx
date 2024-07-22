import styled from "styled-components";

export const StyledSearchUserResults = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledSearchUserResultsContainer = styled.div`
  overflow-y: auto;
  max-height: 4.2vh;
  width: 100%;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
