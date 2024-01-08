import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path'; 
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_TYPE,
    DB_USER,
    DB_PORT
} from './constant';

const typeOrmConfig: TypeOrmModuleOptions = {
    type: DB_TYPE as any,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [join(__dirname, 'entities', '*.entity{.ts,.js}')],
    autoLoadEntities: true,
    synchronize: true,
};

export default typeOrmConfig;
