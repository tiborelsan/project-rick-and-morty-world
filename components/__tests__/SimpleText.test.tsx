import React from "react";
import { SimpleText } from "../atoms/SimpleText";
import { renderWithProviders } from "../test";

describe("SimpleText", () => {
    const renderWithTheme = (props: any) => (
        renderWithProviders(<SimpleText {...props} />)
    );

    it("renders correctly with default props", () => {
        const { getByTestId } = renderWithTheme({ text: "Test Simple Text" });
        expect(getByTestId("simple-text")).toBeTruthy();
    });
});
