import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemList from "./Items";

test("Test Loading Component", async () => {
  // ARRANGE
  render(<ItemList />);

  // ACT
  const element = screen.getByText("Home");
  // ASSERT
  expect(element).toBeVisible();
});
