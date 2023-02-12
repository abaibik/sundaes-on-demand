# Server run instruction:

Go to the folder sundae-server
```
npm install
npm start
```
The server will be found at http://localhost:3030

# Using the server

Server routes:
`GET /scoops` and `GET /toppings` return sundae options (array of objects with keys name and imagePath)
`POST /order` returns a random order number (does not process order)
images via static `/images` directory.

# Client run instruction:
```
npm install
npm start
```
