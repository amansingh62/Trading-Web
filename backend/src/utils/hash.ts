import bcrypt from "bcrypt";

export const hashValue = async (value: string) => {
    return bcrypt.hash(value, 10);
};

export const compareHash = async (value: string, hash: string) => {
    return bcrypt.compare(value, hash);
};