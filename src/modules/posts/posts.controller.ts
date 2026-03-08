import { Controller, Get, Post, Body, Param, Delete, Put, Patch, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { IPost } from './interfaces/post.interface';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // แก้ไข @Get() ของ posts
  @Get()
  @ApiOperation({ summary: 'ดึงบทความทั้งหมด (รองรับการค้นหาตามชื่อผู้เขียน)' })
  @ApiQuery({ name: 'author', required: false, description: 'ระบุชื่อผู้เขียนที่ต้องการค้นหา' })
  findAll(@Query('author') author?: string): ApiResponse<IPost[]> {
    return {
      success: true,
      message: author ? `ผลการค้นหาผู้เขียน: ${author}` : 'ดึงข้อมูลบทความทั้งหมดสำเร็จ',
      data: this.postsService.findAll(author), // ส่งค่า author ไปให้ Service
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'ดึงบทความตาม ID' })
  findOne(@Param('id') id: string): ApiResponse<IPost> {
    return {
      success: true,
      message: 'ดึงข้อมูลสำเร็จ',
      data: this.postsService.findOne(id),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'สร้างบทความใหม่' })
  create(@Body() dto: CreatePostDto): ApiResponse<IPost> {
    return {
      success: true,
      message: 'สร้างบทความสำเร็จ',
      data: this.postsService.create(dto),
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'อัปเดตข้อมูลบทความทั้งหมด' })
  update(@Param('id') id: string, @Body() dto: CreatePostDto): ApiResponse<IPost> {
    return {
      success: true,
      message: 'อัปเดตข้อมูลบทความสำเร็จ',
      data: this.postsService.update(id, dto),
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'อัปเดตบทความ (บางส่วน)' })
  patch(
    @Param('id') id: string, 
    @Body() dto: UpdatePostDto
  ): ApiResponse<IPost> {
    return {
      success: true,
      message: 'อัปเดตข้อมูลบางส่วนสำเร็จ',
      data: this.postsService.patch(id, dto),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบบทความ' })
  remove(@Param('id') id: string): ApiResponse<null> {
    this.postsService.remove(id);
    return {
      success: true,
      message: 'ลบบทความเรียบร้อยแล้ว',
      data: null,
    };
  }
}