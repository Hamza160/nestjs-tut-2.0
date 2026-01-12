import {Injectable, NotFoundException} from '@nestjs/common';
import {Post} from "./interface/post.interface";

@Injectable()
export class PostsService {
    private posts: Post[] = [
        {
            id: 1,
            title: "First",
            content: "Fist Post Content",
            authorName: "Hamza",
            createdAt: new Date(),
        }
    ];

    findAll() {
        return this.posts;
    }

    findOne(id: number) {
        const singlePost = this.posts.find(post => post.id === id);
        if (!singlePost) {
            throw new NotFoundException("Post not found.");
        }
        return singlePost;
    }

    create(createPostData: Omit<Post, 'id' | 'createdAt'>): Post {
        const newPost: Post = {
            id: this.getNextId(),
            ...createPostData,
            createdAt: new Date()
        }

        this.posts.unshift(newPost);

        return newPost;
    }

    private getNextId(): number {
        return this.posts.length ? 0 ? Math.max(...this.posts.map(post => post.id)) + 1 : 1;
    }
}
