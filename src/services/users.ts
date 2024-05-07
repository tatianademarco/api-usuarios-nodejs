import User, { IUser } from '../models/user';

export const getUsers = async (): Promise<IUser[]> => {
    const users: IUser[] = await User.find();
    return users;
}

export const getUser = async (id: string): Promise<IUser | null> => {
    const user: IUser | null = await User.findById(id);
    return user;
}

export const createUser = async (params: Partial<IUser>): Promise<IUser> => {
    const user: IUser = new User({
        nome: params.nome,
        email: params.email,
        idade: params.idade,
        genero: params.genero,
        telefone: params.telefone,
        cpf: params.cpf,
        rg: params.rg
    });

    await user.save();
    return user;
}

export const deleteUser = async (id: string): Promise<void> => {
    await User.findByIdAndDelete(id);
}

export const updateUser = async (id: string, params: Partial<IUser>): Promise<IUser | null> => {
    const user: IUser | null = await User.findByIdAndUpdate(id, {
        nome: params.nome,
        email: params.email,
        idade: params.idade,
        genero: params.genero,
        telefone: params.telefone,
        cpf: params.cpf,
        rg: params.rg
    }, {
        new: true
    });
    return user;
}