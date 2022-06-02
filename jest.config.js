module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.{ts, tsx}'],
    coveragePathIgnorePatterns: ['index.ts'],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    transform: {
        '.+\\.ts$': 'ts-jest',
    },
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
    },
}
