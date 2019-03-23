This site is the home for the [WorldWind Explorer](https://worldwind.earth/explorer) web app and 
other _WorldWind_ programming resources.

**Table of Contents**
* TOC
{:toc}

---

# WorldWind Explorer
The [__Explorer__](https://worldwind.earth/explorer) is an HTML5/JavaScript geo-browser 
_[powered by WorldWindJS](https://emxsys.github.io/worldwindjs/)_ and the Knockout and Bootstrap libraries. 
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

# WorldWindJS Library

[__WorldWindJS__](https://github.com/WorldWindEarth/worldwindjs) is a fork of the popular [Web WorldWind](https://github.com/NASAWorldWind/WebWorldWind)
library from NASA (with contributions from ESA). This fork provides a release channel for builds based on the latest fixes
and features from the WebWorldWind develop branch integrated with several enhancements from the 
WorldWind community. 

WorldWindJS releases can be downloaded from [GitHub](https://github.com/WorldWindEarth/worldwindjs/releases) 
or from [npm](https://www.npmjs.com/package/worldwindjs).  Of course, you can fork or clone this
project and build the library yourself using the instructions in the [README](https://github.com/WorldWindEarth/worldwindjs/blob/master/README.md).

## Examples

- [WorldWind Explorer](https://worldwind.earth/explorer) - A feature rich geo-browser built with Bootstrap and KnockoutJS.
- [WorldWind React Demo](https://emxsys.github.io/worldwind-react-app) - An example geo-browser built with React.

## Quick Start

Do you want to start developing right away? 

- Browse the source code for the [web-app-template](https://github.com/WorldWindEarth/worldwindjs/tree/develop/apps/web-app-template)
- View/edit a completed app in [JSFiddle](https://jsfiddle.net/emxsys/e0a2z1km/)

Are you interested in building a WorldWindJS geo-browser or embedding a globe in a web page using [React](https://reactjs.org)? 
Checkout these resources: 

- [worldwind-react-globe](https://github.com/emxsys/worldwind-react-app) - A Globe component that encapsulates WorldWindJS
- [worldwind-react-globe-bs4](https://github.com/emxsys/worldwind-react-app) - Bootstrap UI components for the Globe component
- [worldwind-react-app](https://github.com/emxsys/worldwind-react-app) - An example geo-browser web app 

---

# How to Build a WorldWindJS Web App

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

## Let's Begin

- [Lesson 1: HTML with Bootstrap](lesson-1.md) 
- [Lesson 2: WorldWind Globe](lesson-2.md) 
- [Lesson 3: Layer Management with Knockout](lesson-3.md) 
- [Lesson 4: Place Search and Geocoding](lesson-4.md) 

---

# WorldWind Resources

* [Getting Started](./getting-started.html)
* [Simple Demo](./simple-demo.html)
* [Sample App](./sample-app.html)


# About
_WorldWind.Earth, WorldWindJS and the Explorer are personal projects of [Bruce Schubert](https://github.com/emxsys). 
I am a software engineer on the [NASA WorldWind](https://worldwind.arc.nasa.gov) 
team, but these projects are built and maintained in my spare time._
