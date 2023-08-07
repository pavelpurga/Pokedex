import React, {FC} from 'react';
import {PostsTypes} from "../../models/Posts.types";
import {Button, Card} from "antd";

interface PostProps{
    post: PostsTypes,
    remove: (post:PostsTypes) => void,
    update: (post:PostsTypes) => void
}

const Post :FC<PostProps> = ({post,remove,update}) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation()
    remove(post)
  }
  const handleUpdate = (event: React.MouseEvent) => {
    const title = prompt() || ""
    update({...post, title})
  }

  return (
    <Card className="post" onClick={handleUpdate}>
      {post.id}. {post.title}
      <Button onClick={handleRemove}>Delete</Button>
    </Card>
  );
};

export default Post;