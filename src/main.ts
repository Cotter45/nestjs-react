import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as compression from 'compression';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const cluster = require('cluster');
import { cpus } from 'os';

const numCPUs = cpus().length;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker: any) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    if (process.env.NODE_ENV === 'development') {
      app.enableCors();
    }
    app.use(cookieParser());
    app.use(helmet());
    app.use(compression());
    app.use(
      csurf({
        cookie: {
          secure: true,
          sameSite: 'lax',
          httpOnly: true,
        },
      }),
    );
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
      .setTitle('Test Nest API')
      .setDescription('Discovering NestJS, Prisma and Swagger')
      .setVersion('0.1')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(5000);
  }
}
bootstrap();
