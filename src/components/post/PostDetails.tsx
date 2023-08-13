import React, { FC, useState } from 'react';
import { PostsTypes } from '../../entity\'sData/models/Posts.types';
import {Button, Card, Input, Tag} from 'antd';
import { useTypedDispatch } from '../../store/store';
import { updatePost } from '../../store/PostActions';
import {removePokemon} from "../../store/PokemonActions";

interface PostDetailsProps {
  post: PostsTypes;
  onClose: () => void;
}

const PostDetails: FC<PostDetailsProps> = ({ post, onClose }) => {
  const dispatch = useTypedDispatch();
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [isEditing, setEditing] = useState(false);

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
    const postsList = JSON.parse(localStorage.getItem('postList') || '[]');
    const updatedPostsList = postsList.map((p: PostsTypes) =>
      p.id === post.id ? updatedPost : p
    );
    localStorage.setItem('postList', JSON.stringify(updatedPostsList));

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
    }
  }
    
  return (
    <div>
      <Tag style={{marginBottom:5}}>{post.id}</Tag>
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