import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: '123456', description: 'ID ของบทความ' })
  @IsString()
  @IsNotEmpty()
  postId!: string; //

  @ApiProperty({ example: 'Oak', description: 'ชื่อผู้คอมเมนต์' })
  @IsString()
  @IsNotEmpty()
  author!: string;

  @ApiProperty({ example: 'เนื้อหาดีมากครับ', description: 'ข้อความคอมเมนต์' })
  @IsString()
  @IsNotEmpty()
  message!: string;
}