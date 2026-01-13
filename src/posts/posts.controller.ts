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
    Query
} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {Post as PostInterface} from "./interface/post.interface";

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {
    }

    @Get()
    findALl(@Query('search') search?: string) {
        const extractAllPosts = this.postsService.findAll();

        if (search) {
            return extractAllPosts.filter(singlePost => singlePost.title.toLowerCase().includes(search.toLowerCase()));
        }

        return extractAllPosts;
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.findOne(id)
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() post: Omit<PostInterface, 'id' | 'createdAt'>) {
        return this.postsService.create(post);
    }

    @Put(":id")
    update(@Param('id', ParseIntPipe) id: number, @Body() post: Partial<Omit<PostInterface, 'id' | 'createdAt'>>) {
        return this.postsService.update(id, post);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.remove(id);
    }
}
