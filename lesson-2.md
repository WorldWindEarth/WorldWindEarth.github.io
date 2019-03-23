# How to Build a WorldWindJS Web App

## Lesson 2: WorldWind Globe 
- Add the WorldWind library
- Create a Globe class to encapsulate the WorldWindow object
- Add a globe to the application
- Add layers to the globe

In a hurry? Here's the completed code: [Lesson 2](https://jsfiddle.net/emxsys/7x6vcf78/)

### Include the WorldWindJS library

We will use a release of WorldWindJS library hosted on GitHub. Add this line of 
code to the list of JavaScript scripts at the bottom of your web page:
```html
<script src="https://github.com/emxsys/worldwindjs/releases/download/v1.5.90/worldwind.min.js"></script>
```

### Create the Globe class

Now we will create a Globe class to encapsulate the 
[WorldWindow](https://nasaworldwind.github.io/WebWorldWind/WorldWindow.html) 
object (wwd). 

In our web app we will be using layer _categories_ to act on subsets of the
`WorldWindow.layers`. We add layers to the `WorldWindow` via the `Globe.addLayer` 
function to assign a category and to update the layer's properties via a 
convenient _options_ object.
 
Copy the following block of JavaScript to the __app.js__ file.
###### JavaScript
```javascript
/**
 * The Globe encapsulates the WorldWindow object (wwd) and provides application
 * specific logic for interacting with layers.
 * @param {String} canvasId The ID of the canvas element that will host the globe
 * @returns {Globe}
 */
class Globe {
  constructor(canvasId) {
    // Create a WorldWindow globe on the specified HTML5 canvas
    this.wwd = new WorldWind.WorldWindow(canvasId);

    // Holds the next unique id to be assigned to a layer
    this.nextLayerId = 1;

    // Add a BMNGOneImageLayer background layer. We're overriding the default 
    // minimum altitude of the BMNGOneImageLayer so this layer always available.
    this.addLayer(new WorldWind.BMNGOneImageLayer(), {
      category: "background",
      minActiveAltitude: 0
    });
  }

  /**
   * Adds a layer to the globe. Applies the optional options' properties to the
   * layer, and assigns the layer a unique ID and category.
   * @param {WorldWind.Layer} layer
   * @param {Object|null} options E.g., {category: "base", enabled: true}
   */
  addLayer(layer, options) {
    // Copy all properties defined on the options object to the layer
    if (options) {
      for (let prop in options) {
        if (!options.hasOwnProperty(prop)) {
          continue; // skip inherited props
        }
        layer[prop] = options[prop];
      }
    }
    // Assign a default category property if not already assigned
    if (typeof layer.category === 'undefined') {
      layer.category = 'overlay'; // the default category
    }

    // Assign a unique layer ID to ease layer management 
    layer.uniqueId = this.nextLayerId++;

    // Add the layer to the globe
    this.wwd.addLayer(layer);
  }

    /**
     * Returns a new array of layers in the given category.
     * @param {String} category E.g., "base", "overlay" or "setting".
     * @returns {Array}
     */
  getLayers(category) {
    return this.wwd.layers.filter(layer => layer.category === category);
  }
}
```

Now you create a `Globe` object with it's underlying `WorldWindow` like this: 
```javascript
  let globe = new Globe("globe-canvas");
```
where "globe-canvas" is the name of a `<canvas/>` element in your HTML.


### Create the globe and add layers

Now we will create a `Globe` object and add some layers to the globe. Some of the 
WorldWind layers require a `WorldWindow` object in their constructors (globe.wwd).
This is one of the few cases where we access the `wwd` property outside of the 
`Globe` class.

Copy this block of JavaScript code the __app.js__ file and paste it below the
`Globe` class declaration.

###### JavaScript

```javascript
  // Create a globe
  let globe = new Globe("globe-canvas");

  // Add layers to the globe 
  globe.addLayer(new WorldWind.BMNGLayer(), {
    category: "base"
  });
  globe.addLayer(new WorldWind.CoordinatesDisplayLayer(globe.wwd), {
    category: "setting"
  });
  globe.addLayer(new WorldWind.ViewControlsLayer(globe.wwd), {
    category: "setting"
  });
  globe.addLayer(new WorldWind.CompassLayer(), {
    category: "setting",
  });
```
---

## Summary

At this stage you have a functioning globe in the web app that responds to mouse
and touch input.

- The `Globe` class encapsulates the `WorldWindow` and contains the application 
logic for managing layers. It creates a globe with a _background_ layer.
- The `Globe.addLayer` function is used to add layers to the globe and set the
layer's category and other layer properties. Layer are rendered in the order
that they are added to the globe, from first to last.

Here's the complete code for lesson 2: a web app prototype with a functioning 
globe and layers.

<iframe width="100%" height="700" src="//jsfiddle.net/emxsys/7x6vcf78/embedded/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

---

### Next Steps
- [Home](index.md) 
- [Lesson 1: HTML with Bootstrap](lesson-1.md) 
- [Lesson 2: WorldWind Globe](lesson-2.md) 
- [Lesson 3: Layer Management with Knockout](lesson-3.md) 
- [Lesson 4: Place Search and Geocoding](lesson-4.md) 

