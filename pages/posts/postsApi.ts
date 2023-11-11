import axios from "axios";
import { Post } from "./type";

export async function getPosts(): Promise<Post[]> {
    const response = await axios("https://jsonplaceholder.typicode.com/posts")

    const posts: Post[] = await response.data

    return posts
}

export async function getPost(id: number | string): Promise<Post> {
    const response = await axios(`https://jsonplaceholder.typicode.com/posts/${id}`)

    const post: Post = await response.data

    return post
}