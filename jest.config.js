// import type { Config } from 'jest'
//
// const config: Config = {
//   roots: [
//     '<rootDir>/src'
//   ],
//   collectCoverageFrom: [
//     '<rootDir>/src/**/*.ts'
//   ],
//   coverageDirectory: 'coverage',
//   coverageProvider: 'babel',
//   testEnvironment: 'node',
//   preset: '@shelf/jest-mongodb',
//   transform: {
//     '.+\\.ts$': 'ts-jest'
//   },
//   testMatch: ['**/*.spec.ts', '**/*.test.ts']
// }
//
// export default config

module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  // moduleNameMapper: {
  //   '@/tests/(.*)': '<rootDir>/tests/$1',
  //   '@/(.*)': '<rootDir>/src/$1'
  // }
}
