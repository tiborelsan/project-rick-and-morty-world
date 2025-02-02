module.exports = {
    preset: 'jest-expo',
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@react-native/.*|react-redux)'
    ],
    setupFiles: ['<rootDir>/jest.setup.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.afterEnv.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
            presets: ['babel-preset-expo']
        }]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'jsdom'
}