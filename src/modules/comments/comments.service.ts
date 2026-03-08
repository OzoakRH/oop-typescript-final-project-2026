import { Injectable, NotFoundException } from '@nestjs/common';
import { IComment } from './interfaces/comment.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  private comments: IComment[] = []; // ห้ามใช้ any

  // 1. ดึงคอมเมนต์ทั้งหมด
  findAll(): IComment[] {
    return this.comments;
  }

  // 2. ดึงคอมเมนต์รายตัว (GET /comments/:id)
  findOne(id: string): IComment {
    const comment = this.comments.find(c => c.id === id);
    if (!comment) throw new NotFoundException(`ไม่พบคอมเมนต์ ID: ${id}`);
    return comment;
  }

  // 3. Relationship: ดึงคอมเมนต์เฉพาะของบทความนั้นๆ
  findByPostId(postId: string): IComment[] {
    return this.comments.filter(comment => comment.postId === postId);
  }

  // 4. สร้างคอมเมนต์ใหม่
  create(dto: CreateCommentDto): IComment {
    const newComment: IComment = {
      id: Date.now().toString(),
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(), // เพิ่มเพื่อให้สอดคล้องกับ Data Model
    };
    this.comments.push(newComment);
    return newComment;
  }

  // 5. แก้ไขข้อความคอมเมนต์ (PATCH)
  patch(id: string, dto: UpdateCommentDto): IComment {
    const index = this.comments.findIndex(c => c.id === id);
    if (index === -1) throw new NotFoundException('ไม่พบข้อมูลที่จะแก้ไข');
    
    this.comments[index] = {
      ...this.comments[index],
      ...dto, // อัปเดตเฉพาะ message
      id: this.comments[index].id,         // ล็อค ID เดิมไว้เพื่อความปลอดภัย
      postId: this.comments[index].postId, // ล็อค postId เดิมไว้ ไม่ให้ย้ายไปโพสต์อื่น
      updatedAt: new Date(),               // บันทึกเวลาที่แก้ไขล่าสุด
    };
    return this.comments[index];
  }

  // 6. ลบคอมเมนต์รายตัว
  remove(id: string): void {
    const index = this.comments.findIndex(c => c.id === id);
    if (index === -1) throw new NotFoundException('ไม่พบคอมเมนต์ที่ต้องการลบ');
    this.comments.splice(index, 1);
  }

  // 7. Cascade Delete: ลบคอมเมนต์ทั้งหมดที่ผูกกับ Post นี้
  removeByPostId(postId: string): void {
    this.comments = this.comments.filter(comment => comment.postId !== postId);
  }
}