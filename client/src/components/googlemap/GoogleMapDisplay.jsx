import { useEffect, useRef, useState } from "react";
const loadGoogleMapsScript = (callback) => {
  if (window.google && window.google.maps && window.google.maps.places) {
    callback();
    return;
  }
  const existingScript = document.getElementById("googleMaps");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://maps.gomaps.pro/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.id = "googleMaps";
    document.body.appendChild(script);
    script.onload = () => {
      callback();
    };
  } else {
    existingScript.onload = () => {
      callback();
    };
  }
};

const GoogleMapDisplay = () => {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const mapInstance = useRef(null);
  const directionsRenderer = useRef(null);
  const directionsService = useRef(null);
  const markerCurrentLocation = useRef(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    loadGoogleMapsScript(() => {
      if (!mapRef.current) return;

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.7128, lng: -74.006 },
        zoom: 12,
      });

      directionsService.current = new window.google.maps.DirectionsService();
      directionsRenderer.current = new window.google.maps.DirectionsRenderer();
      directionsRenderer.current.setMap(mapInstance.current);

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        fields: ["geometry", "name"],
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            mapInstance.current.setCenter(pos);
            mapInstance.current.setZoom(14);

            if (markerCurrentLocation.current) {
              markerCurrentLocation.current.setPosition(pos);
            } else {
              markerCurrentLocation.current = new window.google.maps.Marker({
                position: pos,
                map: mapInstance.current,
                title: "Your location",
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: "#4285F4",
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: "white",
                },
              });
            }
          },
          () => alert("Error: The Geolocation service failed.")
        );
      } else {
        alert("Error: Your browser doesn't support geolocation.");
      }

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          alert("No details available for the selected place.");
          return;
        }

        if (!markerCurrentLocation.current) {
          alert("Current location not available yet.");
          return;
        }

        const origin = markerCurrentLocation.current.getPosition();
        const destination = place.geometry.location;

        directionsService.current.route(
          {
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK") {
              directionsRenderer.current.setDirections(result);
              const leg = result.routes[0].legs[0];
              setDistance(leg.distance.text);

              mapInstance.current.fitBounds(result.routes[0].bounds);
            } else {
              alert("Directions request failed due to " + status);
            }
          }
        );
      });
    });
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search a place"
        ref={inputRef}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "12px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <div
        ref={mapRef}
        style={{ width: "100%", height: "400px", borderRadius: "8px" }}
      />
      {distance && (
        <p style={{ marginTop: "10px", fontSize: "18px" }}>
          Distance: <strong>{distance}</strong>
        </p>
      )}
    </div>
  );
};

export default GoogleMapDisplay;
