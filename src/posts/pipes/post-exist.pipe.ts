import {ArgumentMetadata, Injectable, NotFoundException, PipeTransform} from "@nestjs/common";
import {PostsService} from "../posts.service";

@Injectable()
export class PostExistPipe implements PipeTransform {
    constructor(private readonly postsService: PostsService) {
    }

    transform(value: any, metadata: ArgumentMetadata): any {
        try {
            this.postsService.findOne(value);
        } catch (e) {
            throw new NotFoundException(`Post with ${value} not found`);
        }

        return value;
    }
}