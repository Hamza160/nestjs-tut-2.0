import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Post} from "./entities/post.entity"
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {User, UserRole} from "../auth/entities/user.entity";

@Injectable()
export class PostsService {

    // @ts-ignore
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) {
    }

    async findAll(): Promise<Post[]> {
        return this.postRepository.find({
            relations: ['authorName']
        });
    }

    async findOne(id: number) {
        const singlePost = await this.postRepository.findOne({
            where: {id},
            relations: ['authorName']
        });
        if (!singlePost) {
            throw new NotFoundException("Post not found.");
        }
        return singlePost;
    }

    async create(createPostData: CreatePostDto, authorName: User): Promise<Post> {
        const newlyCreatedPost = this.postRepository.create({
            title: createPostData.title,
            content: createPostData.content,
            authorName,
        });

        return this.postRepository.save(newlyCreatedPost);
    }

    async update(id: number, updatePostData: UpdatePostDto, user: User): Promise<Post> {
        const findPostToUpdate = await this.findOne(id);

        if (findPostToUpdate.authorName?.id != user.id && user.role !== UserRole.ADMIN) {
            throw new ForbiddenException("You can only update oyur own post");
        }

        if (updatePostData.title) {
            findPostToUpdate.title = updatePostData.title;
        }

        if (updatePostData.content) {
            findPostToUpdate.content = updatePostData.content;
        }

        return this.postRepository.save(findPostToUpdate);
    }

    async remove(id: number): Promise<void> {
        const findPostToRemove = await this.findOne(id);
        await this.postRepository.remove(findPostToRemove);
    }
}
