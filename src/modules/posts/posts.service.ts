import { Injectable, NotFoundException } from '@nestjs/common';
import { IPost } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { PostStatus } from './enums/post-status.enum';

@Injectable()
export class PostsService {
  private posts: IPost[] = [];

  // 1. ดึงทั้งหมด (GET /posts)
  findAll(): IPost[] {
    return this.posts;
  }

  // 2. ดึงตาม ID (GET /posts/:id)
  findOne(id: string): IPost {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException(`ไม่พบโพสต์ที่มี ID: ${id}`);
    return post;
  }

  // 3. สร้างใหม่ (POST /posts)
  create(dto: CreatePostDto): IPost {
    const newPost: IPost = {
      id: Date.now().toString(),
      ...dto,
      status: dto.status || PostStatus.DRAFT,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  // 4. อัปเดตทั้งหมด (PUT /posts/:id)
  update(id: string, dto: CreatePostDto): IPost {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException('ไม่พบข้อมูลที่ต้องการอัปเดต');
    
    this.posts[index] = {
      ...this.posts[index],
      ...dto,
      updatedAt: new Date(),
    };
    return this.posts[index];
  }

  // 5. อัปเดตบางส่วน (PATCH /posts/:id)
  patch(id: string, dto: Partial<CreatePostDto>): IPost {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException('ไม่พบข้อมูลที่ต้องการอัปเดต');
    
    this.posts[index] = {
      ...this.posts[index],
      ...dto,
      updatedAt: new Date(),
    };
    return this.posts[index];
  }

  // 6. ลบ (DELETE /posts/:id)
  remove(id: string): void {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException('ไม่พบข้อมูลที่ต้องการลบ');
    this.posts.splice(index, 1);
  }
}