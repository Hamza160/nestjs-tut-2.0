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
    Query, UsePipes, ValidationPipe
} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostExistPipe} from "./pipes/post-exist.pipe";
import {UpdatePostDto} from "./dto/update-post.dto";
import {Post as PostEntity} from './entities/post.entity'

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

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }))
    async create(@Body() post: CreatePostDto): Promise<PostEntity> {
        return this.postsService.create(post);
    }

    @Put(":id")
    async update(@Param('id', ParseIntPipe, PostExistPipe) id: number, @Body() post: UpdatePostDto): Promise<PostEntity> {
        return this.postsService.update(id, post);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', ParseIntPipe, PostExistPipe) id: number): Promise<void> {
        await this.postsService.remove(id);
    }
}
