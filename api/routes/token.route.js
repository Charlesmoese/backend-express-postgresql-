import express from 'express';
import Controller from '../controller/endpoint.controller.js';
import verifyToken from '../middlewere/jwt.token.middleware.js'; // Corrigido o caminho do diretório

const router = express.Router();

router.get('/protected', verifyToken, Controller.securedEndpoint); // Usando verifyToken diretamente

export default router;