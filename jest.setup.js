process.env.EXPO_OS = 'android';

// Setup de l'environnement global
global.window = {};
global.window.setTimeout = setTimeout;
global.window.clearTimeout = clearTimeout;
global.window.setInterval = setInterval;
global.window.clearInterval = clearInterval;
global.window.requestAnimationFrame = function (callback) {
    return setTimeout(callback, 0);
};
global.window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
};

// Mocks pour React Native Reanimated
jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => { };
    return Reanimated;
});

// Mocks pour React Navigation
jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
            dispatch: jest.fn(),
        }),
    };
});

jest.mock("expo-router");
jest.mock("@expo/vector-icons");

global.__reanimatedWorkletInit = jest.fn();
jest.useFakeTimers();