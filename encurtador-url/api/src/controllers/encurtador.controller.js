;;/**
 * Classe responsável por persistir e consultar informações referentes as URL's encurtadas.
 * 
 * @module encurtadorController
 * @author walberglustosa
 */

const db = require("../config/database");

var shortUrl = require('node-url-shortener');

/**
 * Lista todas URL's encurtadas. <br>
 * API (GET) - /api/urls <br>
 * 
 * Exemplo de chamada: {@link http://localhost:3000/api/urls}
 *
 * @param {any} req - Objeto de solicitação 
 * @param {any} res - Resposta da solicitação
 * 
 * @returns {array} Array de objetos com informações das URL's encurtadas. 
 */
exports.listAllURLsEncurtadas = async (req, res) => {
    const response = await db.query('SELECT * FROM tb_url_encurtada ORDER BY id ASC');

    return res.status(200).send(response.rows);
};

/**
 * Recupera a URL encurtada pelo ID. <br>
 * API (GET) - /api/urls/{:id} <br>
 * 
 * Exemplo de chamada: {@link http://localhost:3000/api/urls/30}
 * 
 * @param {any} req - Objeto de solicitação 
 * @param {any} res - Resposta da solicitação
 * 
 * @returns {object} Dados da URL encurtada. 
 */
exports.getURLEncurtadaById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM tb_url_encurtada WHERE id = $1', [id]);

    return res.status(200).send(response.rows);
};

/**
 * Recupera a URL encurtada pela data de criação. <br>
 * API (GET) - /api/urls/{:data} <br>
 * 
 * Exemplo de chamada: {@link http://localhost:3000/api/urls/2022-01-14}
 * 
 * @param {any} req - Objeto de solicitação 
 * @param {any} res - Resposta da solicitação
 * 
 * @returns {object} Dados da URL encurtada. 
 */
exports.getURLEncurtadaByData = async (req, res) => {
    const data = req.params.data;
    const response = await db.query('SELECT * FROM tb_url_encurtada WHERE data = $1', [data]);

    return res.status(200).send(response.rows);
};

/**
 * Recupera a URL encurtada pelo encurtamento. <br>
 * API (GET) - /api/urls/{:url_encurtada} <br>
 * 
 * Exemplo de chamada: {@link http://localhost:3000/api/urls/MTU2MTc0OQ==}
 * 
 * @param {any} req - Objeto de solicitação 
 * @param {any} res - Resposta da solicitação
 * 
 * @returns {object} Dados da URL encurtada. 
 */
exports.getURLEncurtadaByEncurtamento = async (req, res) => {
    const encurtamento = '%' + req.params.encurtamento;
    console.log('Valor: ' + encurtamento);
    const response = await db.query('SELECT * FROM tb_url_encurtada WHERE url_encurtada like $1', [encurtamento]);

    return res.status(200).send(response.rows);
};

/**
 * Gera a URL encurtada com base na URL original e salva as informações no banco de dados. <br>
 * API (POST) - /api/urls <br>
 * 
 * Exemplo de chamada: {@link http://localhost:3000/api/urls/} <br>
 * 
 * Exemplo de objeto que deverá ser passado no body: <br>
 * 
 * {"url_original": "https://g1.globo.com"}
 * 
 * @param {any} req - Objeto de solicitação 
 * @param {any} res - Resposta da solicitação
 * 
 * @returns {object} Dados da URL encurtada que foi criada. 
 */
exports.createURLEncurtada = async (req, res) => {
    const { url_original } = req.body;

    // GERAR URL ENCURTADA
    shortUrl.short(url_original, function (err, url) {
        console.log(url);

        return salvar(req, res, url_original, url);
    });
};

/**
 * Salva as informações referente a URL encurtada no banco de dados. <br>
 * 
 * @param {any} req - Objeto de solicitação 
 * @param {any} res - Resposta da solicitação
 * @param {string} url_original - URl original que será encurtada
 * @param {string} url_encurtada - URL encurtada que será gerada com base na URL original
 * 
 * @returns {object} Dados da URL encurtada que foi salva. 
 */
async function salvar(req, res, url_original, url_encurtada) {
    const data = new Date();

    let query = 'INSERT INTO tb_url_encurtada (url_original, url_encurtada, data) VALUES ($1, $2, $3) RETURNING id;'
    result = await db.query(query, [url_original, url_encurtada, data]);

    return res.status(201).send({
        message: "URL encurtada com sucesso!",
        body: {
            url: { "id": result.rows[0].id, url_original, url_encurtada, data }
        },
    });
}
