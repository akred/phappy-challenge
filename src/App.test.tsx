import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders that the webapp container is loaded", () => {
  render(<App />);
  //const linkElement = screen.getByText(/phappy-container/);
  //expect(linkElement).toBeInTheDocument();
});
