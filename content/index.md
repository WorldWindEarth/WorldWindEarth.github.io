---
date: 2018-02-17
title: index
type: index
---
# WorldWind Earth
{{< gallery image="banner.jpg" title="Mt. Rainier" alt="Picture of Mount Rainier" >}}
{{< gallery image="sunset.jpg" addclass="hidden" >}}
{{< gallery image="screenshot1.jpg" addclass="hidden" >}}
{{< gallery image="screenshot2.jpg" addclass="hidden" >}}
{{< gallery image="screenshot3.jpg" addclass="hidden" >}}
{{< gallery image="screenshot4.jpg" addclass="hidden" >}}

This site is the home for  _WorldWind Explorer_ webapp documentation and 
other ESA-NASA _Web WorldWind_ programming resources.

## WorldWind Explorer Project
The __Explorer__ is an HTML5/JavaScript geo-browser 
_[powered by ESA-NASA Web WorldWind](https://worldwind.arc.nasa.gov/web)_ and the Knockout and Bootstrap libraries. 
It is implemented as a single-page web application (SPA) using JQuery to dynamically load content.

## Overview
The WorldWind Explorer is a geospatial web application for visualizing Earth. 
It uses ESA-NASA's Web WorldWind JavaScript SDK to display a 3D globe with terrain and 
imagery as well as 2D maps. It displays the sunrise and sunset times and solar angles
for any point on the earth. It shows the terrain's aspect and slope for any 
location. It features user-defined markers and point weather forecasts.
It has a search feature to find places.

### Features

- Pre-configured imagery and map layers
- Ability to add external WMS map servers for additional imagery
- Layers can be sorted and opacity can be adjusted
- A day/night and atmosphere layer for realistic visual effects
- Shareable bookmark URLs that can be pasted into emails or saved in your browser
- Search box to goto a location 
- Automatic time zone detection
- Keyboard controls to pan, zoom and reset the globe
- Markers that can be dragged and dropped on the globe
- Weather Scouts that can be placed on the globe to obtain point weather forecasts from the National Weather Service (US-only)
- Time widget that shows current time at the crosshairs plus sunrise, sunset and solar hour
- Location widget that shows the coordinates and elevation at the crosshairs, plus the slope and aspect of the terrain and the solar azimuth angle
- Collapsible layer manager and output/info panels
- A time slider and controls to advance and retard the time used for day/night display and weather forecasts 
- Setting are saved between sessions
- Mobile/responsive layout

## Feedback
Please report issues, feature requests and questions in the Explorer's 
[Issue Tracker on GitHub](https://github.com/NASAWorldWindResearch/WorldWindExplorer/issues).

If you are a developer, pull requests are welcomed.

## Open Source Credits
The Explorer uses the following open source libraries and technologies:

- [ESA-NASA WorldWind](https://worldwind.arc.nasa.gov/web) provides the 3D virtual globe
- [Knockout](http://knockoutjs.com) provides the Model-View-View Model (MVVM) architecture
- [Bootstrap](https://getbootstrap.com/docs/3.3/) provides the responsive styling
- [JQuery](https://jquery.com/) is used to dynamically load DOM view fragments
- [JQuery UI](https://jqueryui.com/) adds some UI elements
- [Dragula](https://github.com/bevacqua/dragula) adds drag-n-drop support
- [SplitJS](https://nathancahill.github.io/Split.js/) adds window splitters to the main layout
- [Vis](http://visjs.org/) provides data visualizations
- [milsymbol](https://spatialillusions.com/milsymbol/index.html) military symbology made easy
- [Moment](https://momentjs.com/) provides date/time parsing and manipulation
- [RequireJS](http://requirejs.org/) is a JavaScript file and module loader used improve the speed and quality of the code.


## About
_WorldWind.Earth and the Explorer are personal projects of [Bruce Schubert](https://github.com/emxsys). 
I am a software engineer on the [NASA WorldWind](https://worldwind.arc.nasa.gov) 
team, but these projects are built and maintained in my spare time._
