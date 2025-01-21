const path = require('path');

module.exports = {
  // Enable source maps for debugging JavaScript and CSS
  devtool: 'source-map',  // You can also use 'eval-source-map' for faster builds
  
  module: {
    rules: [
      // Handle JavaScript and JSX files with babel-loader
      {
        test: /\.jsx?$/, // Match .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // Add rule to handle CSS files (e.g., magic.css)
      {
        test: /\.css$/, // Match .css files
        use: ['style-loader', 'css-loader', 'postcss-loader'], // Use these loaders for CSS
      },
    ],
  },

  // Ignore warnings for missing source maps for specific files
 
  ignoreWarnings: [
    // Ignore the source map warning for magic.css.map
    (warning) =>
      warning.message.includes('Failed to parse source map') &&
      warning.file?.includes('magic.css'),
  ],
  
  resolve: {
    // Configure alias for importing modules more easily
    alias: {
      '@': path.resolve(__dirname, 'src'), // Assuming you want to resolve '@' to 'src'
    },
  },
};
