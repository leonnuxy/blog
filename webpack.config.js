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
      // Updated CSS loaders to reflect new folder structure
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [
          path.resolve(__dirname, 'styles/global'),
          path.resolve(__dirname, 'styles/components'),
          path.resolve(__dirname, 'styles/views')
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@controllers': path.resolve(__dirname, 'src/controllers'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'styles')
    },
    fallback: {
      fs: false,
      path: false
    }
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
