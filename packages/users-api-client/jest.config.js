module.exports = {
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Assicurati di utilizzare .ts qui
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json', // Assicurati di puntare al tuo file tsconfig corretto qui
    },
  },
};
require('ts-node').register({files: true});
require('tsconfig-paths').register();