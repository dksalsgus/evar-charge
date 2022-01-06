import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function  setUpSwagger(app:INestApplication){
    const option = new DocumentBuilder()
    .setTitle('EVAR_CHARGE')
    .setDescription('EVAR CHARGE Web Service')
    .setVersion('0.0.1')
    .build();
    
    const documnet = SwaggerModule.createDocument(app,option);
    SwaggerModule.setup('api-docs',app,documnet);
}