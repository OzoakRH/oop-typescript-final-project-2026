import { Injectable, NotFoundException } from '@nestjs/common';
import { IComment } from './interfaces/comment.interface';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  private comments: IComment[] = []; // ห้ามใช้ any

  // ดึงคอมเมนต์ทั้งหมด
  findAll(): IComment[] {
    return this.comments;
  }

  // 4.4 Relationship: ดึงคอมเมนต์เฉพาะของบทความนั้นๆ
  findByPostId(postId: string): IComment[] {
    return this.comments.filter(comment => comment.postId === postId);
  }

  // สร้างคอมเมนต์ใหม่
  create(dto: CreateCommentDto): IComment {
    const newComment: IComment = {
      id: Date.now().toString(),
      ...dto,
      createdAt: new Date(),
    };
    this.comments.push(newComment);
    return newComment;
  }

  // ลบคอมเมนต์
  remove(id: string): void {
    const index = this.comments.findIndex(c => c.id === id);
    if (index === -1) throw new NotFoundException('ไม่พบคอมเมนต์ที่ต้องการลบ');
    this.comments.splice(index, 1);
  }
}