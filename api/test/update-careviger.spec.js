const { server } = require('../index');
const request = require('supertest');

describe('/profile_change/:email', ()=>{
    afterAll(async()=>{
        await server.close();
    });

    it('should return 200 when user change cualquier dato de su perfil', async()=>{
        // const body = {
        //     name: "ari"
        // }
        const response = await request(server).post('/careviger/profile_change/bihu@gmail.com').send({name:'ari'});
        console.log(response);
        //expect(response.data).toMatchObject({name:'ari'});
        // expect(response.text).toBe("`user ariel@gmail.com updated succesfully`")

    });
});