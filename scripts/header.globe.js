window.addEventListener("load", initializeWorldWindow, false);

function initializeWorldWindow() {
    var wwd;
    try {
        wwd = new WorldWind.WorldWindow("worldwindow");
        wwd.canvas.style.backgroundColor = 'black';
        wwd.camera.fieldOfView *= wwd.canvas.clientHeight / wwd.canvas.clientWidth;
    } catch (e) {
        console.log(e);
        return;
    }
    var bmngLayer = new WorldWind.BMNGOneImageLayer();
    wwd.addLayer(bmngLayer);
    var starFieldLayer = new WorldWind.StarFieldLayer();
    wwd.addLayer(starFieldLayer);
    var atmosphereLayer = new WorldWind.AtmosphereLayer();
    wwd.addLayer(atmosphereLayer);
    var startCamera = {
        latitude: 0,
        longitude: -160,
        range: 9e6,
        heading: 45,
        tilt: 60,
    };
    var dollyCamera = {
        range: 25e6,
        tilt: 20,
    };
    var lookAt = new WorldWind.LookAt();
    var startTime = Date.now();
    var oneRotationDuration = 120000;
    var dollyDuration = 30000;

    function animate() {
        var now = Date.now();
        starFieldLayer.time = new Date(now);
        atmosphereLayer.time = new Date(now);
        var elapsedTime = now - startTime;
        var simulatedRotations = elapsedTime / oneRotationDuration;
        var simulatedRadians = 2 * Math.PI * simulatedRotations;
        var startLocation = new WorldWind.Location(startCamera.latitude, startCamera.longitude);
        lookAt.position = WorldWind.Location.greatCircleLocation(startLocation, startCamera.heading, simulatedRadians, new WorldWind.Position(0, 0, 0));
        lookAt.heading = Math.atan2(Math.tan(startCamera.heading * Math.PI / 180), Math.cos(simulatedRadians)) * 180 / Math.PI;
        var simulatedDolly = smoothstep(0, dollyDuration, elapsedTime);
        lookAt.range = mix(startCamera.range, dollyCamera.range, simulatedDolly);
        lookAt.tilt = mix(startCamera.tilt, dollyCamera.tilt, simulatedDolly);
        wwd.cameraFromLookAt(lookAt);
        wwd.redraw();
        requestAnimationFrame(animate);
    }

    function smoothstep(edge0, edge1, x) {
        var t = WorldWind.WWMath.clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
        return t * t * (3.0 - 2.0 * t);
    }

    function mix(x, y, a) {
        return x + (y - x) * a;
    }
    animate();
}
