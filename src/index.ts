import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { validate as validateEmail } from 'email-validator';
import { cpf } from 'cpf-cnpj-validator';
import usersController from './controllers/users';
import databaseConnection from './utils/database';

const app = express();
const port = 3000;

app.use(express.json());

function validateEmailMiddleware(req: Request, res: Response, next: any) {
    const { email } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'E-mail inválido' });
    }
    next();
  }

function validateCPFMiddleware(req: Request, res: Response, next: any) {
    const { cpf: cpfValue } = req.body;
    if (!cpf.isValid(cpfValue)) {
      return res.status(400).json({ error: 'CPF inválido' });
    }
    next();
}
  
app.post('/users', validateEmailMiddleware, validateCPFMiddleware, usersController);

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Bem-vindo à API de Usuários!");
});

app.use('/users', usersController);

(async () => {
  try {
    await databaseConnection();
    console.log('Conectado ao banco de dados MongoDB');

    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados MongoDB:', error);
  }
})();
