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
import {Post as PostInterface} from "./interface/post.interface";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostExistPipe} from "./pipes/post-exist.pipe";

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    findALl(@Query('search') search?: string) {
        const extractAllPosts = this.postsService.findAll();

        if (search) {
            return extractAllPosts.filter(singlePost => singlePost.title.toLowerCase().includes(search.toLowerCase()));
        }

        return extractAllPosts;
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe, PostExistPipe) id: number) {
        return this.postsService.findOne(id)
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }))
    create(@Body() post: CreatePostDto) {
        return this.postsService.create(post);
    }

    @Put(":id")
    update(@Param('id', ParseIntPipe, PostExistPipe) id: number, @Body() post: Partial<Omit<PostInterface, 'id' | 'createdAt'>>) {
        return this.postsService.update(id, post);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe, PostExistPipe) id: number) {
        return this.postsService.remove(id);
    }
}
