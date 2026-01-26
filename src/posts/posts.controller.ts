import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query, UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostExistPipe} from "./pipes/post-exist.pipe";
import {UpdatePostDto} from "./dto/update-post.dto";
import {Post as PostEntity} from './entities/post.entity'
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CurrentUser} from "../auth/decorators/current-user.decorator";

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {
    }

    @Get()
    async findAll(): Promise<PostEntity[]> {
        return this.postsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe, PostExistPipe) id: number): Promise<PostEntity> {
        return this.postsService.findOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }))
    async create(@Body() post: CreatePostDto, @CurrentUser() user: any): Promise<PostEntity> {
        return this.postsService.create(post, user);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async update(@Param('id', ParseIntPipe, PostExistPipe) id: number, @Body() post: UpdatePostDto, @CurrentUser() user: any): Promise<PostEntity> {
        return this.postsService.update(id, post, user);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe, PostExistPipe) id: number): Promise<void> {
        await this.postsService.remove(id);
    }
}
