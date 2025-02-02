export const useRouter = jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
}));

export const useLocalSearchParams = jest.fn(() => ({}));

export const useSegments = jest.fn(() => []);

export const useNavigation = jest.fn(() => ({
    navigate: jest.fn(),
    setOptions: jest.fn(),
}));

export const Stack = jest.fn(({ children }) => children);
export const Link = jest.fn(({ children }) => children);
