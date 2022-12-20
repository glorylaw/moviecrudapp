import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app'


// let token: string[];
require("dotenv").config();


/* Connecting to the database before each test. */
beforeEach(async () => {
     await mongoose.connect(process.env.DATABASE_URL!);
  });
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();})
describe('Post/Get/Update/Delete', () =>{
    //TESTING POSTING ROUTES
    describe('Post routes', () => {
        describe('', () => {
             //post add movie;
            it('registers user', async () =>{
                 await supertest(app).post('/users/register').send({
                    //define a register
                    fullname:"Lawrence glory",
                    username:"glorylaw",
                    email:"oghenekevwe@gmail.com",
                    password:"12345",
                    confirmPassword:"12345"
                }).expect(302);
            //    token = res.headers['set-cookie'];
            });
            //login user;
            it('logins in user', async () => {
                const user = await supertest(app).post('/users/login').send({
                    email:"oghenekevwe@gmail.com",
                    password:"12345"
                }).expect(302);
            })
            //post add movies;
            it('creates movie for user', async () => {
                const movie = await supertest(app).post('/movie/add-movie').send({
                    tittle:"Legend of the seeker",
                    description:"richard cipher ",
                    price:2300,
                    image:"legendlink"
                }).expect(302);
            })
        })
        //TESTING GET ROUTES
        describe('get routes', () => {
             //get all movies
             it('get  products should return 200', async () => {
             await supertest(app).get('/movie/movies')
               expect(200);
            })
            
        });
        //TESTING UPDATE ROUTES
        describe('update routes', () => {
             //update movie;
             it('updates movie for a user', async () => {
                const updateMovie = await supertest(app).put('/movie/edit-movie/:id').send({
                    tittle:"Merlin",
                    description:"richard cipher loves mother confessor and slays dark magic",
                    price:2200,
                    image:"image rendered"
                })
                expect(302);
            })
        });
        //TESTING DELETE ROUTES
        describe('delete routes', () => {
            it('delete movie from a user', async () => {
                const id = '62d9e62e0556e6f5141d6434'
                await supertest(app).delete(`/movie/delete-movie/${id}`)
                expect(200);
            });
        })
    })
})