---
title: "Layers"
date: 2018-01-19T05:25:20-08:00
menu:
  main:
    parent: User Guide
    identifier: /explorer/user/layers
    weight: 10
---
You can control what layers are overlaid on the globe's terrain, allowing you to
customize your view of the earth. Layers can be maps, imagery, markers, symbology 
and controls, or customized renderable content.

## Layer List

The Layer List allows you to control which layers are visible and the order in 
which the layers are drawn on the globe. Layers are categorized such that 
standardized rules can be applied to groups of layers.

- Click __Layers__ in the main menu to show or hide the layer list
- Click individual layers in the layer list to show or hide them on the globe
- Click the settings icon on an individual layer to open its __Layer Settings__ dialog
- Click the zoom+ icon on an individual layer to zoom to the geographic extents of the layer


### Layer Categories and Ordering

Layers categories are drawn in the following order: first the base map layer(s), followed by 
overlays and finally the data sets (markers, shapes, etc). Effects and widgets are drawn
according to their own rules. 

- __Base Maps__: Maps and/or imagery - these layers are drawn first - they are bottom-most layers on the globe
- __Overlays__: Weather charts, land classifications, boundaries, etc - these layers are drawn on top of the base layer(s)
- __Datasets__: Shapes, annotations and markers are on top of the maps and imagery
- __Effects__: Day/night, atmosphere, time zone detection
- __Widgets__: View controls, time and location widgets

You control the order in which the base maps and overlays are drawn within their category by dragging 
the layer to the desired position. This can me a very useful feature for creating your scene, 
especially when combined with setting the topmost layers' opacity (transparency).

## Layer Controls and Settings

Using the individual layer control and settings, you can set the opacity of a layer to make it 
translucent. This is very effective with the overlays, but it also can be useful with the base maps.
For instance, you can could configure a street map to draw on top of an aerial imagery layer and 
then make the street map translucent so that the underlying aerial imagery augments the display.

Open the __Layer Settings__ dialog to configure an individual layer. From this dialog you can:

- Set the layer's opacity to make it translucent or opaque
- Select an individual frame from a _time series_ layer 
- View a layer's legend
- Change the layer's position in the layer list 

## Adding Layers from a Server

Layers from external WMS servers can be added to the globe.  Enter the URL to a WMS server and click
the _Add Server_ button and the Explorer will query the server for its WMS layers. These layers will
be listed below the server's name.  When you check the checkbox of the individual layers in this 
list and they will be added to the __Overlays__ layer category.

