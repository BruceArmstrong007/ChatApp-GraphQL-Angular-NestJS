import { Module, forwardRef } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { FirebaseModule } from '@app/common';
import { UsersModule } from 'src/users/users.module';
import { UploadRepository } from './Storage/upload.repository';
import { JwtAuthStrategy } from './strategy/jwt-auth.strategy';

@Module({
  controllers: [UploadController],
  imports: [FirebaseModule, forwardRef(() => UsersModule)],
  providers: [UploadService, UploadRepository, JwtAuthStrategy],
  exports: [UploadService, UploadRepository],
})
export class UploadModule {}
