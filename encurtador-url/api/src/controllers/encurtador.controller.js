const db = require("../config/database");

var shortUrl = require('node-url-shortener');

// Listar todas URLs encurtadas
exports.listAllURLsEncurtadas = async (req, res) => {
    const response = await db.query('SELECT * FROM tb_url_encurtada ORDER BY id ASC');
    res.status(200).send(response.rows);
};

// Get URL encurtada by ID
exports.getURLEncurtadaById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM tb_url_encurtada WHERE id = $1', [id]);
    res.status(200).send(response.rows);
};

// Get URL encurtada by Data
exports.getURLEncurtadaByData = async (req, res) => {
    const data = req.params.data;
    const response = await db.query('SELECT * FROM tb_url_encurtada WHERE data = $1', [data]);
    res.status(200).send(response.rows);
};

// Get URL encurtada by Encurtamento
exports.getURLEncurtadaByEncurtamento = async (req, res) => {
    const encurtamento = '%' + req.params.encurtamento;
    console.log('Valor: ' + encurtamento);
    const response = await db.query('SELECT * FROM tb_url_encurtada WHERE url_encurtada like $1', [encurtamento]);
    res.status(200).send(response.rows);
};

// Criar URL encurtada
exports.createURLEncurtada = async (req, res) => {
    const { url_original } = req.body;

    // GERAR URL ENCURTADA
    let url_encurtada = '';
    shortUrl.short(url_original, function (err, url) {
        console.log(url);

        salvar(req, res, url_original, url);
    });
};

// Salvar URL encurtada
async function salvar(req, res, url_original, url_encurtada) {
    const data = new Date();

    let query = 'INSERT INTO tb_url_encurtada (url_original, url_encurtada, data) VALUES ($1, $2, $3) RETURNING id;'
    result = await db.query(query, [url_original, url_encurtada, data]);

    res.status(201).send({
        message: "URL encurtada com sucesso!",
        body: {
            url: { "id": result.rows[0].id, url_original, url_encurtada, data }
        },
    });
}
