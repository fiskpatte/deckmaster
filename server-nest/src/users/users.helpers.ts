import bcrypt = require('bcryptjs');

export const hashedPassword = async (password: string) => {
    const result = await bcrypt.hash(password, 12);
    return result;
}