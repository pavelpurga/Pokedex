import React, {FC} from 'react';
import {useTypedDispatch} from "../../store/store";
import {ErrorMessage, Form, Formik, FormikHelpers} from "formik";
import {Button, Input} from "antd";
import {PostsTypes} from "../../entitysData/models/Posts.types";
import {addPost} from "../../store/Post/PostSlice";
import {useTranslation} from "react-i18next";
import TextArea from "antd/es/input/TextArea";
import {injectApi} from "../../store/Post/Posts.api";

interface FormValues {
    title: string;
    body: string;
}
interface Props {
    onAddPost: (post: PostsTypes) => void;
    closeModal: () => void;
}
const AddPostForm: FC<Props> = ({onAddPost,closeModal}) => {
  const [createPost,{error:createError,isLoading: createIsLoading}] = injectApi.useCreatePostMutation()
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const initialValues: FormValues = {
    title: "",
    body: ""
  };

  const handleSubmit = (values: FormValues,{ resetForm }: FormikHelpers<FormValues>) => {
    const newPost: PostsTypes = {
      id: Math.floor(Math.random() * 100) + 101,
      title: values.title,
      body: values.body,
    };
    createPost(newPost)
    dispatch(addPost(newPost));
    const postList = JSON.parse(localStorage.getItem('postList') || '[]') as PostsTypes[];
    localStorage.setItem('postList', JSON.stringify([newPost,...postList]));
    onAddPost(newPost);
    closeModal();
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} >
      {({ values, handleChange, touched, errors }) => (
        <Form>

          <Input style={{marginBottom:5}} id="title" name="title" value={values.title}
            placeholder={t("Title")}
            onChange={handleChange}
            className="form-control"
          />
          <ErrorMessage
            name="title" component="div" className="invalid-feedback" />
          
          <TextArea id="body" name="body" value={values.body}
            placeholder={t("Body")}
            onChange={handleChange}
          />
          <ErrorMessage
            name="body" component="div" className="invalid-feedback" />


          <Button
            style={{marginLeft:'160px',marginTop:'10px'}}
            type="primary"
            htmlType="submit"
          >
            {t('Add post')}
          </Button>
          {createIsLoading && <h1>Loading of create...</h1>}
          {createError && <h1>Create Error</h1>}
        </Form>
      )}
    </Formik>
  );
};

export default AddPostForm;