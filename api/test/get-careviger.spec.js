const request = require('supertest');
const { server } = require('../index');
const {createCarevigerMock} = require('./utils/careviger-utils');
const {regenerateTable} = require('./utils/dynamodb');




describe('test get careviger', ()=>{

    afterAll(async()=>{
        await server.close();
    });

    afterEach(async()=>{
        await regenerateTable();
    })

    it('get careviger return 404 because carevigerId not exist', async()=>{
        const response = await request(server).get('/careviger/get-careviger@gmail.com');
        expect(response.status).toBe(404);
    });
    it('get careviger return 200 because carevigerId exist', async()=>{
        const mock = await createCarevigerMock({email:"bihu@gmail.com"});

        const response = await request(server).get('/careviger/bihu@gmail.com');
        expect(response.status).toBe(200);
    });
});