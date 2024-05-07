import { Router, Request, Response } from 'express';
import { getUsers, getUser, createUser, deleteUser, updateUser } from '../services/users';

const router: Router = Router();

router.get("/", async (request: Request, response: Response) => {
    const users = await getUsers();
    return response.status(200).send(users);
});

router.get("/:id", async (request: Request, response: Response) => {
    const user = await getUser(request.params.id);
    return response.status(200).send(user);
});

router.post("/", async (request: Request, response: Response) => {
    const params = {
        nome: request.body.nome,
        email: request.body.email,
        idade: request.body.idade,
        genero: request.body.genero,
        telefone: request.body.telefone,
        cpf: request.body.cpf,
        rg: request.body.rg
    };
    const user = await createUser(params);
    return response.status(201).send(user);
});

router.delete("/:id", async (request: Request, response: Response) => {
    await deleteUser(request.params.id);
    
    return response.status(204).send();
});

router.put("/:id", async (request: Request, response: Response) => {
    const user = await updateUser(request.params.id, {
        nome: request.body.nome,
        email: request.body.email,
        idade: request.body.idade,
        genero: request.body.genero,
        telefone: request.body.telefone,
        cpf: request.body.cpf,
        rg: request.body.rg
    });
    
    return response.status(200).send(user);
});

export default router as Router;