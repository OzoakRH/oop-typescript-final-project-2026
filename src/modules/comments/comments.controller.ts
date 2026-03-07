import { Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpCode, Query, Patch } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto'; // Import เพิ่ม
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { IComment } from './interfaces/comment.interface';
import { ApiQuery, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'สร้างคอมเมนต์ใหม่' }) // เพิ่มคำอธิบาย
  create(@Body() dto: CreateCommentDto): ApiResponse<IComment> {
    return {
      success: true,
      message: 'สร้างคอมเมนต์สำเร็จ',
      data: this.commentsService.create(dto),
    };
  }

  @Get()
  @ApiOperation({ summary: 'ดึงคอมเมนต์ทั้งหมด (รองรับการกรองด้วย postId)' })
  @ApiQuery({ name: 'postId', required: false, description: 'ID ของบทความ (ถ้าไม่ใส่จะดึงทั้งหมด)' })
  findAll(@Query('postId') postId?: string): ApiResponse<IComment[]> {
    let data: IComment[];
    if (postId) {
      data = this.commentsService.findByPostId(postId);
    } else {
      data = this.commentsService.findAll();
    }
    return {
      success: true,
      message: 'ดึงข้อมูลคอมเมนต์สำเร็จ',
      data: data,
    };
  }

  @Get(':id') // เพิ่ม Endpoint ดึงตาม ID
  @ApiOperation({ summary: 'ดึงคอมเมนต์ตาม ID' })
  findOne(@Param('id') id: string): ApiResponse<IComment> {
    return {
      success: true,
      message: 'ดึงข้อมูลสำเร็จ',
      data: this.commentsService.findOne(id),
    };
  }

  @Patch(':id') // เพิ่ม Endpoint อัปเดตบางส่วน
  @ApiOperation({ summary: 'แก้ไขข้อความในคอมเมนต์' })
  patch(@Param('id') id: string, @Body() dto: UpdateCommentDto): ApiResponse<IComment> {
    return {
      success: true,
      message: 'แก้ไขคอมเมนต์สำเร็จ',
      data: this.commentsService.patch(id, dto),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ลบคอมเมนต์' })
  remove(@Param('id') id: string): ApiResponse<null> {
    this.commentsService.remove(id);
    return {
      success: true,
      message: 'ลบคอมเมนต์เรียบร้อยแล้ว',
      data: null,
    };
  }
}