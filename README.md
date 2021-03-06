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
-   `MAPTILERAPIKEY` - An API key from [maptiler.com](https://cloud.maptiler.com/). A free account is fine.
-   `MAPBOXAPIKEY` - An API key from [mapbox.com](https://account.mapbox.com/). A free account is fine.

## Done

-   [x] From and to search
-   [x] EV mileage field
-   [x] Sidebar form validation
-   [x] Perform the route search
-   [x] Start displaying route on the map
-   [x] Display EV chargers near start point of journey
-   [x] Display EV chargers near end point of journey
-   [x] Allow EV charger icons to be clicked upon
-   [x] Open EV charger details in right hand side panel
-   [x] EV charger details map in right hand side panel
-   [x] Sort out `from` and `to` field attribution tooltips
-   [x] Ability to choose between different routes
-   [x] Keep search panel open until route has been selected
-   [x] Add ability to save routes - use local storage for the time being
-   [x] https://hinty.io/ivictbor/autostart-multiple-commands-in-vscode-terminal/
-   [x] Name saved routes
-   [x] Ability to overwrite/replace saved routes
-   [x] Use reducer for saved routes
-   [x] Retrieve saved routes and allow them be opened on page load
-   [x] Add in a toast when a route has been saved -> https://react-hot-toast.com/
-   [x] Refactor maptiler url so it's shared across components
-   [x] Extend startup tasks to run `npm test`
-   [x] Refactor tests to use nock
-   [x] Ability to change map tiles
-   [x] Change UX of how a search can be run
-   [x] Display instructions

## In progress

-   [ ] Zoom to step from within the instructions

## Todo

-   [ ] Reduce web gl craziness in the settings screen
-   [ ] Show range polygons around ev charging points
-   [ ] Print instructions
-   [ ] Create/implement the EV algorithm
-   [ ] Change route styling and add option in UI to change it
-   [ ] Error banner - using a global scope/store
-   [ ] Feedback form
-   [ ] Add a missing EV charger form
-   [ ] Test accessibility and create additional Todo items
-   [ ] Update maplibre

## Nice to have

-   [ ] Replace this with a trello board!
-   [ ] Suggesting places to grab a coffee/use the toilet whilst EV is charging
-   [ ] Suggest walking/cycling instead

## Tech stack
