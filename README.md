# katchup
Facebook SDK + Mean Event app in progress

This is a simple Facebook SDK Event App. As you authenticate using Facebook, your Events will be sent to a MongoDB Database. 
You can search Events by Date and Time. By default the App will give you Events on the current Date and within a 10km Radius to your current Position 
(make sure you allow geolocation services in your browser -> otherwise use the google maps places searchbox to specify your position)

If you run the app locally you will only see your own events, so make sure you have some facebook events on the current date date and within a 10 km radius to view.

Technologies used: Node.js, Express, AngularJs, MongoDB, Grunt, Facebook Api, Google Maps Api

To install locally clone this repo and run:

```
npm install
bower install
```
To start the server run:

```
node server
```

then visit http://localhost:3333 in your browser. Enjoy the events. To start the development server and hot reloading run:

```
nodemon
grunt watch
```
