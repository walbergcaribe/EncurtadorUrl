const encurtadorService = require("../service/encurtador.service")
const nock = require("nock");

describe("EncurtadorService", () => {

    afterEach(() => {
        nock.cleanAll();
    });

    test("Espero que os dados da URL sejam retornados.", async () => {

        nock("http://localhost:3000")
            .get("/api/urls/3")
            .reply(200, {
                id: "30",
                url_original: "http://hotmail.com",
                url_encurtada: "https://cdpt.in/MTU2MTc0OQ==",
                data: "2022-01-14T03:00:00.000Z"
            });

        const result = await encurtadorService.getById(3);

        expect(result.url_original).toBe("http://hotmail.com");
        expect(result.url_encurtada).toBe("https://cdpt.in/MTU2MTc0OQ==");
        expect(result.data).toBe("2022-01-14T03:00:00.000Z");
    });

    test("Espero o retorno 0 quando não encontrar a URL encurtada.", async () => {

        nock("http://localhost:3000")
            .get("/api/urls/3")
            .reply(200, {
                id: "30",
                url_original: "http://hotmail.com",
                url_encurtada: null,
                data: "2022-01-14T03:00:00.000Z"
            });

        const result = await encurtadorService.getById(3);

        expect(result.url_encurtada).toBe(0);
    });

    test("Espero o retorno 0 quando não encontrar resultado.", async () => {

        nock("http://localhost:3000")
            .get("/api/urls/3")
            .reply(200, null);

        const result = await encurtadorService.getById(3);

        expect(result).toBe(0);
    });
});