import {Injectable, NotFoundException} from '@nestjs/common';
import {PostInterface} from "./interface/post.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Post} from "./entities/post.entity"

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    )

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

    async create(createPostData: Omit<PostInterface, 'id' | 'createdAt'>): PostInterface {
        const newPost: PostInterface = {
            id: this.getNextId(),
            ...createPostData,
            createdAt: new Date()
        }

        this.posts.unshift(newPost);

        return newPost;
    }

    private getNextId(): number {
        return this.posts.length > 0 ? Math.max(...this.posts.map(post => post.id)) + 1 : 1;
    }

    update(id: number, updatePostData: Partial<Omit<PostInterface, 'id' | 'createdAt'>>) {
        const currentPostIndexToEdit = this.posts.findIndex(post => post.id === id);

        if (currentPostIndexToEdit === -1) {
            throw new NotFoundException("Post not found.");
        }

        this.posts[currentPostIndexToEdit] = {
            ...this.posts[currentPostIndexToEdit],
            ...updatePostData,
            updatedAt: new Date()
        }

        return this.posts[currentPostIndexToEdit];
    }

    remove(id: number) {
        const postIndexToDelete = this.posts.findIndex(post => post.id === id);

        if (postIndexToDelete === -1) {
            throw new NotFoundException("Post not found.");
        }

        this.posts.splice(postIndexToDelete, 1);

        return {message: "Post deleted successfully."};
    }
}
