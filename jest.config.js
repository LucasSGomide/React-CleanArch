module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{ts,tsx}',
        '!**/*.d.ts',
        '!<rootDir>/src/main/**/*',
        '!<rootDir>/src/presentation/components/router/**/*',
    ],
    coveragePathIgnorePatterns: ['index.ts'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    transform: {
        '.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
        '\\.scss$': 'identity-obj-proxy',
    },
}
