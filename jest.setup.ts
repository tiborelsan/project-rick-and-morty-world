import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () =>
    require("react-native-reanimated/mock")
);

jest.mock("@react-navigation/native", () => ({
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
        navigate: jest.fn(),
        goBack: jest.fn(),
    }),
}));

jest.mock("expo-linking", () => ({
    ...jest.requireActual("expo-linking"),
    openURL: jest.fn(),
}));
