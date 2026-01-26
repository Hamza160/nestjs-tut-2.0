import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../../auth/entities/user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    title: string;

    @Column({type: 'text'})
    content: string;

    @Column()
    authorName: string;

    @ManyToOne(() => User, (user) => user.posts)

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

}