import { Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { IComment } from './interfaces/comment.interface';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // ส่ง Status 201
  create(@Body() dto: CreateCommentDto): ApiResponse<IComment> {
    return {
      success: true,
      message: 'สร้างคอมเมนต์สำเร็จ',
      data: this.commentsService.create(dto),
    };
  }

  @Get()
  @ApiQuery({ name: 'postId', required: false, description: 'ID ของบทความ (ถ้าไม่ใส่จะดึงทั้งหมด)' }) // 2. เพิ่มบรรทัดนี้
  findAll(@Query('postId') postId?: string): ApiResponse<IComment[]> {
    let data: IComment[];
    if (postId) {
      data = this.commentsService.findByPostId(postId); // กรองตาม Post
    } else {
      data = this.commentsService.findAll(); // ดึงทั้งหมด
    }
    return {
      success: true,
      message: 'ดึงข้อมูลคอมเมนต์สำเร็จ',
      data: data,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse<null> {
    this.commentsService.remove(id);
    return {
      success: true,
      message: 'ลบคอมเมนต์เรียบร้อยแล้ว',
      data: null,
    };
  }
}