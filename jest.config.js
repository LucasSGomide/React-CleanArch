module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.{ts, tsx}'],
    coveragePathIgnorePatterns: ['index.ts'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    transform: {
        '.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
    },
}
