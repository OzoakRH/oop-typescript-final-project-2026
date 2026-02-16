import { IsString, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostStatus } from '../enums/post-status.enum';

export class CreatePostDto {
  @ApiProperty({ description: 'หัวข้อบทความ', example: 'เริ่มต้นเรียน NestJS' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title!: string;

  @ApiProperty({ description: 'เนื้อหาบทความ' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiProperty({ description: 'ชื่อผู้เขียน' })
  @IsString()
  @IsNotEmpty()
  author!: string;

  @ApiProperty({ enum: PostStatus, default: PostStatus.DRAFT })
  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus = PostStatus.DRAFT;
}