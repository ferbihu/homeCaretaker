const request = require('supertest');
const { server } = require('../index');


describe('test create caraviger', ()=>{

    afterAll(async()=>{
        await server.close();
    });


    it('should return 200 when create careviger', async()=>{
        const body = {
            "email":"bihu@gmail.com",
            "name":"fer",
            "lastName":"bihu",
        }
        const response = await request(server).post('/careviger/create_profile').send(body);
        expect(response.status).toBe(200);
    });
});