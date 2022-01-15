const router = require('express-promise-router')();

const encurtadorController = require('../controllers/encurtador.controller');

// Criar encurtador de URLs
router.post('/urls', encurtadorController.createURLEncurtada);

// Listar todos os encurtadores de URLs
router.get('/urls', encurtadorController.listAllURLsEncurtadas);

// Get encurtador de URL by ID
router.get('/urls/:id', encurtadorController.getURLEncurtadaById);

// Get encurtador de URL by Data
router.get('/urls/data/:data', encurtadorController.getURLEncurtadaByData);

// Get encurtador de URL by Encurtamento
router.get('/urls/encurtamento/:encurtamento', encurtadorController.getURLEncurtadaByEncurtamento);

module.exports = router;
