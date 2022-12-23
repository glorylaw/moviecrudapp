# moviecrudapp
Implemented this API using Express, TypeScript and MongoDB
A basic Express application, that makes a CRUD operation (create, read, update, delete) using MongoDB database, document and publish your endpoints using postman. In this project, I built a basic CRUD (Create, Read, Update, Delete) for an Hotel Listing Application.

Users collection
Username
FullName
Email
password

Movie collection
Description
Image
tittle
Price

IMPLEMENTED AUTHORIZATION AND AUTHENTICATION: PROTECTED ALL ROUTES. ONLY THE LOGGED-IN USERS CAN PERFORM THE FOLLOWING OPERATIONS

You can browse through movie listings.
You can create Movie 
You can edit a Movie
You can delete a Movie
How will I complete this project?
The aplication should be able to perform.
GET Request which returns all the data in my database
POST Request which adds data to my database file
PUT Request which updates fields of a particular data using the id in database
DELETE Request which removes a particular data from my database using the id
Also
Data format example:This show the model for users and the listing created by the user
  {
    fullName: "Bond Michael",
    email: "bond@gmail.com",
    userName: "bondz",
    password: "12333444",
      Listings:[

      {
      
        tittle:'the black panther',
        image link:'https://meany.com',
        price:10000,
        description:1,
        id:"1"
   },
   ....
 ]
}

Test coverage
Make sure you write test to cover your application using Jest/supertest
Test
Test for a GET request
Test for a POST request
Test for a PUT request
Test for a DELETE request
Test to return proper HTTP status codes
Setup
Clone this repository.
Run yarn install.
Run yarn start.
Run yarn test.
Test Coverage
Test database using mongodb-memory-server
Tested all endpoints (GET, POST, PUT, DELETE)






https://user-images.githubusercontent.com/100371169/209325833-8469f9bb-751b-4679-b74b-68cf554ee440.mov



