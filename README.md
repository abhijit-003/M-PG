## Client pacakages
cd client
npm install axios react-router-dom

## server modules
cd server
npm install express mysql2 cors dotenv nodemon

## Data Flow
Client → Route → middleware → Controller → Service → Model → DB
                                  ↓
                               Response


## server
mkdir config controllers routes models middleware services utils validations
touch app.js server.js

## client
mkdir assets components pages services context hooks routes utils
touch App.jsx main.jsx