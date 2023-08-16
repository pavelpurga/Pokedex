import React, {FC} from 'react';
import {useTypedDispatch, useTypedSelector} from "../../store/store";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "antd";
import {PostsTypes} from "../../entitysData/models/Posts.types";
import {addPost} from "../../store/PostSlice";
import {postsAPI} from "../../api/PostsApi";

interface FormValues {
    title: string;
    body: string;
}
interface Props {
    onAddPost: (post: PostsTypes) => void;
}
const AddPostForm: FC<Props> = ({onAddPost}) => {
  const [createPost,{error:createError,isLoading: createIsLoading}] = postsAPI.useCreatePostMutation()
  const allPosts: PostsTypes[] = useTypedSelector((state) => state.postReducer.posts);
  const dispatch = useTypedDispatch();
  const initialValues: FormValues = {
    title: "",
    body: ""
  };

  const handleSubmit = (values: FormValues) => {
    const newPost: PostsTypes = {
      id: allPosts.length,
      title: values.title,
      body: values.body,
    };
    createPost(newPost)
    dispatch(addPost(newPost));
    const postList = JSON.parse(localStorage.getItem('postList') || '[]') as PostsTypes[];
    localStorage.setItem('postList', JSON.stringify([...postList, newPost]));
    onAddPost(newPost);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} >
      {({ values, handleChange, touched, errors }) => (
        <Form>

          <Field id="title" name="title" value={values.title}
            placeholder="Title"
            onChange={handleChange}
            className="form-control"
          />
          <ErrorMessage
            name="title" component="div" className="invalid-feedback" />
          
          <Field id="body" name="body" value={values.body}
            placeholder="Body"
            onChange={handleChange}
          />
          <ErrorMessage
            name="body" component="div" className="invalid-feedback" />


          <Button
            style={{marginLeft:'160px',marginTop:'10px'}}
            type="primary"
            htmlType="submit"
          >
                      Add post
          </Button>
          {createIsLoading && <h1>Loading of create...</h1>}
          {createError && <h1>Create Error</h1>}
        </Form>
      )}
    </Formik>
  );
};

export default AddPostForm;