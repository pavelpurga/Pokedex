import React, {FC, useEffect, useState} from 'react';
import { PostsTypes } from '../../entitysData/models/Posts.types';
import {Button, Card, Input} from 'antd';
import { useTypedDispatch } from '../../store/store';
import {updatePost} from "../../store/Post/PostSlice";
import {removePokemon} from "../../store/Pokemon/PokemonSlice";
import {injectApi} from "../../store/Post/Posts.api";

interface PostDetailsProps {
  post: PostsTypes;
  onClose: () => void;
}

const PostDetails: FC<PostDetailsProps> = ({ post, onClose}) => {
  const dispatch = useTypedDispatch();
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [isEditing, setEditing] = useState(false);
  const [updatePosts,{error:updateError,isLoading: updateIsLoading}] = injectApi.useUpdatePostMutation()
  const [deletePosts,{error:deleteError,isLoading: deleteIsLoading}] = injectApi.useDeletePostMutation()

  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
  }, [post]);
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    const updatedPost: PostsTypes = {
      ...post,
      title: title,
      body: body,
    };
    dispatch(updatePost(updatedPost));
    updatePosts(updatedPost)
    const postsList = JSON.parse(localStorage.getItem('postList') || '[]');
    const updatedPostsList = postsList.map((p: PostsTypes) =>
      p.id === post.id ? updatedPost : p
    );
    localStorage.setItem('postList', JSON.stringify(updatedPostsList));
    setTitle(postsList.title)
    setBody(postsList.body)
    setEditing(false);
  };

  const handleCancelClick = () => {
    setTitle(post.title);
    setBody(post.body);
    setEditing(false);
  };

  const handleRemove = () => {
    const result = window.confirm(`Are you sure you want to remove ${post.id} from localStorage?`);
    if (result) {
      const postsList = JSON.parse(localStorage.getItem('postList') || '[]');
      const updatedPostsList = postsList.filter((p: PostsTypes) => p.id !== post.id);
      localStorage.setItem('postList', JSON.stringify(updatedPostsList));
      dispatch(removePokemon(post.id));
      deletePosts(post)
    }
  }
    
  return (
    <div>
      <Card style={{marginBottom:5}} hoverable={true}>
          Title:{' '}
        {isEditing ? (
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        ) : (
          title
        )}
      </Card>
      <Card hoverable={true}>
          Body:{' '}
        {isEditing ? (
          <Input.TextArea value={body} onChange={(e) => setBody(e.target.value)} />
        ) : (
          body
        )}
      </Card>
      {deleteIsLoading && <h1>Loading of delete...</h1>}
      {deleteError && <h1>Delete Error</h1>}
      {updateIsLoading && <h1>Loading of update...</h1>}
      {updateError && <h1>Create Error</h1>}
      {isEditing ? (
        <div style={{margin:10}}>
          <Button onClick={handleSaveClick}>Save</Button>
          <Button style={{marginLeft:15}} onClick={handleCancelClick}>Cancel</Button>
        </div>
      ) : (
        <div style={{marginTop:10}}>
          <Button onClick={handleEditClick}>Change</Button>
        </div>
      )}
      <div style={{display:"flex", justifyContent: "end"}}>
        <Button onClick={handleRemove}>Delete</Button>
        <Button style={{marginLeft:15}} onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default PostDetails;