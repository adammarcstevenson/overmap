# OverMap
[OverMap](https://overmap.adammarcstevenson.com) is a map app for displaying two maps side-by-side or overlaid on top of each other. Use OverMap to compare the geometry of cities from around the world.

## About the Project
OverMap is a hobby project by [Adam Stevenson](https://adammarcstevenson.com). Learn more about the inspiration for this project in the *About OverMap* tab of the info modal on the [OverMap website](https://overmap.adammarcstevenson.com).

## OverMap Website
OverMap is hosted at https://overmap.adammarcstevenson.com

## Local Setup
You can download, build, and run this project locally.

### 1. Clone the repo and install
Clone this repo and install with npm.
```sh
git clone https://github.com/adammarcstevenson/overmap
npm install
```

### 2. Get a Google API key
Go to [Get Started with Google Maps Platform](https://developers.google.com/maps/gmp-get-started) to learn how to set up an API key for the Google Maps platform.

This API key will be public, so it is recommended that you add restrictions to your key. This project requires access to two Google APIs:
* Maps JavaScript API
* Places API

### 3. Configure your environment variables
1. Configure environment variables in a `.env` file according to the template in `.env.example`.
2. Adjust the `path` property for the `Dotenv` plugin in the `webpack.dev.js` and `webpack.prod.js`. This tells webpack where to find environment variables when compiling for development and production.
```
// webpack.dev.js
module.exports = {
  ...
  plugins: [
    ...
     new Dotenv({
      path: './.env.development.local',
      safe: true
    })
    ...
  ]
  ...
}
```
3. Add those `.env` files to your `.gitignore`!

### 4. Test and build
Use the `serve`, `build-dev`, and `build-prod` scripts to test and build the project.
```sh
npm run serve
npm run build-dev
npm run build-prod
```

### 5. Deploy
Deploy the built files in your `public` directory to any static hosting service. I use and recommend [Firebase](https://firebase.google.com/)!

## Release Notes
See [OverMap Release Notes](./release-notes.md).