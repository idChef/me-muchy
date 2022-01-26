export interface Post{
    id: string,
    user_id: string,
    title: string,
    picture: string,
    n_like: number,
    n_unlike: 0,
    tag: string
}

export interface User{
    id: string,
    userName: string,
    password: string,
    email: string,
    avatar: string,
    isBanned: boolean,
    likes: number
}