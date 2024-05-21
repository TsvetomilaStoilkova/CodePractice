import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

let map: any;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value.trim();

  if (!enteredAddress) {
    alert("Please enter an address.");
    return;
  }

  const NOMINATIM_API_URL = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    enteredAddress
  )}&format=json&addressdetails=1&limit=1`;

  axios
    .get(NOMINATIM_API_URL)
    .then((response) => {
      const data = response.data;
      const mapElement = document.getElementById("map")!;

      if (data.length > 0) {
        const result = data[0];
        const lat = result.lat;
        const lon = result.lon;

        const mapContainer = document.getElementById("mapContainer")!;
        mapContainer.innerHTML = ""; 

        if (map) {
          map.remove();
        }

        map = L.map("mapContainer").setView([lat, lon], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([lat, lon])
          .addTo(map)
          .bindPopup(result.display_name)
          .openPopup();

        mapElement.innerHTML = `
          <h3>Results:</h3>
          <p><strong>Address:</strong> ${result.display_name}</p>
          <p><strong>Latitude:</strong> ${lat}</p>
          <p><strong>Longitude:</strong> ${lon}</p>
        `;
      } else {
        mapElement.innerHTML = "<p>No results found</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("map")!.innerHTML = "<p>Error fetching data</p>";
    });
}

form.addEventListener("submit", searchAddressHandler);
