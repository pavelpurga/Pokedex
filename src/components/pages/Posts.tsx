import React from 'react';
import {useNavigate} from "react-router-dom";
import {postsAPI} from "../../api/PostsApi";
import Post from "../post/Post";
import {Button, Spin} from "antd";
import {PostsTypes} from "../../models/Posts.types";

const Posts = () => {
  const navigate = useNavigate();
  const{data: posts,error,isLoading} = postsAPI.useFetchAllPostsQuery(120)
  const [createPost,{error:createError,isLoading: createIsLoading}] = postsAPI.useCreatePostMutation()
  const [updatePost,{error:updateError,isLoading: updateIsLoading}] = postsAPI.useUpdatePostMutation()
  const [deletePost,{error:deleteError,isLoading: deleteIsLoading}] = postsAPI.useDeletePostMutation()
    
  const handleButtonClick = (route:any) => {
    navigate(route);
  };
  const handleCreate = async () => {
    const title = prompt();
    await createPost({title,body:title} as PostsTypes)
  }
  const handleRemove= (post : PostsTypes)=>{
    deletePost(post)
  }
  const handleUpdate= (post : PostsTypes)=>{
    updatePost(post)
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
        <Button onClick={handleCreate}>Add new post</Button>
        {deleteIsLoading && <h1>Loading of delete...</h1>}
        {deleteError && <h1>Delete Error</h1>}
        {updateIsLoading && <h1>Loading of update...</h1>}
        {updateError && <h1>Create Error</h1>}
        {createIsLoading && <h1>Loading of create...</h1>}
        {createError && <h1>Create Error</h1>}
        {isLoading && <Spin/>}
        {error && <h1>Loading Error</h1>}
        {posts && posts.map(post=>
          <Post remove={handleRemove} update={handleUpdate} key={post.id} post ={post}/>
        )}
      </div>
    </div>
  );
};

export default Posts;