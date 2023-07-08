const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
const ImageminAvifWebpackPlugin = require('imagemin-avif-webpack-plugin');
const ImageminWebpackPlugin = require("imagemin-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const IgnorePlugin = require('webpack').IgnorePlugin;
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.bundle.js',
  },
  mode: "production",
  module: {
    rules: [

    ]
  },
  plugins: [
      new CopyWebpackPlugin({
          patterns: [  
              {
                  from: "./src/img/**/**", // Ruta de las imágenes minificadas
                  to: ({ context, absoluteFilename }) => {
                      const relativePath = path.relative(`${context}/src/img`, absoluteFilename);
                      return `img/${relativePath}`;
                  },// Carpeta de salida personalizada para las imágenes minificadas
              },
          ]
      }),
      new ImageminWebpackPlugin({
          test: /\.(jpe?g|png|gif|svg)$/i, // Tipos de archivos a comprimir
          pngquant: {
            quality: "65-90", // Configuración específica para PNG
          },
          gifsicle: {
            optimizationLevel: 3, // Configuración específica para GIF
          },
          svgo: {}, // Configuración específica para SVG
          plugins: [], // Configuración adicional de plugins (opcional)
          destination: path.resolve(__dirname, 'dist', 'img'),
      }),
      new ImageminWebpWebpackPlugin({
          config: [
            {
              test: /\.(jpe?g|png)/,
              options: {
                quality: 75 // Configura la calidad de compresión de WebP (valor entre 0 y 100)
              },
              overrideExtension: true,
              detailedLogs: false,
              silent: false,
              strict: true,
            }
          ]
      }),
      new ImageminAvifWebpackPlugin({
          config: [
            {
              test: /\.(jpe?g|png)/,
              options: {
                quality: 75 // Configura la calidad de compresión de WebP (valor entre 0 y 100)
              },
              overrideExtension: true,
              detailedLogs: false,
              silent: false,
              strict: true,
            }
          ]
      }),
      new IgnorePlugin({
        resourceRegExp: /\.s[ac]ss$/i,
      }),
  ],
  devServer: {
      static: {
          directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
      open: true,
  }
}