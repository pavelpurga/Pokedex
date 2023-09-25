import React, {FC, useState} from 'react';
import {Button, Card, Modal} from "antd";
import PostDetails from "./PostDetails";
import {PostsTypes} from "../../entitysData/models/Posts.types";
interface PostProps{
    post: PostsTypes,
    image: string | undefined;
}

const Post : FC<PostProps> = ({post,image}) => {
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
        title={<p className="postTitle">{post.title}</p>}
        style={{ width: 650 }}
        className="post"
        hoverable={true}
        extra={<Button className="button_more_post" onClick={openModal}>More</Button>}
      >
        <div style={{display:"flex"}}>
          {image && <img src={image}  style={{width:80,height:130}} />}
          <div style={{ marginLeft: 10, height: 100,width:500,columnCount: 1,overflow:"auto"}}>
            {post.body}
          </div>
        </div>
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