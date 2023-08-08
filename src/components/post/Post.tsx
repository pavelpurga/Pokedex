import React, {FC, useState} from 'react';
import {PostsTypes} from "../../models/Posts.types";
import {Button, Card, Modal} from "antd";
import {removePokemon} from "../../store/PokemonActions";
import {useTypedDispatch} from "../../store/store";
import PostDetails from "./PostDetails";

interface PostProps{
    post: PostsTypes,
}

const Post :FC<PostProps> = ({post}) => {
  const dispatch = useTypedDispatch()
  const [isModalVisible, setModalVisible] = useState(false);
  const handleRemove = () => {
    const result = window.confirm(`Are you sure you want to remove ${post.id} from localStorage?`);
    if (result) {
      const postsList = JSON.parse(localStorage.getItem('postList') || '[]');
      const updatedPostsList = postsList.filter((p: PostsTypes) => p.id !== post.id);
      localStorage.setItem('postList', JSON.stringify(updatedPostsList));
      dispatch(removePokemon(post.id));
    }
  }

  const handleUpdate = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Card className="post" onClick={handleUpdate}>
      {post.id}. {post.title}
      <Button onClick={handleRemove}>Delete</Button>
      <Modal
        title="Post Details"
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <PostDetails post={post} onClose={closeModal} />
      </Modal>
    </Card>
  );
};

export default Post;