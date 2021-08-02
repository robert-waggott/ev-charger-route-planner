# EV Charger Route Planner

In a similar fashion to my previous [repo/project](https://github.com/robert-waggott/animals-stuck-up-trees-and-other-incidents) this primarily acts as a test bed/proof of concept to both test new concepts and keep technicalskills up-to-date where they may not be being used every day.

The idea of this project is to build a route planning engine that will also allow the user to work out where and when to stop to charge their Electric/plug in hybrid vehicle. Whereas the previous repo/project had little practical use my thinking with this is that it will have some use, even just for myself.

## Getting started

1. `cd` to `/server` and run `npm run start:dev`
1. `cd` to `/ui` and run `npm start`

### Config.env

A config.env should be created in the root of the `/server` directory. It should contain the following settings -

```
PORT=3001
MAPTILERAPIKEY=nki...
MAPBOXAPIKEY=pk.eyJ1...
```

-   `PORT` - The port that the server should run on. Should be set to 3001.
-   `MAPTILERAPIKEY` - An API key from [maptiler.com](https://cloud.maptiler.com/).
-   `MAPBOXAPIKEY` - An API key from [mapbox.com](https://account.mapbox.com/).

## Todo

-   [x] Scaffold server
-   [x] Scaffold UI
-   [x] Full screen map
-   [x] Implement correct type ahead functionality
-   [x] From and to search
-   [ ] EV mileage field
-   [ ] Sidebar form validation
-   [ ] Displaying route on the map
-   [ ] Suggest walking/cycling

## Tech stack
