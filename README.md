This site is the home for the [WorldWind Explorer](https://worldwind.earth/explorer) web app, the 
[WorldWindJS library](https://github.com/WorldWindEarth/worldwindjs)--a community edition of 
[NASA Web WorldWind](https://github.com/NASAWorldWind/WebWorldWind), and the 
[WorldWind Java-Community Edition](https://github.com/WorldWindEarth/WorldWindJava) SDK--a fork of 
[NASA WorldWind Java](https://github.com/NASAWorldWind/WorldWindJava), plus other _WorldWind_ programming resources.

**Table of Contents**
* TOC
{:toc}

---

# **WorldWind Explorer**
The [__Explorer__](https://worldwind.earth/explorer) is an HTML5/JavaScript geo-browser 
_[powered by WorldWindJS](https://worldwind.earth/worldwindjs/)_ and the Knockout and Bootstrap libraries. 
It is implemented as a single-page web application (SPA) using JQuery to dynamically load content.

## Overview
The _WorldWind Explorer_ is a geospatial web application for visualizing Earth. It uses the
WorldWindJS library (forked from the NASA WebWorldWind SDK) to display a 3D globe with terrain 
and imagery as well as 2D maps. It displays the sunrise and sunset times and solar angles
for any point on the earth. It shows the terrain's aspect and slope for any 
location. It features user-defined markers and point weather forecasts.
It has a search feature to find places.

## Resources
- [Explorer User and Developer Guides](https://github.com/WorldWindEarth/explorer/wiki) — _How to use or customize the Explorer._
- [Explorer Issue Tracker](https://github.com/WorldWindEarth/explorer/issues) — _Provide feedback and file bug reports._
- [Explorer Source Code](https://github.com/WorldWindEarth/explorer) — _If you are a developer, pull requests are welcomed._

---

# **WorldWindJS Library (Web WorldWind - Community Edition)**

[__WorldWindJS__](https://github.com/WorldWindEarth/worldwindjs) is a fork of the popular [Web WorldWind](https://github.com/NASAWorldWind/WebWorldWind)
library from NASA (with contributions from ESA). This fork provides a release channel for builds based on the latest fixes
and features from the WebWorldWind develop branch integrated with several enhancements from the 
WorldWind community. WorldWindJS is a drop-in replacement for the NASA Web WorldWind library.

WorldWindJS releases can be downloaded from [GitHub](https://github.com/WorldWindEarth/worldwindjs/releases) 
or from [npm](https://www.npmjs.com/package/worldwindjs).  Of course, you can fork or clone this
project and build the library yourself using the instructions in the [README](https://github.com/WorldWindEarth/worldwindjs/blob/master/README.md).

## Quick Start

Do you want to start developing right away? 

- Browse the source code for the [web-app-template](https://github.com/WorldWindEarth/worldwindjs/tree/develop/apps/web-app-template)
- View/edit a completed app in [JSFiddle](https://jsfiddle.net/emxsys/e0a2z1km/)

## React

Are you interested in building a WorldWindJS geo-browser or embedding a globe in a web page using [React](https://reactjs.org)? 
Checkout these resources: 

- [worldwind-react-globe](https://github.com/worldwindearth/worldwind-react-globe) - A Globe component that encapsulates WorldWindJS
- [worldwind-react-globe-bs4](https://github.com/worldwindearth/worldwind-react-globe-bs4) - Bootstrap UI components for the Globe component
- [worldwind-react-app](https://github.com/worldwindearth/worldwind-react-app) - An example geo-browser web app 

## Example Applications
Here some examples of applications built with WorldWindJS:

- [WorldWind Explorer](https://worldwind.earth/explorer) - A feature rich geo-browser built with Bootstrap and KnockoutJS.
- [Wildfire Management Tools](https://worldwind.earth/wildfire) - An Explorer-based geo-browser for predicting the potential behavior of wildfire.
- [WorldWind React Demo](https://worldwind.earth/worldwind-react-app) - An example geo-browser built with React.

## **How to Build a WorldWindJS Web App**

This tutorial shows you how to build a [WorldWindJS](https://github.com/WorldWindEarth/worldwindjs) web app
using [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/) and 
[Knockout](http://knockoutjs.com/index.html). You will build a feature-rich, responsive, 
customizable web app ready to be deployed to your site. This tutorial demonstrates:

- Initializing WorldWindJS with 3D globes and/or 2D maps
- Configuring and managing layers and settings
- Place name searches and geocoding
- Creating placemarks
- Going to locations
- Multi-globe support

This is what we will build:
<script async src="//jsfiddle.net/emxsys/e0a2z1km/embed/result/"></script>

### Tutorial
Let's begin!

- [Lesson 1: HTML with Bootstrap](lesson-1.md) 
- [Lesson 2: WorldWind Globe](lesson-2.md) 
- [Lesson 3: Layer Management with Knockout](lesson-3.md) 
- [Lesson 4: Place Search and Geocoding](lesson-4.md) 

## Sample Application
Here is a feature-rich [worldwind-web-app](https://github.com/WorldWindEarth/worldwind-web-app) template for quickly building a web app using the WorldWindJS library with Bootstrap and KnockoutJS. Simply fork/clone the project and publish to gh-pages.

- [Sample Application Project](https://github.com/WorldWindEarth/worldwind-web-app) - a template project for a feature-rich, responsive, customizable web app ready to be deployed to your site. 

- [Sample Application Demo](https://worldwindearth.github.io/worldwind-web-app/) - live demonstration of the application hosted out of the project's gh-pages.

## Simple Example
A very simple example showing to embed a WorldWind globe into a web page.

- [Simple Example](simple-example.md) 
- [Simple Demo](simple-demo.md) 

--- 

# **WorldWindJava - Community Edition**

[WorldWindJava Community Edition (WWJ-CE)](https://github.com/WorldWindEarth/WorldWindJava) is a community supported
fork of the [NASA WorldWind Java SDK](https://github.com/NASAWorldWind/WorldWindJava). It is hosted at 
https://github.com/WorldWindEarth along with other WorldWind-based projects. WWJ-CE seeks to mitigate the effects of 
the suspension and continue the development of WorldWind Java. _Pull requests are accepted._

- [Overview (README)](https://github.com/WorldWindEarth/WorldWindJava/blob/develop/README.md)
- [WorldWindJava API Documentation](https://worldwind.earth/WorldWindJava/)
- [Get Started, Examples and Tutorials in the Wiki](https://github.com/WorldWindEarth/WorldWindJava/wiki)

---

# **WorldWindAndroid - Community Edition**

[WorldWindAndroid Community Edition (WWA-CE)](https://github.com/WorldWindEarth/WorldWindAndroid) is a community supported
fork of the [NASA WorldWind Android SDK](https://github.com/NASAWorldWind/WorldWindAndroid). Like the WWJ-CA, WWA-CE is also hosted
at https://github.com/WorldWindEarth. WWA-CE seeks to mitigate the effects of the suspension and continue the development of 
WorldWind Android. _Pull requests are accepted._

---

# **WorldWind Resources**

## Setup Your Own WorldWind Servers
- [Elevation Server](elevation-server.md) - How to create a WorldWind elevation server

## Data Sources for Elevations
- [Elevation Data](elevation-data.md) - Sources for elevation data and conversion scripts

---

# ***NASA WorldWind Project Suspension***
NASA announced a impending shutdown on March 8, 2019:

> WorldWind team would like to inform you that starting May 3, 2019, NASA WorldWind project will be suspended.
>
> All the WorldWind servers providing elevation and imagery will be unavailable. While you can still download the SDKs from GitHub, there will be no technical support. If you have questions and/or concerns, please feel free to email at: [worldwind-info@lists.nasa.gov](mailto:worldwind-info@lists.nasa.gov)

## WebWorldWind 
Here is important information for mitigating issues caused by the shutdown in NASA Web WorldWind SDK based applications. The ramifications of the suspension are severe, including:

- **Critical:** Web applications linked to _https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/worldwind.min.js_ will fail if the _files.worldwind.arc.nasa.gov_ server is shutdown. ___The globe will not be displayed.___ Applications that use a local copy of _worldwind.js_ or _worldiwnd.min.js_ should continue to work, but image resources linked to "files.worldwind..." will not be displayed (e.g., the globe background, view controls, compass, etc.).

- **Severe:** Working web applications that use the built-in elevation services at https://worldwind26.arc.nasa.gov/elev will display a smooth globe – ___3D terrain visualizations will not work and all earth elevations will be zero.___ This will affect nearly every WorldWind-based web application.

- **Caution:** Working web applications that use the built-in imagery from https://worldwind25.arc.nasa.gov/wms ___will no longer have access to the Blue Marble and Landsat base map layers.___ Layers from other source should still work (e.g., Bing, USGS National Map, etc.)

### Alternatives to files.worldwind.arc.nasa.gov
If the _files.worldwind.arc.nasa.gov_ service is offline, an alternative source for the 'worldwind.js' library is required.

#### Use the WorldWindJS library
The WorldWindJS library is designed as a drop in replacement for `worldwind.js` (and `worldwind.min.js`). Here are two implementations
for using WorldWindJS.

**For npm based applications:** change the `@nasaworldwind/worldwind` dependency to `worldwindjs`. For example:

_Example: Original package.json_
```
  "dependencies": {
    "@nasaworldwind/worldwind": "^0.9.0"
  },
```
_Example: New package.json_
```
  "dependencies": {
    "worldwindjs": "^1.7.0"
  },
```

**For scripts:** change the src from _files.worldwind...worldwind.js_ to WorldWindJS' npm-based CDN at _unpkg.com_:

_Example: Old script element, using files.worldwind.arc.nasa.gov_
```
<script src="https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/worldwind.min.js"></script>
```
_Example: New script element, using WorldWindJS at unpkg.com_
```
<script src="https://unpkg.com/worldwindjs@1.7.0/build/dist/worldwind.min.js"></script>
```

#### Use NASA's WorldWind library from a CDN
Change script element's src from _files.worldwind_ to the npm-based CDN at _unpkg.com_ :

_Example: Old script element, using files.worldwind.arc.nasa.gov_
```
<script src="https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/worldwind.min.js"></script>
```
_Example: New script element, using unpkg.com_
```
<script src="https://unpkg.com/@nasaworldwind/worldwind@0.9.0/build/dist/worldwind.min.js"></script>
```

#### Use the Web WorldWind source code
Deploy the Web WorldWind source code, either directly or in compiled form, to your web server. 
This solution is the most flexible as it provides the capability to customize the sources for 
resources, imagery and elevations, and it ensures any changes at NASA or WorldWind Earth do not
have a direct affect your project's runtime.

---

### Alternatives to using WorldWind Elevations
#### Use the WorldWindJS library
The WorldWindJS library v2.0 (to-be-released) does not have dependencies on the NASA elevation services.
I have been beta-testing the serving of `application/bil` elevations from my own servers (which I pay for out of pocket).
If/when a shutdown becomes imminent I will transition WorldWindJS to use my servers.

#### Build your own elevation server
- [Elevation Server](elevation-server.md) - How to create a WorldWind elevation server
- [Elevation Data](elevation-data.md) - Sources for elevation data and conversion scripts

#### Change the source to use other elevation services
Here's an example for using alternative elevation services.  In this example, two custom elevation coverages
are defined, a custom elevation model is then defined, and finally, the WorldWindow is configured with the 
custom elevation model.

Example: a custom GEBCO elevation coverage class:
```
/**
 * @exports MyGebcoElevationCoverage
 */
define(['worldwind'],
    function (WorldWind) {
        "use strict";

        /**
         * Constructs an Earth elevation coverage using GEBCO data.
         * @alias MyGebcoElevationCoverage
         * @constructor
         * @augments TiledElevationCoverage
         * @classdesc Provides elevations for Earth. Elevations are drawn from the custom elevation service.
         */
        var MyGebcoElevationCoverage = function () {
            WorldWind.TiledElevationCoverage.call(this, {
                coverageSector: WorldWind.Sector.FULL_SPHERE,
                resolution: 0.008333333333333,
                retrievalImageFormat: "application/bil16",
                minElevation: -11000,
                maxElevation: 8850,
                urlBuilder: new WorldWind.WmsUrlBuilder("https://mapserver.somewhere.net/elev", "gebco", "", "1.3.0")
            });

            this.displayName = "GEBCO Earth Elevation Coverage";
        };

        MyGebcoElevationCoverage.prototype = Object.create(WorldWind.TiledElevationCoverage.prototype);

        return MyGebcoElevationCoverage;
    });
```

Example: a custom SRTM elevation coverage class:
```javascript
/**
 * @exports MySrtmElevationCoverage
 */
define(['worldwind'],
    function (WorldWind) {
        "use strict";

        /**
         * Constructs an Earth elevation coverage using CGIAR SRTM data.
         * @alias MySrtmElevationCoverage
         * @constructor
         * @augments TiledElevationCoverage
         * @classdesc Provides elevations for Earth. Elevations are drawn from the custom elevation service.
         */
        var MySrtmElevationCoverage = function () {
            WorldWind.TiledElevationCoverage.call(this, {
                coverageSector: new WorldWind.Sector(-60, 60, -180, 180),
                resolution: 0.000833333333333,
                retrievalImageFormat: "application/bil16",
                minElevation: -11000,
                maxElevation: 8850,
                urlBuilder: new WorldWind.WmsUrlBuilder("https://mapserver.somewhere.net/elev", "srtm-cgiar", "", "1.3.0")
            });

            this.displayName = "SRTM-CGIAR Earth Elevation Coverage";
        };

        MySrtmElevationCoverage.prototype = Object.create(WorldWind.TiledElevationCoverage.prototype);

        return MySrtmElevationCoverage;
    });
```

Example: a custom elevation model class that uses the custom coverages:
```javascript
/**
 * @exports MyElevationModel
 */
define([
        'model/globe/elevations/MyGebcoElevationCoverage',
        'model/globe/elevations/MySrtmElevationCoverage',
        'worldwind'
    ],
    function (MyGebcoElevationCoverage,
              MySrtmElevationCoverage,
              WorldWind) {
        "use strict";

        /**
         * Constructs an MyElevationModel consisting of two elevation coverages GEBCO, SRTM.
         * @alias MyElevationModel
         * @constructor
         */
        var MyElevationModel = function () {
            WorldWind.ElevationModel.call(this);

            this.addCoverage(new MyGebcoElevationCoverage());
            this.addCoverage(new MySrtmElevationCoverage());
        };

        MyElevationModel.prototype = Object.create(WorldWind.ElevationModel.prototype);

        return MyElevationModel;
    });
```
Example: the function for creating a `WorldWindow` with the custom elevation model:
```javascript
var wwd = new WorldWind.WorldWindow("globe-canvas", new MyElevationModel());
```

---

### Alternatives to using WorldWind Imagery
#### Use the WorldWindJS library
The WorldWindJS library v2.0 (to-be-released) will not have dependencies on the NASA imagery services.
I have been beta-testing the serving of Blue Marble and Landsate imagery from own servers (which I pay for out of pocket).
If/when a shutdown becomes imminent I will transition WorldWindJS to use my servers.

_TODO_
#### Change the source to use other imagery services
_TODO_

#### Build your own imagery server
_TODO_


---

# **About**
_[WorldWindEarth](https://github.com/WorldWindEarth), [WorldWindJS](https://github.com/WorldWindEarth/worldwindjs) and the [Explorer](https://github.com/WorldWindEarth/explorer) are personal projects of [Bruce Schubert](https://github.com/emxsys). 
I am a software engineer on the [NASA WorldWind](https://worldwind.arc.nasa.gov) 
team, but these projects are built and maintained in my spare time._
