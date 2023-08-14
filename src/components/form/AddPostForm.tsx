import React, {FC} from 'react';
import {useTypedDispatch, useTypedSelector} from "../../store/store";
import {addPost} from "../../store/PostActions";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "antd";
import {PostsTypes} from "../../entitysData/models/Posts.types";

interface FormValues {
    title: string;
    body: string;
}
interface Props {
    onAddPost: (post: PostsTypes) => void;
}
const AddPostForm: FC<Props> = ({onAddPost}) => {
  const allPosts: PostsTypes[] = useTypedSelector((state) => state.postReducer.posts);
  const dispatch = useTypedDispatch();
  const initialValues: FormValues = {
    title: "",
    body: ""
  };

  const handleSubmit = (values: FormValues) => {
    const newPost: PostsTypes = {
      id: allPosts.length + 1,
      title: values.title,
      body: values.body,
    };
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
            htmlType="submit">
                      Add post
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddPostForm;