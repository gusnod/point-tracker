const mix = require("laravel-mix");

mix
  .js("src/index.tsx", "js")
  .sass("src/sass/app.scss", "assets")
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx"]
    }
  })
  .setPublicPath('dist')
  .copy('src/static', 'dist');