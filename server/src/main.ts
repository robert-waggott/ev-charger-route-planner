import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config({
    path: join(__dirname, "..", "config.env")
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    await app.listen(parseInt(process.env.PORT, 10) || 3001);
}
bootstrap();
