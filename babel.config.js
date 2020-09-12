module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src/app',
            rootPathPrefix: '@app',
          },
          {
            rootPathSuffix: './src/config',
            rootPathPrefix: '@config',
          },
          {
            rootPathSuffix: './src/database',
            rootPathPrefix: '@database',
          },
          {
            rootPathSuffix: './src/start',
            rootPathPrefix: '@start',
          },
        ],
      },
    ],
  ],
};
