# Nicocktail


### About

Nicocktail is an web application build with Angular2 & Laravel during the class of web programming at Concordia University.

### Live Version

You can found a live version of the website [here](https://nicocktail.nicolasmercier.io)

### Installation - API

You just have to clone the API into the root of your webserver :
`git clone https://github.com/NicolasMrc/nicocktail-api.git`

To create and populate the database run the command `php artisan migrate:refresh --seed`

### Installation - Client App

Clone the client app anywhere :
`git clone https://github.com/NicolasMrc/nicocktail-app.git`

If your webserver url is not `http://localhost:8888/` go to `nicocktail-app/src/app/app-settings.ts` and change the api_endpoint variable to match your webserver url.

You will need to install depency `npm install`

To run the application simply run the command `npm start`
Your nicocktail application will be accessible at localhost:4200


