import { config } from "dotenv";
import { DataSource } from "typeorm";

import { ConfigService } from "@nestjs/config";

config();

const configService = new ConfigService();

export const connectionSource = new DataSource({
    host: configService.get('DATABASE_HOST'),
    type: "mysql",
    port: parseInt(configService.get('DATABASE_PORT') || "3306"),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_DB_NAME'),
    migrations: [
        "dist/src/database/migrations/*.{ts,js}",
    ],
    // subscribers: ["src/database/migrations/*.ts"],
    entities: ['dist/src/entities/*.entity.{ts,js}'],
    // m: {
    //     migrationsDir: "src/database/migrations",
    // },
    logging: true,
})