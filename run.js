var map = L.map('map').setView([55.8642, -4.2518], 13);

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=00YqDDUyaZm9n0nIsD3X', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);

const distanceBox = document.querySelector('#distanceResult');
let start = null;
let path = null;
let accumulatedDistance = 0;
let currentMarker = null;

const HIGH_ACCURACY = true;
const MAX_CACHE_AGE_MILLISECOND = 30000;
const MAX_NEW_POSITION_MILLISECOND = 5000;

const trackOptions = {
    enableHighAccuracy: HIGH_ACCURACY,
    maximumAge: MAX_CACHE_AGE_MILLISECOND,
    timeout: MAX_NEW_POSITION_MILLISECOND,
};


const startTracking = () => {
    if(!navigator.geolocation) {
        alert('Geo location is not available on this device');
    } else {
        console.log('Locating ...');
        distanceBox.textContent = '0.000';

        return navigator.geolocation.watchPosition(success, error, trackOptions);
    }
}

const updateMap = (event) => {

    const { latitude, longitude, timestamp, accuracy, altitude, altitudeAccuracy, heading, speed } = event.detail;

    report(`2. Received lat: ${latitude} | lng: ${longitude} | accuracy: ${accuracy} | altitude: ${altitude} 
    | altitudeAccuracy ${altitudeAccuracy} | heading: ${heading} | speed: ${speed} | timestamp: ${timestamp}`);

    drawNewSegment(event.detail)
        .then((detail) => drawNewMarker(detail))
        .then((detail) => updateDistance(detail))
}

const drawNewSegment = (detail) => {
    const { latitude, longitude } = detail;

    return new Promise((resolve) => {
        if (path == null) {

            path = L.polyline([
                [ latitude, longitude ],
            ], {
                color: '#fbc531',
                bubblingMouseEvents: true
            }).addTo(map);

            map.setView([latitude, longitude], 15)
            map.fitBounds(path.getBounds());

        } else {

            if (start === true) {

                path._latlngs.push([latitude, longitude]);
                path.redraw();

            }
        }

        return resolve(detail);
    })
}

const drawNewMarker = (detail) => {
    const { latitude, longitude, timestamp } = detail;

    return new Promise((resolve) => {

        if (!start) return (resolve(detail))

        if (currentMarker === null) {
            const marker = L.marker([55.8642, -4.2518]).addTo(map);
            marker.bindPopup(`<b>Start at ${timestamp}</b>`);

            currentMarker = L.marker([latitude, longitude]).addTo(map);
        } else {
            currentMarker.bindPopup(`Current at ${timestamp}`)
            currentMarker.setLatLng(new L.LatLng(latitude, longitude));
        }

        return resolve(detail);
    })
}

const updateDistance = (detail) => {
    return new Promise((resolve) => {

        if (path == null) return resolve(detail);

        if (!start) return resolve(detail);

        const delta = calculation(path._latlngs)
        accumulatedDistance += delta;

        const formattedDistance = (round(accumulatedDistance, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })
        distanceBox.textContent = formattedDistance;
        report(`3. Updated path with ${delta} km | accumulatedDistance = ${formattedDistance}`);

        return resolve(detail);
    })
}

const success = (position) => {
    const { latitude, longitude } = position.coords;
    const timestamp = (new Date(Date.now())).toISOString();

    report( `1. Detected at ${timestamp}`);

    createNewEvent(latitude, longitude, timestamp);
}

const error = (err) => report(`Unable to retrieve your location! ${err.code} - ${err.message}`);

const report = (message) => console.log(`<br /> ${message}`) ;
document.getElementById("consoleLog").style.display = "none";

const createNewEvent = (latitude, longitude, timestamp) => {
    const geoEvent = new CustomEvent("GEO_EVENT", {
        detail: {
            latitude,
            longitude,
            timestamp,
        },
        bubbles: true,
        cancelable: true,
        composed: false,
    });
    document.querySelector("#map").dispatchEvent(geoEvent);
}

const toggle = () => {
    if (start === null) {
        start = true;
        startTracking();
    } else {
        start = !start;
    }
}

const calculation = (track) => {
    // Ignore the first object in the path array
    if (track.length >= 3) {
        const newIndex = track.length - 1;
        const newLatLng = track[newIndex];
        const lastLatLng = track[newIndex - 1];
        const latitude = 0;
        const longitude = 1;
        return distance(newLatLng[latitude], newLatLng[longitude], lastLatLng[latitude], lastLatLng[longitude], 'K');
    } else {
        return 0;
    }
}

const round = (num, places) => {
    return +(parseFloat(num).toFixed(places));
}

document.querySelector("#map")
    .addEventListener("GEO_EVENT", updateMap);

//:: This function was taken from https://www.geodatasource.com  to calculates the distance between two points
function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit==="K") { dist = dist * 1.609344 }
        if (unit==="N") { dist = dist * 0.8684 }
        return dist;
    }
}
