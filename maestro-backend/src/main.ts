import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração global de CORS para permitir que o frontend converse com o backend
  app.enableCors({
    origin: '*', // Em produção, restrinja para o domínio do frontend (ex: *.maestro.app)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Backend rodando na porta ${port}`);
}

bootstrap();
