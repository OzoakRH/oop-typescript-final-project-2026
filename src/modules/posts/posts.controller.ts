import { Controller, Post, Body, Get, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { IPost } from './interfaces/post.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // กำหนด Status 201 สำหรับการสร้างสำเร็จ
  create(@Body() dto: CreatePostDto): ApiResponse<IPost> {
    const result = this.postsService.create(dto);
    return {
      success: true,
      message: 'สร้างบทความสำเร็จ',
      data: result, // data จะมี Type เป็น IPost (Narrow Type)
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<IPost> {
    const result = this.postsService.findOne(id);
    return {
      success: true,
      message: 'ดึงข้อมูลสำเร็จ',
      data: result,
    };
  }
}