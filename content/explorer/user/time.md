---
title: "Time"
date: 2018-01-19T05:25:20-08:00
menu:
  main:
    parent: user-guide
    identifier: /explorer/user/time
    weight: 10
---
The Explorer application maintains a central clock for all temporal data. When
the clock is updated all time-sensitive layers, widgets and visualizations are 
updated. The clock can be set to your computer's time, or you can set it to an 
arbitrary time, or it can be set to a temporal input, like a time-series layer.

## Time Display
The __Time Widget__ is not just a clock. It displays temporal data relative to 
the position of the crosshairs on the globe. As you pan the globe, the widget
updates the time values for the current location under the crosshairs.

{{< figure src="/images/TimeWidget.png" title="Time Widget" 
caption="The figure above shows the Time Widget displaying clock time, time zone offset, local solar hour, and sunrise and sunset." >}}

### Date/Time
- The application's date and time and time zone are displayed in the body of the widget
- The format of the date and time are controlled in the settings

### Solar Hour
- The sun icon that orbits the dial indicates the local solar hour angle. 
- Solar noon is at the top of the dial, and midnight is at the bottom. 
- When the sun icon is at the top of the dial, then the real sun is at its zenith. 
- To see it in action, either move the time slider, or zoom out on the globe and move the crosshairs in an easterly or westerly direction. 
- Note that the sun icon turns dark during nighttime hours.

### Sunrise/Sunset
- The sunrise and sunset times are displayed under the widget.
- The yellow and orange markers on the dial depict the solar hour angles for sunrise and sunset respectively. 
- The times are relative to the application date/time and the geographic position. 
- To see it in action, zoom out on the globe and then pan north and south to the poles, or rapidly advance the time slider.

## Time Controls

{{< figure src="/images/TimeControls.png" title="Time Controls" >}}
The figure above shows the globe's time controls.

- The _clock_ button resets the time to "now".
- The _forward_ and _backward_ buttons advance or retard the time one hour, respectively
- The _fast forward_ and _rewind_ buttons advance or retard the time 24 hours, respectively
- The _time slider_ is used to adjust the date and time. 


## Time Series
{{< figure src="/images/TimeSeriesPlayer.png" title="Time Series Player" >}}
The figure above shows the controls for a layer's time series.

Layers that contain time-based content manifest a set of controls in their layer settings.
These controls are used to select the time frame to display, and, when used, they
set the time for the entire application, including all other time series layers.

- The _play_ button starts an automated playback the time frames 
- The _forward_ and _backward_ buttons advance or retard the layer's time frame by one image, respectively
- The _repeat_ button, when enabled, causes the playback to restart at the beginning when it reaches the end of the time series
- The _time slider_ is used to select the time frame. 


