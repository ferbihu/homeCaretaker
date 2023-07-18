const { server } = require('../index');
const request = require('supertest');

describe('/profile_careviger/:email', ()=>{

    afterAll(async()=>{
        await server.close();
    });

    it('should return 200 when the user is deleted', async()=>{
        const response = await request(server).delete('/careviger/profile_careviger/bihufer@gmail.com');
        expect(response.status).toBe(200);
        expect(response.text).toBe("\"user bihufer@gmail.com delete succesfully\"");
    });
});