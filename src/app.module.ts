import { Module } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [PostsModule, CommentsModule], // นำโมดูลที่สร้างไว้มาใส่ที่นี่
  controllers: [],
  providers: [],
})
export class AppModule {}