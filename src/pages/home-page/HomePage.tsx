import SuggestionBox from "./components/suggestionBox/SuggestionBox";
import ContentContainer from "./components/contentContainer/ContentContainer";
import { updateFeed } from "../../redux/user";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { StyledUserSuggestionContainer } from "./UserSeuggestionContainer";
import { useGetPosts } from "../../service/reactQueries";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useAppSelector((state) => state.user.query);
  const { data, isError } = useGetPosts(query);

  if (data) {
    dispatch(updateFeed(data));
  }

  if (isError) {
    navigate("/sign-in");
  }

  return (
    <>
      <ContentContainer />
      <StyledUserSuggestionContainer>
        <SearchBar />
        <SuggestionBox />
      </StyledUserSuggestionContainer>
    </>
  );
};

export default HomePage;
