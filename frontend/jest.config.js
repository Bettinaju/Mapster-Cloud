module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node', // Oder 'jsdom', je nach Bedarf
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  transformIgnorePatterns: ['/node_modules/'], // Falls du keine Transformationen benötigst
};
