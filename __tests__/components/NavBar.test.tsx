import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../../src/components/navbar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetMe } from "../../src/service/reactQueries";
import "@testing-library/jest-dom";
import React from "react";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "../../src/util/LightTheme";

// Mocks
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../src/service/reactQueries", () => ({
  useGetMe: jest.fn(),
}));

jest.mock("../../src/components/tweet-modal/TweetModal", () => ({
  __esModule: true,
  default: ({ open, onClose }: any) =>
    open ? <div data-testid="tweet-modal">Tweet Modal</div> : null,
}));

jest.mock("../../src/components/profile-logout/ProfileLogoutPrompt", () => ({
  __esModule: true,
  default: () => <div data-testid="profile-logout-prompt">Profile Logout Prompt</div>,
}));

describe("NavBar Component", () => {
  const mockNavigate = jest.fn();
  const mockUseGetMe = useGetMe as jest.MockedFunction<typeof useGetMe>;
  const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>;

  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (mockUseLocation as jest.Mock).mockReturnValue({ pathname: "/" });
    //@ts-ignore
    mockUseGetMe.mockReturnValue({ data: { id: "123" } });
  });

  test("should render NavBar and navigate to home", () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <NavBar />
      </ThemeProvider>
    );

    expect(screen.getByText("navbar.home")).toBeInTheDocument();
    expect(screen.getByText("navbar.profile")).toBeInTheDocument();
    expect(screen.getByText("message")).toBeInTheDocument();
    expect(screen.getByText("Tweet")).toBeInTheDocument();

    fireEvent.click(screen.getByText("navbar.home"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("should open TweetModal when Tweet button is clicked", () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <NavBar />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText("Tweet"));
    expect(screen.getByTestId("tweet-modal")).toBeInTheDocument();
  });

  test("should navigate to profile page when avatar is clicked", () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <NavBar />
      </ThemeProvider>
    );

    // Simulate a large screen width
    window.innerWidth = 1300;
    fireEvent.click(screen.getByText("navbar.profile"));
    expect(mockNavigate).toHaveBeenCalledWith("/profile/123");
  });

  test("should toggle logout prompt when logout button is clicked", () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <NavBar />
      </ThemeProvider>
    );

    // Find and click the logout button
    const logoutButton = screen.getByTestId("profile-logout-prompt");
    fireEvent.click(logoutButton);

    // Confirm the logout prompt is toggled
    expect(screen.getByTestId("profile-logout-prompt")).toBeInTheDocument();
  });

  test("should navigate to chat page when message item is clicked", () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <NavBar />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText("message"));
    expect(mockNavigate).toHaveBeenCalledWith("/chat");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});