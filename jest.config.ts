import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    roots: ['<rootDir>'],
    testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.ts',
        '^@fontsource/*': '<rootDir>/__mocks__/fileMock.ts',
    },
    transformIgnorePatterns: ['node_modules/(?!@fontsource)'],
};

export default config;
