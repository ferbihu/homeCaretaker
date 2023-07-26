const request = require('supertest');
const { server } = require('../index');
const {createCarevigerMock} = require('./utils/careviger-utils');

describe('/profile_change/:email', ()=>{
    afterAll(async()=>{
        await server.close();
    });

    it('should return 200 when user change cualquier dato de su perfil', async()=>{
        const mock = await createCarevigerMock({email:"klobimba@gmail.com"});
        const body = {
            "name" : "ADENIMBA",
            "lastName" : "klodo",
            "phone": "123123",
            "descriptionJob": "olguista",
            "dateAvailable": "25032023",
            "socialMedia": {
                "facebook" : "https://joi.dev/api/?v=17.9.1#date",
                "twitter": "https://joi.dev/api/?v=17.9.1#date",
                "instagram":"https://joi.dev/api/?v=17.9.1#date"
            }
        
        }
        const response = await request(server).put('/careviger/profile_change/klobimba@gmail.com').send(body);
        expect(response.status).toBe(200)

    });
    it('should return 200 when user updated the social media facebook', async()=>{
        const mock = await createCarevigerMock({email:"falopita@gmail.com"});
        const body = {
            "socialMedia": {
                "facebook" : "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html"
            }
        }
        const response = await request(server).put('/careviger/profile_change/falopita@gmail.com').send(body);
        expect(response.status).toBe(200)

    });
    it('should return 404 when user no exist in db', async()=>{
        const body = {
            "descriptionJob": "olguista",
            "dateAvailable": "25032023"
        }
        const response = await request(server).put('/careviger/profile_change/doesntcareviger@gmail.com').send(body);
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ msg: 'user doesnt exist' })
    });
});

//llamado a la base y verifico los datos que hayan sido cambiados