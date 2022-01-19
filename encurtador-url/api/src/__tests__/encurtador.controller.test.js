const supertest = require("supertest");
const app = require("../../server");
//const jest = require("jest")
//const encurtadorService = require('../service/encurtador.service')

describe("Encurtador", () => {
    test("Espero que retorne o valor correto vindo do service.", async () => {
        
        // jest.spyOn(encurtadorService, "getById").mockResolvedValue("????");
        
        const result = await supertest(app).get("/api/urls/30");

        console.log(result.body);

        expect(result.body).toMatchObject([{
            id: '30',
            url_original: 'http://hotmail.com',
            url_encurtada: 'https://cdpt.in/MTU2MTc0OQ==',
            data: '2022-01-14T03:00:00.000Z'
        }]);
    })
});