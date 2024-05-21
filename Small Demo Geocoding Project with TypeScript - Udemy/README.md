# Small Demo Geocoding Project with Nominatim 

## Description
This project is a small demonstration of geocoding functionality implemented in TypeScript. It was created as part of an exercise during the Udemy course "Understanding TypeScript." The purpose of this project is to practice and showcase some of the newly acquired knowledge in TypeScript and Axios by allowing users to enter an address and displaying its location on a map.
The origin exercise was with Google API, but for the GitHub version I use Nominatim and Leaflet.

## Features
1. User can enter an address to search.
2. The application uses the Nominatim API to convert the address into geographical coordinates (latitude and longitude).
3. The coordinates are used to display a map centered on the given address using Leaflet.
4. A marker is placed on the map at the location of the address with a popup showing the address details.
5. The application handles partial address entries gracefully, providing the full address information when its available. For example, entering "npmg" will display the full address "НПМГ Акад. Любомир Чакалов, bul. Nikola Y. Vaptsarov, кв. Лозенец, Lozenets, Sofia, Sofia City, Sofia-City, 1406, Bulgaria".

## Technologies Used
1. TypeScript
2. HTML
3. CSS
4. Webpack
5. Axios
6. Leaflet

## Usage
1. Enter an address in the input field.
2. Click on the "SEARCH ADDRESS" button.
3. The map will update to show the location of the entered address, and a marker will be placed on the map.

## Installation
To set up this project locally, follow these steps:

1. Clone this repository
2. Install dependencies:
npm install
3. Start the development server:
npm start


## Credits
This project was created as part of the "Understanding TypeScript" course on Udemy.