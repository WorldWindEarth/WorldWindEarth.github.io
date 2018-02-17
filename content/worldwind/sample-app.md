---
date: 2018-01-22
title: Sample Application
menu:
  main:
    parent: worldwind
    identifier: worldwind/sample-app
    weight: 10
---
Here is a small, yet feature-rich Web WorldWind sample application. The JavaScript/HTML/CSS
code can be viewed and _edited_ right here on this web page courtesy of [JSBin](http://jsbin.com).
Click the JSBin menu headings to show/hide the code editor(s).

{{< iframe url="http://jsbin.com/nomafey/embed?output" >}}

This app is hosted in [JSBin](http://jsbin.com), the [Collaborative JavaScript Debugging App](https://github.com/jsbin/jsbin). 


### Overview
The concepts used here are the same ones employed in the actual [_Explorer_](http://explorer.worldwind.earth) web app.

#### Libraries
This web app uses the [Knockout](http://knockoutjs.com) library to manage the 
Model-View-View Model (MVVM) architecture. The [Bootstrap](http://getbootstrap.com)
library is used for the web layout and presentation. And, of course, the [WorldWind](https://worldwind.arc.nasa.gov/web)
library manages the _globe_ view. The [JQuery](http://jquery.com) library is used lightly for some
event handing in the menus.

##### HTML
```html
  <!-- Libraries -->
  <script src="https://code.jquery.com/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min.js"></script>
  <script src="https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/worldwind.min.js"></script>
```

### WorldWindow
The WorldWind library is initialized to a canvas object defined in the HTML.

```html
<canvas id="canvasOne" style="width: 100%; height: 100%; 
               background-color: rgb(36,74,101); 
               border:1px solid #000000;" data-bind="style: { cursor: dropIsArmed() ? 'crosshair' : 'default' }">
  Try Chrome or FireFox.
</canvas>
```

```javascript
// Attach the WorldWindow globe to the HTML5 canvas 
var wwd = new WorldWind.WorldWindow("canvasOne");
```

---

### Globe
The `GlobeViewModel` defines the application-defined logic for "picking" objects
on the globe. It contains the logic and event handlers for placing
markers on the globe with "click-drag" or "drag-and-drop" actions.

##### GlobeViewModel
```javascript
  // ------------------------------------
  // Define a view model for the globe
  // ------------------------------------
  function GlobeViewModel(wwd, markersViewModel) {
    var self = this;

    // Marker icons used in the marker palette 
    self.markerPalette = ko.observableArray([
      "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-red.png",
      "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-green.png",
      "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-blue.png",
      "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-orange.png",
      "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-teal.png",
      "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-purple.png",
      "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-white.png",
      "https://files.worldwind.arc.nasa.gov/artifactory/web/0.9.0/images/pushpins/castshadow-black.png"
    ]);
    // The currently selected marker icon 
    self.selectedMarkerImage = ko.observable(self.markerPalette()[0]);
    // Used for cursor style and click handling 
    self.dropIsArmed = ko.observable(false);
    //The dropCallback is supplied with the click position and the dropObject.
    self.dropCallback = null;
    // The object passed to the dropCallback 
    self.dropObject = null;

    /**
     * Adds a marker to the globe.
     */
    self.addMarker = function() {
      self.dropIsArmed(true);
      self.dropCallback = markersViewModel.dropMarkerCallback;
      self.dropObject = self.selectedMarkerImage();
    };

    // Invoke addMarker when an image is selected from the palette
    self.selectedMarkerImage.subscribe(self.addMarker);

    /**
     * Handles a click on the WorldWindow. If a "drop" action callback has been
     * defined, it invokes the function with the picked location.
     */
    self.handleClick = function(event) {
      if (!self.dropIsArmed()) {
        return;
      }
      var type = event.type,
        x, y,
        pickList,
        terrain;
      // Get the clicked window coords
      switch (type) {
        case 'click':
          x = event.clientX;
          y = event.clientY;
          break;
        case 'touchend':
          if (!event.changedTouches[0]) {
            return;
          }
          x = event.changedTouches[0].clientX;
          y = event.changedTouches[0].clientY;
          break;
      }
      if (self.dropCallback) {
        // Get all the picked items 
        pickList = wwd.pickTerrain(wwd.canvasCoordinates(x, y));
        // Terrain should be one of the items if the globe was clicked
        terrain = pickList.terrainObject();
        if (terrain) {
          self.dropCallback(terrain.position, self.dropObject);
        }
      }
      self.dropIsArmed(false);
      event.stopImmediatePropagation();
    };

    // Assign the click handler to the WorldWind
    wwd.addEventListener('click', function(event) {
      self.handleClick(event);
    });
  }
```

---

### Layers
The `LayersViewModel` manages the layers that are displayed on the globe. The 
layers are placed in a Knockout observable array for the view to present as a list.
Each `WorldWind.Layer`-based object is annotated with an observable `layerEnabled`
object to provide the view with the ability display and control the layer's 
visibility. 

##### LayersViewModel
```javascript
  // ------------------------------------
  // Define a view model for the layers
  // ------------------------------------
  function LayersViewModel(wwd) {
    var self = this;
    // WMS configurations for USGS WMS layers
    // See: https://basemap.nationalmap.gov/arcgis/rest/services/
    // See: https://services.nationalmap.gov/arcgis/rest/services/
    var usgsTopoCfg = {
        title: "USGS Topo Basemap",
        version: "1.3.0",
        service: "https://basemap.nationalmap.gov/arcgis/services/USGSTopo/MapServer/WmsServer?",
        layerNames: "0",
        sector: new WorldWind.Sector(-89.0, 89.0, -180, 180),
        levelZeroDelta: new WorldWind.Location(36,36),
        numLevels: 13,  // capabilites says 16, but really 13. limit to prevent requests for blank tiles
        format: "image/png",
        size: 256,
        coordinateSystem: "EPSG:4326", // optional
        styleNames: "" // (optional) A comma separated list of the styles to include 
      },
      usgsImageryTopoCfg = {
        title: "USGS Imagery Topo Basemap",
        version: "1.3.0",
        service: "https://basemap.nationalmap.gov/arcgis/services/USGSImageryTopo/MapServer/WmsServer?",
        layerNames: "0",
        sector: new WorldWind.Sector(-89.0, 89.0, -180, 180),
        levelZeroDelta: new WorldWind.Location(36, 36),
        numLevels: 12,
        format: "image/png",
        size: 256,
        coordinateSystem: "EPSG:4326", // optional
        styleNames: "" //A comma separated list of the styles
      },
      usgsContoursCfg = {
        title: "USGS Contour Lines Overlay",
        version: "1.3.0",
        service: "https://services.nationalmap.gov/arcgis/services/Contours/MapServer/WmsServer?",
        //layerNames: "1,2,4,5,7,8", // lines and labels: large scale, 50' and 100' respectively
        layerNames: "10,11,12,14,15,16,18,19", // lines and labels: large scale, 50' and 100' respectively
        sector: new WorldWind.Sector(18.915561901, 64.8750000000001, -160.544024274, -66.9502505149999),
        levelZeroDelta: new WorldWind.Location(36, 36),
        numLevels: 19,
        format: "image/png",
        size: 256,
        coordinateSystem: "EPSG:4326", // optional
        styleNames: "" //  A comma separated list of the styles
      };
    // Define our layers and layer options
    var layer,
      layerCfg = [{
        layer: new WorldWind.BMNGLayer(),
        enabled: true,
      }, {
        layer: new WorldWind.BMNGLandsatLayer(),
        enabled: true,
      }, {
        layer: new WorldWind.WmsLayer(usgsImageryTopoCfg),
        enabled: false,
        detailControl: 2.0,
        disableTransparentColor: true  // prevent white labels from being transparent
      }, {
        layer: new WorldWind.WmsLayer(usgsTopoCfg),
        enabled: false,
        disableTransparentColor: true  // prevent white labels from being transparent
      }, {
        layer: new WorldWind.BingAerialLayer(),
        enabled: false
      }, {
        layer: new WorldWind.BingAerialWithLabelsLayer(),
        enabled: true
      }, {
        layer: new WorldWind.BingRoadsLayer(),
        enabled: false
      }, {
        layer: new WorldWind.WmsLayer(usgsContoursCfg),
        enabled: false,
        opacity: 0.85
      }, {
        layer: new WorldWind.RenderableLayer("Markers"),
        enabled: true,
      }, {
        layer: new WorldWind.CompassLayer(),
        enabled: true
      }, {
        layer: new WorldWind.CoordinatesDisplayLayer(wwd),
        enabled: true
      }, {
        layer: new WorldWind.ViewControlsLayer(wwd),
        enabled: true,
        // Override the default placement from bottom-left to top-left
        // Leave room at the top for the Coordinates output
        placement: new WorldWind.Offset(
          WorldWind.OFFSET_FRACTION, 0,
          WorldWind.OFFSET_FRACTION, 1),
        alignment: new WorldWind.Offset(
          WorldWind.OFFSET_PIXELS, -10,
          WorldWind.OFFSET_INSET_PIXELS, -18)
      }];

    // Apply the layer options and add the layers to the globe
    for (var i = 0; i < layerCfg.length; i++) {
      layer = layerCfg[i].layer;
      layer.enabled = layerCfg[i].enabled;
      layer.opacity = layerCfg[i].opacity ? layerCfg[i].opacity : 1.0;
      if (layerCfg[i].placement) {
        layer.placement = layerCfg[i].placement;
      }
      if (layerCfg[i].alignment) {
        layer.alignment = layerCfg[i].alignment;
      }
      if (layerCfg[i].disableTransparentColor) {
        layer.urlBuilder.transparent = false;
      }
      if (layerCfg[i].detailControl) {
        layer.detailControl = layerCfg[i].detailControl;
      }
      // Set the layer's view model properties
      layer.layerEnabled = ko.observable(layer.enabled);
      // Add the layer to the globe
      wwd.addLayer(layer);
    }

    // The layers collection view model
    self.layers = ko.observableArray(wwd.layers);

    // Layer item click handler
    self.toggleLayer = function(layer) {
      layer.enabled = !layer.enabled;
      layer.layerEnabled(layer.enabled); // view model
      wwd.redraw();
    };
  }
```

##### Layers View
```html
<!-- Layers tab -->
<div id="layers" class="tab-pane" role="tabpanel">
  <div class="section-heading">
    <h4 class="sub-header">
      <span class="glyphicon glyphicon-list" aria-hidden="true" style="padding-right:5px;"></span>
      Layers 
      <a class="section-toggle" data-toggle="collapse" href="#layers-body">
      </a>
    </h4>
  </div>
  <div id="layers-body" class="section-body collapse in">
    <!-- layer buttons bound to 'layers' observableArray -->
    <!-- the button's active class is bound to 'layerEnabled' observable -->
    <div class="list-group" data-bind="foreach: layers">
      <button class="list-group-item btn btn-block" data-bind="click: $root.toggleLayer, css: {active: $data.layerEnabled}">
        <span data-bind="text: $data.displayName"></span>
      </button>
    </div>
  </div>
</div>
<!-- /Layer -->
```

---

### Projections
The `ProjectionsViewModel` provides an observable list of map projection names used
in the view's menu. It also contains a `changeProjection` function that changes
the WorldWind `Globe` object's projection based on the user selection.

##### ProjectionsViewModel
```javascript
  // -----------------------------------------
  // Define a view model for the projections
  // -----------------------------------------
  function ProjectionsViewModel(wwd) {
    var self = this;
    self.projections = ko.observableArray([
      "3D",
      "Equirectangular",
      "Mercator",
      "North Polar",
      "South Polar",
      "North UPS",
      "South UPS",
      "North Gnomonic",
      "South Gnomonic"
    ]);
    // Projection support vars
    self.roundGlobe = wwd.globe;
    self.flatGlobe = null;
    // Track the current projection
    self.currentProjection = ko.observable('3D');
    // Projection click handler
    self.changeProjection = function(projectionName) {
      // Capture the selection
      self.currentProjection(projectionName);
      // Change the projection
      if (projectionName === "3D") {
        if (!self.roundGlobe) {
          self.roundGlobe = new WorldWind.Globe(new WorldWind.EarthElevationModel());
        }
        if (wwd.globe !== self.roundGlobe) {
          wwd.globe = self.roundGlobe;
        }
      } else {
        if (!self.flatGlobe) {
          self.flatGlobe = new WorldWind.Globe2D();
        }
        if (projectionName === "Equirectangular") {
          self.flatGlobe.projection = new WorldWind.ProjectionEquirectangular();
        } else if (projectionName === "Mercator") {
          self.flatGlobe.projection = new WorldWind.ProjectionMercator();
        } else if (projectionName === "North Polar") {
          self.flatGlobe.projection = new WorldWind.ProjectionPolarEquidistant("North");
        } else if (projectionName === "South Polar") {
          self.flatGlobe.projection = new WorldWind.ProjectionPolarEquidistant("South");
        } else if (projectionName === "North UPS") {
          self.flatGlobe.projection = new WorldWind.ProjectionUPS("North");
        } else if (projectionName === "South UPS") {
          self.flatGlobe.projection = new WorldWind.ProjectionUPS("South");
        } else if (projectionName === "North Gnomonic") {
          self.flatGlobe.projection = new WorldWind.ProjectionGnomonic("North");
        } else if (projectionName === "South Gnomonic") {
          self.flatGlobe.projection = new WorldWind.ProjectionGnomonic("South");
        }
        if (wwd.globe !== self.flatGlobe) {
          wwd.globe = self.flatGlobe;
        }
      }
      wwd.redraw();
    };
  }
```

##### Projections View
```html
<ul class="nav navbar-nav navbar-right">
  <!-- Projections dropdown -->
  <li id="projections" class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span data-bind="text: currentProjection"></span> <span class="caret"></span></a>
    <!-- Bind the list to the 'projections' observableArray -->
    <ul id="projections-menu" class="dropdown-menu" data-bind="foreach: $root.projections">
      <li data-bind="click: $root.changeProjection">
        <a><span data-bind="text: $data"></a>
      </li>
    </ul>
  </li>
</ul>
```

---

### Search
The `SearchViewModel` manages the view's access to a WorldWind geocoder and
WorldWind "goto" animator.

##### SearchViewModel
```javascript
// ---------------------------------------
// Define the view model for the SearchBox
// ---------------------------------------
function SearchViewModel(wwd) {
  var self = this;
  self.geocoder = new WorldWind.NominatimGeocoder();
  self.goToAnimator = new WorldWind.GoToAnimator(wwd);
  self.searchText = ko.observable('');
  self.onEnter = function(data, event) {
    if (event.keyCode === 13) {
      self.performSearch();
    }
    return true;
  };
  self.performSearch = function() {
    var queryString = self.searchText();
    if (queryString) {
      var latitude, longitude;
      if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
        var tokens = queryString.split(",");
        latitude = parseFloat(tokens[0]);
        longitude = parseFloat(tokens[1]);
        self.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
      } else {
        self.geocoder.lookup(queryString, function(geocoder, result) {
          if (result.length > 0) {
            latitude = parseFloat(result[0].lat);
            longitude = parseFloat(result[0].lon);
            self.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
          }
        });
      }
    }
  };
}
```
##### Search View
```html
<!-- Search Box -->
<form id="search" class="navbar-form navbar-left" role="search">
  <div class="form-group">
    <input type="text" class="form-control" placeholder="Destination" id="searchText" data-bind="value: searchText, valueUpdate: 'keyup', event: {keypress: onEnter}" />
  </div>
  <button id="searchButton" class="btn btn-primary" type="submit" data-bind="click: $root.performSearch">Go To</button>
</form>
```
---


### Markers
The `MarkersViewModel` manages the creation, editing and removal of WorldWind
`Placemark`-based marker objects. This object is passed into the `GlobeViewModel` 
which handles the globe's picking, clicking and dragging of markers. 

##### MarkersViewModel
```javascript

  // -------------------------------------
  // Define a view model for the markers
  // -------------------------------------
  function MarkersViewModel(wwd) {
    var self = this,
      MARKER_LAYER = 9;

    self.markers = ko.observableArray();

    // Set up the common placemark attributes.
    self.commonAttributes = new WorldWind.PlacemarkAttributes(null);
    self.commonAttributes.imageScale = 1;
    self.commonAttributes.imageOffset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.3,
      WorldWind.OFFSET_FRACTION, 0.0);
    self.commonAttributes.imageColor = WorldWind.Color.WHITE;
    self.commonAttributes.labelAttributes.offset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION, 0.5,
      WorldWind.OFFSET_FRACTION, 1.0);
    self.commonAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
    self.commonAttributes.drawLeaderLine = true;
    self.commonAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;

    /** "Drop" action callback creates and adds a marker to the globe */
    self.dropMarkerCallback = function(position, imageSource) {
      var attributes = new WorldWind.PlacemarkAttributes(self.commonAttributes),
        placemark = new WorldWind.Placemark(position, true, attributes);

      // Set the placemark properties and  attributes
      placemark.label = "Lat " + position.latitude.toPrecision(4).toString() + "\n" + "Lon " + position.longitude.toPrecision(5).toString();
      placemark.altitudeMode = WorldWind.CLAMP_TO_GROUND;
      placemark.eyeDistanceScalingThreshold = 2500000;
      attributes.imageSource = imageSource;

      // Add the placemark to the layer and to the observable array
      wwd.layers[MARKER_LAYER].addRenderable(placemark);
      self.markers.push(placemark);
    };

    /** Animator used to programmatically move the globe to a marker */
    self.goToAnimator = new WorldWind.GoToAnimator(wwd);

    /** "Goto" function centers the globe on a selected marker */
    self.gotoMarker = function(marker) {
      self.goToAnimator.goTo(new WorldWind.Location(
        marker.position.latitude,
        marker.position.longitude));
    };

    /** "Edit" function invokes a modal dialog to edit the marker attributes */
    self.editMarker = function(marker) {
      // TODO bind marker to dialog, maybe create an individual marker view-model
    };

    /** "Remove" function removes a marker from the globe */
    self.removeMarker = function(marker) {
      var markerLayer = wwd.layers[MARKER_LAYER],
        i, max, placemark;

      // Find and remove the marker from the layer and the observable array
      for (i = 0, max = self.markers().length; i < max; i++) {
        placemark = markerLayer.renderables[i];
        if (placemark === marker) {
          markerLayer.renderables.splice(i, 1);
          self.markers.remove(marker);
          break;
        }
      }
    };
  }
```
##### Markers View
```html
<!-- Markers tab -->
<div id="markers" class="tab-pane" role="tabpanel">
  <div class="section-heading">
    <h4 class="sub-header">
      <span class="glyphicon glyphicon-map-marker" aria-hidden="true" 
            style="padding-right:5px;"></span>
      Markers
      <a class="section-toggle" data-toggle="collapse" href="#markers-body"></a>
    </h4>
  </div>
  <div id="markers-body" class="section-body collapse in">
    <!-- Bind the list to the 'markers' observableArray -->
    <ul id="markers-list" data-bind="foreach: $root.markers">
      <div class="btn-group btn-block btn-group-sm">
        <!-- Goto Button -->
        <button type="button" class="btn btn-default" data-bind="click: $root.gotoMarker">
          <span><img width="16px" height="16px" data-bind="attr:{src: $data.attributes.imageSource}" />  </span>
          <span data-bind="text: $data.label"></span>
        </button>
        <!-- Edit Button -->
        <button type="button" class="btn btn-default glyphicon glyphicon-pencil" data-bind="click: $root.editMarker"></button>
        <!-- Delete Button -->
        <button type="button" class="btn btn-default glyphicon glyphicon-trash" data-bind="click: $root.removeMarker"></button>
      </div>
    </ul>
  </div>
</div>
<!-- /Markers -->
```