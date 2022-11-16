import PostTitle from "./post-title"

type Props = {
    title: string
    coverImage: string
    date: string
}

const PostHeader = ({ title, coverImage, date }: Props) => {
    return (
        <div>
            <PostTitle>{title}</PostTitle>
        </div>
    )
}

export default PostHeader