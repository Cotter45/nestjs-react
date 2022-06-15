import { NestFactory } from '@nestjs/core';
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
  }
  app.use(morgan('dev'));
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
  app.use(['/'], (req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
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

  await app.listen(5000);
}
bootstrap();
