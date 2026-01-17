import {Injectable, NotFoundException} from '@nestjs/common';
import {PostInterface} from "./interface/post.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Post} from "./entities/post.entity"
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";

@Injectable()
export class PostsService {

    // @ts-ignore
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) {
    }

    async findAll(): Promise<Post[]> {
        return this.postRepository.find();
    }

    async findOne(id: number) {
        const singlePost = await this.postRepository.findOneBy({id});
        if (!singlePost) {
            throw new NotFoundException("Post not found.");
        }
        return singlePost;
    }

    async create(createPostData: CreatePostDto): Promise<Post> {
        const newlyCreatedPost = this.postRepository.create({
            title: createPostData.title,
            content: createPostData.content,
            authorName: createPostData.authorName,
        });

        return this.postRepository.save(newlyCreatedPost);
    }

    async update(id: number, updatePostData: UpdatePostDto): Promise<Post> {
        const findPostToUpdate = await this.findOne(id);

        if (updatePostData.title) {
            findPostToUpdate.title = updatePostData.title;
        }

        if (updatePostData.content) {
            findPostToUpdate.content = updatePostData.content;
        }

        if (updatePostData.authorName) {
            findPostToUpdate.authorName = updatePostData.authorName;
        }

        return this.postRepository.save(findPostToUpdate);
    }

    async remove(id: number): Promise<void> {
        const findPostToRemove = await this.findOne(id);
        await this.postRepository.remove(findPostToRemove);
    }
}
