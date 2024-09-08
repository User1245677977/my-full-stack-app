const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/"),
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util/"),
      "url": require.resolve("url/")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    })
  ]
};
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "fs": false, // fs cannot be polyfilled for the browser
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "url": require.resolve("url/"),
      "util": require.resolve("util/")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
module.exports = {
    resolve: {
      fallback: {
        "fs": false,
        "path": require.resolve("path-browserify"),
        "stream": require.resolve("stream-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "http": require.resolve("stream-http"),
        "querystring": require.resolve("querystring-es3")
      }
    }
  };
  module.exports = {
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
        fs: false,  // fs cannot be polyfilled in the browser
        stream: require.resolve("stream-browserify")
      }
    }
  };
  