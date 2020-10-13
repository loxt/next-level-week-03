import { createConnection } from 'typeorm';

createConnection().then(r => console.log(`Database connected`)).catch((err) => console.log(err));
