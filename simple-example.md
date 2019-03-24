## Simple Example

This is how to use a `WorldWind.WorldWindow` object.

```javascript
// Register an event listener to be called when the page is loaded.
window.addEventListener("load", eventWindowLoaded, false);

// Define the event listener to initialize Web WorldWind.
function eventWindowLoaded() {
    // Create a WorldWindow for the canvas.
    var wwd = new WorldWind.WorldWindow("canvasOne");

    // Add some image layers to the WorldWindow's globe.
    wwd.addLayer(new WorldWind.BMNGOneImageLayer());
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());

    // Add a compass, a coordinates display and some view controls to the WorldWindow.
    wwd.addLayer(new WorldWind.CompassLayer());
    wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
    wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));
}
```


This is how to embed a WorldWind into an HTML web page

```html
<!DOCTYPE html>
<!-- This is a very simple example of using Web WorldWind. -->
<html>

  <head lang="en">
    <meta charset="UTF-8">
    <title>WorldWind Example</title>
      
    <!-- Include the Web WorldWind library. -->
    <script src="https://unpkg.com/@nasaworldwind/worldwind@0.9.0/build/dist/worldwind.min.js" type="text/javascript"></script>
        
    <!--  Or, include the WorldWindJS library. -->
    <!-- <script src="https://unpkg.com/worldwindjs@1.7.0/build/dist/worldwind.min.js" type="text/javascript"></script> -->
  
  </head>

  <body>
    <div id="globe" style="width: 100vw; height: 100vh; position: absolute; top: 0px; left: 0px;">
      <!-- Create a canvas for Web WorldWind. -->
      <canvas id="canvasOne" style="width: 100%; height: 100%; 
                        background-color: rgb(36,74,101);">
        Your browser does not support HTML5 Canvas.
      </canvas>
    </div>
    <script>
      // Register an event listener to be called when the page is loaded.
      window.addEventListener("load", eventWindowLoaded, false);

      // Define the event listener to initialize Web WorldWind.
      function eventWindowLoaded() {
        // Create a WorldWindow for the canvas.
        var wwd = new WorldWind.WorldWindow("canvasOne");

        // Add some image layers to the WorldWindow's globe.
        wwd.addLayer(new WorldWind.BMNGOneImageLayer());
        wwd.addLayer(new WorldWind.BMNGLandsatLayer());

        // Add a compass, a coordinates display and some view controls to the WorldWindow.
        wwd.addLayer(new WorldWind.CompassLayer());
        wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
        wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));
      }

    </script>
  </body>

</html>
```

