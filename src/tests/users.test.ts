import * as UsersService from '../services/users';
import User, { IUser } from '../models/user';


    describe('getUsers', () => {

        test('deve retornar a lista de usuários', async () => {
  
            const usersData = [
                { nome: 'User 1', email: 'user1@example.com', idade: 25, genero: 'Masculino', telefone: '123456789', cpf: '123.456.789-00', rg: '12345678' },
                { nome: 'User 2', email: 'user2@example.com', idade: 30, genero: 'Feminino', telefone: '987654321', cpf: '987.654.321-00', rg: '87654321' }
            ];

            jest.spyOn(User, 'find').mockResolvedValue(usersData);

            const users = await UsersService.getUsers();

            expect(User.find).toHaveBeenCalled();

            expect(users).toEqual(usersData);
        });

    });

    
    describe('deleteUser', () => {
      test('deve deletar um usuário existente', async () => {

        const userId = '123456789';

        jest.spyOn(User, 'findByIdAndDelete').mockResolvedValue(null);
    
        await UsersService.deleteUser(userId);
    
        expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
      });
    });
    
    describe('getUser', () => {
      test('deve retornar um usuário existente pelo id', async () => {
        const userId = '123456789';
    
        const userData = {
          nome: 'Usuário Teste',
          email: 'teste@example.com',
          idade: 35,
          genero: 'Masculino',
          telefone: '123456789',
          cpf: '555.666.777-88',
          rg: '1234567'
        };
    
        jest.spyOn(User, 'findById').mockResolvedValue(userData);
    
        const user = await UsersService.getUser(userId);
    
        expect(User.findById).toHaveBeenCalledWith(userId);
        expect(user).toEqual(userData);
      });
    });
    