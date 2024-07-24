import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../../src/components/modal/Modal";
import { useClickOutside } from "../../src/hooks/useClickOutside";
import "@testing-library/jest-dom";
import React from "react";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "../../src/util/LightTheme";

jest.mock("../../src/hooks/useClickOutside", () => ({
  useClickOutside: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
  (useClickOutside as jest.Mock).mockImplementation((ref, handler) => {
    if (ref.current) {
      handler();
    }
  });
});

describe("Modal Component", () => {
  const mockOnClose = jest.fn();

  const renderModal = (props: any) => {
    return render(
      <ThemeProvider theme={LightTheme}>
        <div>
          <div id="modal-root"></div>
          <Modal {...props} />
        </div>
      </ThemeProvider>
    );
  };

  test("should render modal when show is true", () => {
    renderModal({
      show: true,
      title: "Test Title",
      text: "Test Text",
      acceptButton: <button>Accept</button>,
      onClose: mockOnClose,
    });

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Text")).toBeInTheDocument();
    expect(screen.getByText("Accept")).toBeInTheDocument();
  });

  test("should not render modal when show is false", () => {
    renderModal({
      show: false,
      title: "Test Title",
      text: "Test Text",
      acceptButton: <button>Accept</button>,
      onClose: mockOnClose,
    });

    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
  });

  test("should render image when img prop is provided", () => {
    renderModal({
      show: true,
      title: "Test Title",
      img: "test-image.png",
      acceptButton: <button>Accept</button>,
      onClose: mockOnClose,
    });

    expect(screen.getByAltText("modal")).toHaveAttribute(
      "src",
      "test-image.png"
    );
  });

  test("should call onClose when cancel button is clicked", () => {
    renderModal({
      show: true,
      title: "Test Title",
      acceptButton: <button>Accept</button>,
      onClose: mockOnClose,
    });

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("should call onClose when clicking outside modal", () => {
    const backgroundRef = {
      current: { contains: jest.fn(() => false) } as any,
    };
    useClickOutside(backgroundRef, mockOnClose);

    renderModal({
      show: true,
      title: "Test Title",
      acceptButton: <button>Accept</button>,
      onClose: mockOnClose,
    });

    expect(mockOnClose).toHaveBeenCalled();
  });

  test("should not call onClose when clicking inside modal", () => {
    renderModal({
      show: true,
      title: "Test Title",
      acceptButton: <button>Accept</button>,
      onClose: mockOnClose,
    });

    fireEvent.click(screen.getByText("Test Title"));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("should render children inside modal", () => {
    renderModal({
      show: true,
      title: "Test Title",
      acceptButton: <button>Accept</button>,
      onClose: mockOnClose,
      children: <div data-testid="modal-children">Modal Children</div>,
    });

    expect(screen.getByTestId("modal-children")).toBeInTheDocument();
  });
});
