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

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {
    }

    @Get()
    findALl(@Query('search') search?: string) {
        const extractAllPosts = this.postsService.findAll();

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
    update(@Param('id', ParseIntPipe, PostExistPipe) id: number, @Body() post: UpdatePostDto) {
        return this.postsService.update(id, post);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe, PostExistPipe) id: number) {
        return this.postsService.remove(id);
    }
}
