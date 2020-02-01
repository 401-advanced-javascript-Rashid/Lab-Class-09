'use strict';


const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Sony server', () => {

  /////////////////// categories ///////////////////////////////////////////////////////////////////

  it('/categories GET request works' , ( ) => {
    return mockRequest
      .get('/categories')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('/categories POST request works with create() method' , ( ) => {
    return mockRequest
      .post('/categories')
      .send( { Cars: 'Vision-R' , HeadPhones: 'WH-1000XM3' } )
      .then(data => {
        expect(data.status).toBe(201);
        expect(data.body.Cars).toBe('Vision-R');
      });
  });

  it('/categories PUT request works with Update() method' , ( ) => {
    return mockRequest
      .put('/categories/Cars')
      .send( { Cars: 'Vision-S' } )
      .then(data => {
        expect(data.body.Cars).toBe('Vision-S');
        expect(data.status).toBe(200);
      });
  });


  it('/categories DELETE request works with Delete() method' , ( ) => {
    return mockRequest
      .delete('/categories/HeadPhones')
      .then(data => {
        expect(typeof data.body).toBe('object');
        expect(data.status).toBe(200);
      });
  });

  ///////////////////// Prodact //////////////////////////////////////////////////////////////////////////////

  it('/products GET request works' , ( ) => {
    return mockRequest
      .get('/products')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('/products POST request works with create() method' , ( ) => {
    return mockRequest
      .post('/products')
      .send( { Phones: 'xperia 1' , Entertainment: 'Playstation 4' , TV: 'X950G' } )
      .then(data => {
        expect(data.body.Phones).toBe('xperia 1');
        expect(data.body.Entertainment).toBe('Playstation 4');
        expect(data.body.TV).toBe('X950G');
        expect(data.status).toBe(201);
      });
  });


  it('/products PUT request works with Update() method' , ( ) => {
    return mockRequest
      .put('/products/TV')
      .send( { TV: 'Bravia' } )
      .then(data => {
        expect(data.body.TV).toBe('Bravia');
        expect(data.status).toBe(200);
      });
  });


  it('/products DELETE request works with Delete() method' , ( ) => {
    return mockRequest
      .delete('/products/Phones')
      .then(data => {
        expect(typeof data.body).toBe('object');
        expect(data.status).toBe(200);
      });
  });

  ///////////////////////////////////////////////////////////////////////

  it('responds with a 500 on error', () => {
    return mockRequest
      .get('/crash-error')
      .then(results =>{
        expect(results.status).toBe(500);
      })
      .catch(console.error);
  });

  it('if there are not route respond 404', () => {
    return mockRequest
      .get('/not-found')
      .then(results =>{
        expect(results.status).toBe(404);
      })
      .catch(console.error);
  });
});