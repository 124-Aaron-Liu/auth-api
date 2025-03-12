import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add express-session middleware
  app.use(
    session({
      secret: 'your-secret-key', // replace with your own secret
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // set to true if using HTTPS
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
