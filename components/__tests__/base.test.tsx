import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { View, Text } from 'react-native';

// Mock react-redux
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}));

// Import redux
import { useSelector, useDispatch } from 'react-redux';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';

const mockStore = configureMockStore();
const defaultState = {
    favorites: {
        items: []
    }
};

// Configuration du mock useSelector
const mockUseSelector = useSelector as unknown as jest.Mock;
mockUseSelector.mockImplementation(callback => callback(defaultState));

const renderWithProviders = (
    ui: React.ReactElement,
    {
        initialState = defaultState,
        store = mockStore(initialState),
        ...renderOptions
    } = {}
) => {
    return render(
        <Provider store={store}>
            <ThemeProvider value={DefaultTheme}>
                {ui}
            </ThemeProvider>
        </Provider>,
        renderOptions
    );
};

describe('Component Test', () => {
    beforeEach(() => {
        // Réinitialiser les mocks avant chaque test
        mockUseSelector.mockClear();
    });

    it('renders correctly', () => {
        const text = "Test render global";
        const { getByText } = renderWithProviders(
            <View><Text>{text}</Text></View>
        );
        expect(getByText(text)).toBeTruthy();
    });
});

export { renderWithProviders };