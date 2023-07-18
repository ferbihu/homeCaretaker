const request = require('supertest');
const { server } = require('../index');



describe('test get careviger', ()=>{

    afterAll(async()=>{
        await server.close();
    });

    it('get careviger return 404 because carevigerId not exist', async()=>{
        const response = await request(server).get('/careviger/calo@gmail.com');
        expect(response.status).toBe(404);
    });
    it('get careviger return 200 because carevigerId exist', async()=>{
        const response = await request(server).get('/careviger/bihu@gmail.com');
        expect(response.status).toBe(200);
    });
});