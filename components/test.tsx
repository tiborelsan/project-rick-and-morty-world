// testUtils.js
import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { View, Text } from 'react-native';
import * as redux from 'react-redux';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';

// Init default store redux to test multiple screens
const mockStore = configureMockStore();
const defaultState: any = {
    favorites: {
        list: []
    }
};

// Mock all use selector
jest
    .spyOn(redux, 'useSelector')
    .mockImplementation((callback) => callback(defaultState));

export const renderWithProviders = (ui: any, { initialState = defaultState, store = mockStore(initialState), ...renderOptions } = {}) => {
    return render(
        <Provider store={store}>
            <ThemeProvider value={DefaultTheme}>
                {ui}
            </ThemeProvider>
        </Provider>,
        renderOptions
    );
};

describe('test.tsx', () => {
    it('render global is good', () => {
        const text = "Test render global";

        const { getByText } = renderWithProviders(
            <View><Text>{text}</Text></View>
        );

        expect(getByText(text)).toBeTruthy();
    });
});
