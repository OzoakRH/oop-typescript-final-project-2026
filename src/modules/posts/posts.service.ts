import { Injectable, NotFoundException } from '@nestjs/common';
import { IPost } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  // 1. จำลองฐานข้อมูล (ห้ามใช้ any เด็ดขาด)
  private posts: IPost[] = [];

  // 2. Logic การสร้าง (POST)
  create(dto: CreatePostDto): IPost {
    const newPost: IPost = {
      id: Date.now().toString(), // สร้าง ID จำลอง
      ...dto,
      status: dto.status || ({} as any), // หรือกำหนดค่าเริ่มต้นจาก Enum
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  // 3. Logic การดึงข้อมูลตาม ID (GET by ID)
  findOne(id: string): IPost {
    const post = this.posts.find((p) => p.id === id);
    if (!post) {
      // ป้องกัน Error 500 โดยการส่ง 404 กลับไปอย่างเหมาะสม
      throw new NotFoundException(`ไม่พบโพสต์ที่มี ID: ${id}`);
    }
    return post;
  }
}