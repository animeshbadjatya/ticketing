import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { AssetClass } from "./entity/assetclass"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "configurations-mysql-srv",
    port: 3306,
    username: "rooty",
    password: "1234",
    database: "ib_configurations",
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/entity/**.ts` ],
    migrations: [],
    subscribers: [],
    connectTimeout: 50000
})
