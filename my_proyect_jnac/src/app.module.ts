import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <-- 1. Importa el módulo
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// ... otros módulos que tengas importados

@Module({
  imports: [
    // 2. Configura el ConfigModule de manera global
    ConfigModule.forRoot({
      isGlobal: true, // Esto lo hace global para toda la app
      envFilePath: '.env', // Indica la ruta de tu archivo de entorno (por defecto busca '.env' en la raíz)
    }),
    AuthModule,
    UsersModule,
    // ... tus otros módulos
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}