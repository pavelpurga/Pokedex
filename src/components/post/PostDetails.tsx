import React, { FC, useState } from 'react';
import { PostsTypes } from '../../models/Posts.types';
import { Button, Input } from 'antd';
import { useTypedDispatch } from '../../store/store';
import { updatePost } from '../../store/PostActions';

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

    // Save to localStorage if needed
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

  return (
    <div>
      <div>ID: {post.id}</div>
      <div>
          Title:{' '}
        {isEditing ? (
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        ) : (
          title
        )}
      </div>
      <div>
          Body:{' '}
        {isEditing ? (
          <Input.TextArea value={body} onChange={(e) => setBody(e.target.value)} />
        ) : (
          body
        )}
      </div>
      {isEditing ? (
        <div>
          <Button onClick={handleSaveClick}>Save</Button>
          <Button onClick={handleCancelClick}>Cancel</Button>
        </div>
      ) : (
        <Button onClick={handleEditClick}>Change</Button>
      )}
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

export default PostDetails;