---
title: "Location"
date: 2018-01-19T05:25:20-08:00
menu:
  main:
    parent: user-guide
    identifier: /explorer/user/location
    weight: 10
---
The Explorer uses the position under the crosshairs for its current location.
Most of the geospatial information displayed in the Explorer is relative to this
position.

## Location Display
The __Location Widget__ is more than a simple compass. It displays spatial data 
centric to the position of the crosshairs.

{{< figure src="/images/LocationWidget.png" title="Location Widget" 
caption="The figure above shows Location Widget displaying coordinates, aspect, slope and solar azimuth.">}}

### Location
- The latitude, longitude, ground elevation and percent of slope are displayed for the point under the crosshairs.

### Compass
- The compass needle and compass rose rotate with your view of the globe and always point to true North.

### Inclinometer
- The sky/ground background is an inclinometer that rotates to represent the slope of the terrain under the crosshairs. To see it in action, zoom in on the globe to see some elevation and then move the crosshairs across the terrain.

### Terrain Aspect
- The red diamond icon that orbits the compass indicates the aspect of the terrain under the crosshairs. Its position is relative to the compass points. To see it in action, zoom in on the globe to see a ridgeline and then move the crosshairs back and forth across the ridge.

### Solar Azimuth
- The sun icon that orbits the compass indicates the solar azimuth angle. Its position is relative to compass points. To see it in action, either move the time slider, or zoom out on the globe and move the crosshairs in an easterly or westerly direction. When the sun icon and aspect icon are coincident then the maximum solar radiation is received by the terrain at that point. Note that the sun icon turns dark during nighttime hours.

