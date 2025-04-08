const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    client: './src/entries/client.ts', // Frontend entry point
    admin: './src/entries/admin.ts',  // Admin dashboard entry point
    // Removed postDetail entry point as it is now part of the client bundle
  },
  devtool: 'inline-source-map',
  target: 'web', // Ensure Webpack targets the browser environment
  externals: {
    // fs: 'commonjs fs', // Usually not needed for frontend code, keep if necessary for specific lib
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      fs: false, // Prevent Webpack from polyfilling fs for the browser
      path: false, // Prevent Webpack from polyfilling path for the browser
      // Add other Node.js core modules here if needed by dependencies, e.g., crypto: false
    },
  },
  output: {
    // Outputs client.bundle.js, admin.bundle.js, and postDetail.bundle.js
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/client'), // Output bundles to dist/client
    publicPath: '/dist/client/' // Helps resolve assets if needed, matches script src path structure
  },
  // Optional: Add development server config if you use webpack-dev-server
  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, 'public'), // Serve files from public
  //   },
  //   compress: true,
  //   port: 9000, // Or any port you prefer
  //   // Proxy API requests to your backend server if running separately
  //   proxy: {
  //     '/api': 'http://localhost:3000', // Adjust backend port if needed
  //   },
  // },
};
