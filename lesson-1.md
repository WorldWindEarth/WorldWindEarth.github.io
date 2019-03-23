# How to Build a WorldWindJS Web App

## Lesson 1: HTML with Bootstrap

- Create a responsive web app template for mobiles, tablets and desktops.
- Menus and panels for displaying content.
- Customizable, themes, CSS

In a hurry? Here's the completed code: [Lesson 1](https://jsfiddle.net/emxsys/wun3zg0c/)

### Prerequisites

Our web app will consist of three files. Create the following files in your 
favorite IDE or editor.

- index.html (the web page)
- custom.css (for custom CSS and overrides)
- app.js (JavaScript code)

If you want to start with one of the [Bootstrap Examples](http://getbootstrap.com/docs/4.0/examples/), 
you should check out this template: [Bootstrap Starter Template](https://getbootstrap.com/docs/4.0/examples/starter-template/)


### Dependencies 

We're going to create the basic web page structure. We'll include the CDN 
(content delivery network) links for the Bootstrap and Font Awesome CSS, plus
a link to our custom.css file. Also, we're adding the JavaScript CDN links 
for BootStrap and JQuery, a link to our app.js file. 

Copy/paste the following HTML into your web page.

###### HTML
```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <title>WorldWind Starter Template</title>

        <!-- Bootstrap 4.0 CSS compiled and minified -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
              integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

        <!-- Font Awesome icons (see: https://fontawesome.com/icons?d=gallery) -->
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" 
              integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">

        <!-- Custom styles and overrides -->
        <link href="custom.css" rel="stylesheet">
    </head>
    <body>

        <!-- JavaScript is placed at the end of the document so the page loads faster -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>    
        <script src="app.js"></script>    
    </body
</html>
```
 
The `<meta>` elements above are important for Bootstrap and must be included. 
You can add other `<meta>` elements like author, description, etc. Feel free to 
edit the `<title>`.


### NavBar: The Main Menu

Our web app uses a Bootstrap [Navbar](https://getbootstrap.com/docs/4.0/components/navbar/) 
component to create the main menu at the top of the page. The Navbar is responsive: 
it automatically adjusts its layout based on the page width. We'll go ahead add 
menu items all for the features that we will implement, including:

- Layer panel for managing the layers displayed on the globe
- Markers panel for managing markers placed on the globe
- Settings panel for configuring the WorldWind globe
- Search box for place name searches and geocoding
- Branding text and link

Copy the following block of HTML and paste it at the beginning of your page's `<body/>`
section:

###### HTML
```html
<nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">

  <!--Branding icon and text-->
  <a class="navbar-brand" href="https://worldwind.arc.nasa.gov/web target=_blank">
    <img src="images/nasa-logo_32.png" width="30" height="30" class="d-inline-block align-top" alt="">
    WorldWind
  </a>

  <!--Hamburger menu displayed on small screens/windows-->
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <!--Main menu content-->
  <div class="collapse navbar-collapse" id="main-menu">
    <ul class="navbar-nav mr-auto">
      <!--Layers-->
      <li class="nav-item">
        <a class="nav-link" data-toggle="collapse" href="#layers" role="button">
                <span class="fas fa-list" aria-hidden="true"></span>
                <span class="d-md-none d-lg-inline" aria-hidden="true">Layers</span>
        </a>
      </li>
      <!--Markers-->
      <li class="nav-item">
        <a class="nav-link" data-toggle="collapse" href="#markers" role="button">
                <span class="fas fa-map-marker-alt" aria-hidden="true"></span>
                <span class="d-md-none d-lg-inline" aria-hidden="true">Markers</span>
        </a>
      </li>
      <!--Settings-->
      <li class="nav-item">
        <a class="nav-link" data-toggle="collapse" href="#settings" role="button">
                <span class="fas fa-cog" aria-hidden="true"></span>
                <span class="d-md-none d-lg-inline" aria-hidden="true">Settings</span>
        </a>
      </li>
    </ul>
    <!--Search Box-->
    <div class="form-inline">
      <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success" data-toggle="modal" data-target="#preview">
            <span class="fas fa-search" aria-hidden="true"></span>
        </button>
    </div>
  </div>
</nav>
```

At this point you have a basic menu system. It doesn't do much yet, but it is
responsive. Check it out by opening your web page in a browser and then resize 
the browser and watch how the menu responds. Also open your browser's development 
tools and try out the page using the mobile emulation settings.

Feel free to change the branding text and link from _WorldWind_ to something
else. Also, you can also replace the `.navbar-dark` and `.bg-dark` with 
alternatives to change the style. The `.navbar-dark` and `.navbar-light` classes
control the Navbar's text color and the `.bg-*` classes control the Navbar's 
[background colors](https://getbootstrap.com/docs/4.0/utilities/colors/#background-color).


### Main Content

Now we'll add the elements that will host the globe, the layers, markers and 
settings panels, and the search preview modal. These elements won't have 
much to display at this stage, but they will be wired up to the menu system.

Copy the following block of HTML and paste it the below the closing `<nav/>` 
element. 

###### HTML
```html
<!-- Use container-fluid for 100% width and set padding to 0 -->
<main role="main" class="container-fluid p-0">
  <!-- Globe -->
  <div id="globe" class="worldwindow">
    <!--.d-block ensures the size is correct (prevents a scrollbar from appearing)-->
    <canvas id="globe-canvas" class="d-block"
            style="width: 100%; height: 100%; 
            background-color: rgb(36,74,101);">
        Try Chrome or FireFox.
    </canvas>   
  </div>

  <!--Panels-->
  <div class="worldwindow-overlay noninteractive w-100">
    <div class="card-columns">
      <!--Layers-->
      <div class="collapse" id="layers">
        <div class="card globe-card interactive">
          <div class="card-header">
            <h5 class="card-title">
              <span class="fas fa-list" aria-hidden="true"></span> Layers
              <button type="button" class="close pull-right" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button></h5>
          </div>
          <div class="card-body">
            <p class="card-text">Marker list goes here.</p>
          </div>
        </div>
      </div>
      <!--Markers-->
      <div class="collapse" id="markers">
        <div class="card globe-card interactive">
          <div class="card-header">
            <h5 class="card-title">
              <span class="fas fa-map-marker-alt" aria-hidden="true"></span> Markers
              <button type="button" class="close pull-right" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button></h5>
          </div>
          <div class="card-body">
            <p class="card-text">Marker list goes here.</p>
          </div>
        </div>
      </div>
      <!--Settings-->
      <div class="collapse" id="settings">
        <div class="card globe-card interactive">
          <div class="card-header">
            <h5 class="card-title">
              <span class="fas fa-cog" aria-hidden="true"></span> Settings
              <button type="button" class="close pull-right" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button></h5>
          </div>
          <div class="card-body">
            <p class="card-text">Settings go here.</p>
          </div>
        </div>
      </div>
    </div>

    <!--Search Preview Dialog-->
    <div id="preview" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Search Results</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
          </div>
          <div class="modal-body">
            <p>
              Search result go here
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Go to</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
</main>
```

Also copy/paste the following CSS into the custom.css file. This CSS adds some 
padding to the top of the `body` element so that children do not display under the 
Navbar. It also defines some custom CSS classes. 

###### CSS
```css
body {
  /*Account for the height of the navbar component*/
  padding-top: 3.5rem;
}

.worldwindow {
  width: 100%;
  height: calc(100vh - 3.5rem);
  background-color: black;
}

.worldwindow-overlay {
  position: absolute;
  width: 100%;
  top: 3.5rem;
}

/* Prevents an element, like a <div/> from consuming user input */
.noninteractive {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  pointer-events: none;
}

/* Allows an element to receive user input */
/* Useful if a parent element is using .noniteractive */
.interactive {
  -webkit-touch-callout: auto !important;
  -webkit-user-select: auto !important;
  -khtml-user-select: auto !important;
  -moz-user-select: auto !important;
  -ms-user-select: auto !important;
  -o-user-select: auto !important;
  pointer-events: auto !important;
}

```

Finally, copy/paste the following JavaScript into your app.js file. This code
adds an event handler make the main menu easier to work with on small screens,
and it adds a handler that closes panels when their close icon is clicked.

###### JavaScript
```javascript
$(document).ready(function() {
  "use strict";

  // Auto-collapse the main menu when its button items are clicked
  $('.navbar-collapse a[role="button"]').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Collapse card ancestors when the close icon is clicked
  $('.collapse .close').on('click', function() {
    $(this).closest('.collapse').collapse('hide');
  });
});
```

## Summary


At this stage you have a functioning prototype of the web app. The menu system is
functional and responsive:

- The Layers, Markers and Settings buttons open their respective panels
- The Search button opens the Preview modal dialog
- The `<canvas/>` element for the globe that is the full width of the page with
with a background color 
- The branding text opens a link to an external page

Here's the complete code for lesson 1: a web app prototype sans globe.

<iframe width="100%" height="300" src="//jsfiddle.net/emxsys/wun3zg0c/embedded/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Notes

Following are some explanations of the components used in the HTML. If you're not
interested you can skip ahead to [Lesson 2](lesson-2.md).

#### Full Width and Padding
The `<main/>` element, above, hosts main content of our web app. We want the 
element to be the full width of the page so we apply the Bootstrap `.container-fluid` 
class (versus `.container`) to the element. We also also override Bootstrap's 
default padding around the element by setting the padding to zero via `.p-0`, 
part of Bootstrap's [spacing utilities](https://getbootstrap.com/docs/4.0/utilities/spacing/). 
You can experiment with other padding options.


#### Cards: Panels for layers and settings

We'll use Bootstrap [Card](https://getbootstrap.com/docs/4.0/components/card/) 
components to host the WorldWind layers and settings content. Bootstrap includes 
a few options for laying out a series of cards. We'll use Masonry-like columns 
by wrapping them in `.card-columns`.

---

### Next Steps
- [Home](index.md) -
- [Lesson 1: HTML with Bootstrap](lesson-1.md) 
- [Lesson 2: WorldWind Globe](lesson-2.md) 
- [Lesson 3: Layer Management with Knockout](lesson-3.md) 
- [Lesson 4: Place Search and Geocoding](lesson-4.md) 
