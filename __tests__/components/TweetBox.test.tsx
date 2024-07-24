/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TweetBox from "../../src/components/tweet-box/TweetBox";
import {
  useCreateComment,
  useCreatePost,
  useGetMe,
} from "../../src/service/reactQueries";
import { useToastContext } from "../../src/hooks/useToastContext";
import { ToastType } from "../../src/components/toast/Toast";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "../../src/util/LightTheme";

// Mock the hooks
jest.mock("../../src/service/reactQueries");
jest.mock("../../src/hooks/useToastContext");
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("TweetBox", () => {
  const setToastMessage = jest.fn();
  const user = { profilePicture: "profile.jpg" };

  beforeEach(() => {
    (useToastContext as jest.Mock).mockReturnValue({ setToastMessage });
    (useGetMe as jest.Mock).mockReturnValue({ data: user });
    (useCreatePost as jest.Mock).mockReturnValue({ mutate: jest.fn() });
    (useCreateComment as jest.Mock).mockReturnValue({ mutate: jest.fn() });
    global.URL.createObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={LightTheme}>{component}</ThemeProvider>);
  };

  test("renders TweetBox component", () => {
    renderWithTheme(<TweetBox />);

    expect(
      screen.getByPlaceholderText("placeholder.tweet")
    ).toBeInTheDocument();
    expect(screen.getByText("Tweet")).toBeInTheDocument();
  });

  test("renders TweetBox component with mobile prop", () => {
    renderWithTheme(<TweetBox mobile />);

    expect(
      screen.getByPlaceholderText("placeholder.tweet")
    ).toBeInTheDocument();
    expect(screen.getByText("Tweet")).toBeInTheDocument();
    expect(screen.getByTestId("back-arrow-icon")).toBeInTheDocument(); // Assuming BackArrowIcon has data-testid="back-arrow-icon"
  });

  test("changes the content of the textarea", () => {
    renderWithTheme(<TweetBox />);

    const textarea = screen.getByPlaceholderText("placeholder.tweet");
    fireEvent.change(textarea, { target: { value: "Hello world!" } });

    expect(textarea).toHaveValue("Hello world!");
  });

  test("adds and removes images", () => {
    renderWithTheme(<TweetBox />);

    const file = new File(["image"], "image.png", { type: "image/png" });
    const mockObjectURL = "mockObjectURL"; // Valor fijo para el mock

    // Mock URL.createObjectURL
    global.URL.createObjectURL = jest.fn(() => mockObjectURL);

    // Simulate adding an image
    fireEvent.change(screen.getByTestId("image-input"), {
      target: { files: [file] },
    });

    expect(screen.getByAltText(mockObjectURL)).toBeInTheDocument();

    // Simulate removing the image
    fireEvent.click(screen.getByTestId("remove-icon"));
    expect(screen.queryByAltText(mockObjectURL)).not.toBeInTheDocument();
});

  test("submits a tweet successfully", async () => {
    const createPost = jest.fn();
    (useCreatePost as jest.Mock).mockReturnValue({ mutate: createPost });

    renderWithTheme(<TweetBox />);

    const textarea = screen.getByPlaceholderText("placeholder.tweet");
    fireEvent.change(textarea, { target: { value: "Hello world!" } });

    fireEvent.click(screen.getByText("Tweet"));

    await waitFor(() => {
      expect(createPost).toHaveBeenCalledWith({
        content: "Hello world!",
        images: [],
        parentId: undefined,
      });
      expect(setToastMessage).toHaveBeenCalledWith(
        "Post sent",
        ToastType.SUCCESS
      );
    });
  });

  test("submits a comment successfully", async () => {
    const createComment = jest.fn();
    (useCreateComment as jest.Mock).mockReturnValue({ mutate: createComment });

    renderWithTheme(<TweetBox parentId="123" />);

    const textarea = screen.getByPlaceholderText("placeholder.tweet");
    fireEvent.change(textarea, { target: { value: "This is a comment" } });

    fireEvent.click(screen.getByText("Tweet"));

    await waitFor(() => {
      expect(createComment).toHaveBeenCalledWith({
        content: "This is a comment",
        images: [],
        parentId: "123",
      });
      expect(setToastMessage).toHaveBeenCalledWith(
        "Comment sent",
        ToastType.SUCCESS
      );
    });
  });

  test("disables tweet button when content is empty", () => {
    renderWithTheme(<TweetBox />);

    const button = screen.getByText("Tweet");
    expect(button).toBeDisabled();
  });
});
