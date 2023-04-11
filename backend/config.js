import env from 'dotenv';

env.config();

export const dbData = {
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    dbName: process.env.MONGODB_DATABASE_NAME,
}