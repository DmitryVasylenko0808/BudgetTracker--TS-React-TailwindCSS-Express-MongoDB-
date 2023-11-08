export type User = {
    _id: string,
    login: string,
    sum: number
};

export type RegisterRequest = {
    login: string,
    password: string,
    password_confirm: string
};

export type LoginRequest = {
    login: string,
    password: string,
};

export type LoginResponse = User & { token: string };