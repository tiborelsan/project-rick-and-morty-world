import React from "react";
import Card from "../molecules/Card";
import { renderWithProviders } from "../test";

describe("Card", () => {
    const renderWithTheme = (props: any) => (
        renderWithProviders(<Card {...props} />)        
    );

    it("renders correctly with default props", () => {
        const { getByTestId } = renderWithTheme({ id: 9, name: "Tibo", species: "Human", gender: "Male", image: "src image", isReverse: false });
        expect(getByTestId("card-test")).toBeTruthy();
    });
});
