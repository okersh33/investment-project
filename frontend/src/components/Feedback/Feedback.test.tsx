import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Feedback } from "./Feedback";

describe("Feedback Component", () => {
  test("renders success feedback message correctly with correct styling", () => {
    const message = "Successful";
    render(<Feedback type="success" message={message} />);

    const element = screen.getByText(message);
    expect(element).toBeInTheDocument();
  });

  test("renders warning feedback message correctly with corect styling", () => {
    const message = "Warning";
    render(<Feedback type="warn" message={message} />);

    const element = screen.getByText(message);
    expect(element).toBeInTheDocument();
  });

  test("renders error feedback message correctly with correct styling", () => {
    const message = "An error occurred";
    render(<Feedback type="error" message={message} />);

    const element = screen.getByText(message);
    expect(element).toBeInTheDocument();
  });
});
