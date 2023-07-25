const request = require('supertest');
const { server } = require('../index');


describe('test create caraviger', ()=>{

    afterAll(async()=>{
        await server.close();
    });


    it('should return 200 when create careviger', async()=>{
        const body = {
            "name" : "adbimba",
            "lastName" : "caloooo",
            "email": "klobimba@gmail.com",
            "phone": "1231231231231",
            "descriptionJob": "que volaba",
            "dateAvailable": "15-03-2024",
            "socialMedia": {
                "facebook" : "https://joi.dev/api/?v=17.9.1#date",
                "twitter": "https://joi.dev/api/?v=17.9.1#date",
                "instagram": "https://joi.dev/api/?v=17.9.1#date"
            }
        }
        const response = await request(server).post('/careviger/create_profile').send(body);
        expect(response.status).toBe(200);
    });

    it('deberia tirar algun error cuando el body no este completo con los campos requeridos', async()=>{
        const body = {
            "email": "ariklo@gmail.com",
            "name":"ari",
            "lastName":"klo"
        }
        const response = await request(server).post('/careviger/create_profile').send(body);
        expect(response.status).toBe(400);
    });
});