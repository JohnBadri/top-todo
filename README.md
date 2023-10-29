# Webpack 5 Boilerplate

## What's Included

- **Babel**: ES6+ support
- **CSS Loader**: Import CSS files
- **HTML Webpack Plugin**: Auto-generate HTML
- **Dev Server**: Live reloading
- **Asset Management**: Handle images and fonts
  - Images: png, svg, jpg, jpeg, gif
  - Fonts: woff, woff2, eot, ttf, otf
- **Source Maps**: Debugging support
- **Hot Module Replacement**: Automatic browser refresh

## Commands

### Install Dependencies

npm install

### Run Dev Server

npm run dev

### Build

npm run build

## Configuration File Overview

Your \`webpack.config.js\` includes:

- **Mode**: Development
- **Entry Point**: \`src/index.js\`
- **Output**: Bundles in \`dist\` directory
- **Dev Server**: Runs on \`localhost:3000\`
- **Loaders**: CSS, Babel, Images, Fonts
- **Plugins**: HTML Webpack Plugin
