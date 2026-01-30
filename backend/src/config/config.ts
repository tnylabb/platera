import dotenv from 'dotenv';

dotenv.config();

const config = {
    jwtSecret: process.env.JWT_SECRET || 'backup_secret_key'
};

export default config;