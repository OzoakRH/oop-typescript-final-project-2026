import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService], // เผื่อให้ Module อื่นนำไปใช้
})
export class CommentsModule {}