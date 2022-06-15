import { NestFactory } from '@nestjs/core';
const cluster = require('cluster');
import * as os from 'os';
import helmet from 'helmet';
import * as compression from 'compression';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
    app.use(morgan('dev'));
  }
  app.use(cookieParser());
  app.use(helmet());
  app.use(compression({ level: 1 }));
  app.use(
    csurf({
      cookie: {
        secure: true,
        sameSite: 'lax',
        httpOnly: true,
      },
    }),
  );
  app.use((_, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Test Nest API')
    .setDescription('Discovering NestJS, Prisma and Swagger')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      requestInterceptor: (req) => {
        req.credentials = 'include';
        return req;
      },
    },
  });
  // SwaggerModule.setup('api/docs', app, document);

  if (cluster.isPrimary) {
    const totalCpus = os.cpus().length;

    // Fork workers.
    for (let i = 0; i < totalCpus / 2; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker: any) => {
      console.log(`worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    await app.listen(5000);
  }
}
bootstrap();
