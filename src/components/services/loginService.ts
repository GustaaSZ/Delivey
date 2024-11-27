const API_URL = 'http://192.168.1.29:3000/users';

export interface LoginResponse {
    success: boolean;
    message: string;
    user?: {
        id: number;
        email: string;
    };
}

export async function loginService(email: string, password: string): Promise<LoginResponse> {
    try {
        const response = await fetch(`${API_URL}?email=${email}&password=${password}`);
        const data = await response.json();

        if (data.length > 0) {
            // Usuário encontrado
            return {
                success: true,
                message: 'Login realizado com sucesso!',
                user: {
                    id: data[0].id,
                    email: data[0].email,
                },
            };
        }

        // Usuário ou senha inválidos
        return {
            success: false,
            message: 'E-mail ou senha incorretos.',
        };
    } catch (error) {
        console.error('Erro no login:', error);
        return {
            success: false,
            message: 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.',
        };
    }
}
