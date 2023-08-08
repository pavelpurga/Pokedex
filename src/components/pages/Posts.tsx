import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {postsAPI} from "../../api/PostsApi";
import Post from "../post/Post";
import {Button, Modal, Spin} from "antd";
import {PostsTypes} from "../../models/Posts.types";
import {addPost} from "../../store/PostActions";
import AddPostForm from "../form/AddPostForm";
import {useTypedDispatch} from "../../store/store";

const Posts = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch()
  const [isModalVisible, setModalVisible] = useState(false);
  const{data: posts,error,isLoading} = postsAPI.useFetchAllPostsQuery(100)
  const [allPosts,setAllPosts] = useState<PostsTypes[]>(()=>{
    const localStoragePosts = JSON.parse(localStorage.getItem('postList') || '[]') as PostsTypes[];
    return localStoragePosts;
  });
  useEffect(() => {
    if (Array.isArray(posts)) {
      setAllPosts((prevList) => [...posts, ...prevList]);
    }
  }, [posts]);

  const handleButtonClick = (route:any) => {
    navigate(route);
  };
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddPost = (post: PostsTypes) => {
    dispatch(addPost(post));
  }

  return (
    <div>
      <div>
        <div className="header">
          <h1 className="text">Pokemon's posts</h1>
        </div>
        <button className="btn"
          onClick={() => handleButtonClick('/about')}>
              Home
        </button>
        <button className="btn"
          onClick={() => handleButtonClick('/pokemonList')}>
              Pokedex
        </button>
      </div>
      <div className="post__list">
        <Button onClick={openModal}>Add new post</Button>
        <Modal
          title="Adding posts"
          open={isModalVisible}
          onCancel={closeModal}
          footer={null}
        >
          <AddPostForm onAddPost={handleAddPost}/>
        </Modal>
        {isLoading && <Spin style={{display: "flex",justifyContent:"center"}}/>}
        {error && <h1>Loading Error</h1>}
        {allPosts && allPosts.map(post=>
          <Post key={post.id} post ={post}/>
        )}
      </div>
    </div>
  );
};

export default Posts;