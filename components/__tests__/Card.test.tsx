import React from "react";
import Card from "../molecules/Card";
import { renderWithProviders } from "./base.test";
import { fireEvent } from "@testing-library/react-native";
import { useDispatch, useSelector } from "react-redux";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));


describe("Card", () => {
    const mockDispatch = jest.fn();
    const mockUseSelector = useSelector as unknown as jest.Mock;

    beforeEach(() => {
        mockDispatch.mockClear();
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

        // Mock des favoris par défaut (aucun favori)
        mockUseSelector.mockImplementation((callback) =>
            callback({ favorites: { items: [] } })
        );
    });

    const defaultProps = {
        id: 9,
        name: "Tibo",
        species: "Human",
        gender: "Male",
        image: "src image",
        isReverse: false,
    };

    it("renders correctly", () => {
        const { getByTestId } = renderWithProviders(<Card {...defaultProps} />);
        expect(getByTestId("card-test")).toBeTruthy();
    });

    it("displays correct character details", () => {
        const { getByText } = renderWithProviders(<Card {...defaultProps} />);
        expect(getByText("Tibo")).toBeTruthy();
        expect(getByText("Species : Human")).toBeTruthy();
        expect(getByText("Gender : Male")).toBeTruthy();
    });

    it("triggers favorite action on press", () => {
        const { getByTestId } = renderWithProviders(<Card {...defaultProps} />);
        const favoriteButton = getByTestId("favorite-button");

        fireEvent.press(favoriteButton);
        
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(expect.any(Object));
    });
});
