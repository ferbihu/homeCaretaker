const request = require('supertest');
const { server } = require('../index');
const {createCarevigerMock} = require('./utils/careviger-utils');


describe('/careviger-search', ()=>{

    afterAll(async()=>{
        await server.close();
    });
    
    it('should return 200 when match the date available',async()=>{
        const mock = await createCarevigerMock({email:"search-careviger@gmail.com"});
        const searchDateAvailable = {
            dateAvailableFrom: "12-05-25",
            dateAvailableUntil: "05-12-28"
        }
        const expectedResponse =     [
            {
              email: 'klobimba@gmail.com',
              name: 'ADENIMBA',
              lastName: 'klodo',
              dateAvailableFrom: '12-05-25',
              dateAvailableUntil: '05-12-28',
              phone: '123123'
            },
            {
              email: 'falopita@gmail.com',
              name: 'fer',
              lastName: 'bihu',
              dateAvailableFrom: '12-05-25',
              dateAvailableUntil: '05-12-28',
              phone: '123121'
            },
            {
              email: 'search-careviger@gmail.com',
              name: 'fer',
              lastName: 'bihu',
              dateAvailableFrom: '12-05-25',
              dateAvailableUntil: '05-12-28',
              phone: '123121'
            }
          ]
      
        const response = await request(server).post('/careviger/search_careviger').send(searchDateAvailable);
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(expectedResponse);
    });
    it('should return [] when there is not careviger', async()=>{
        const searchDateAvailable = {
            dateAvailableFrom: "13-10-2056",
            dateAvailableUntil: "24-12-2028"
        }
        const response = await request(server).post('/careviger/search_careviger').send(searchDateAvailable);
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual([]);
    })
})