import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "./Loading";
import CategoryItem from "./CategoryItem";

test("Test Loading Component", async () => {
  // ARRANGE
  render(<Loading />);

  // ACT
  const element = screen.getByTestId("spinner");
  // ASSERT
  expect(element).toBeVisible();
});

test("Test Category Item", async () => {
  // ARRANGE
  render(
    <CategoryItem
      val="decor"
      handleType={() => undefined}
      icon="fa-solid"
      isSelected
    />
  );

  // ACT
  const element = screen.getByText("Decor");
  // ASSERT
  expect(element).toBeVisible();
});
