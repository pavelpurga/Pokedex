import React, {FC, useState} from 'react';
import {PostsTypes} from "../../models/Posts.types";
import {Button, Card, Modal} from "antd";
import PostDetails from "./PostDetails";
interface PostProps{
    post: PostsTypes,
}

const Post :FC<PostProps> = ({post}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div style={{marginTop:15 ,display:"flex", justifyContent:"center"}}>
      <Card
        title={post.title}
        style={{ width: 650 }}
        className="post"
        hoverable={true}
        extra={<Button onClick={openModal}>More</Button>}
      >
        {post.body}
        <Modal
          title="Post Details"
          open={isModalVisible}
          onCancel={closeModal}
          footer={null}
        >
          <PostDetails post={post} onClose={closeModal} />
        </Modal>
      </Card>
    </div>
  );
};

export default Post;