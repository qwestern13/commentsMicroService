import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsModel } from './comments.model';
import { CommentsService } from './comments.service';
import { CommentsDto } from './dto/comments.dto';
import { UpdateCommentDto } from './dto/updateCommentDto';
import { AuthUserGuard } from './guards/user.guard';

@ApiTags('Комментарии')
@Controller('comments')
export class CommentsController {
    constructor(@Inject('COMMENTS_EXCHANGE') private client: ClientProxy,
                private commentsService:  CommentsService) {

    }
    @ApiOperation({summary: 'Показать комментарии к фильму по id фильма'})
    @ApiResponse({status: 200, type: CommentsModel})
   // @UseGuards(AuthUserGuard)
    @Get('/:filmId')
    getCommentsByFilmId(@Param('filmId') filmId: number){
        return this.commentsService.getCommentsByFilmId(filmId);
    }

    @ApiOperation({summary: 'Создать комментарий'})
    @Post()
    createComments(@Body() commentsDto: CommentsDto) {
        return this.commentsService.createComment(commentsDto);
    }

    @ApiOperation({summary: 'Изменить комментарий'})
    @Put('/update')
    updateComment(@Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.updateComment(updateCommentDto);
    }

    @ApiOperation({summary: 'Удалить комментарий по его id'})
    @Delete('/:commentId')
    deleteCommentById(@Param('commentId') commentId: number) {
        return this.commentsService.deleteComment(commentId);
    }
}
