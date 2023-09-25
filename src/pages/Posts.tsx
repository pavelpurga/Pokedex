import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Post from "../components/post/Post";
import {Button, Divider, Modal, Pagination, Spin} from "antd";
import AddPostForm from "../components/form/AddPostForm";
import {useTypedDispatch} from "../store/store";
import {PostsTypes} from "../entitysData/models/Posts.types";
import {fetchPostImages} from "../api/PostImageApi";
import {addPost} from "../store/Post/PostSlice";
import {ROUTES} from "../entitysData/constants/API_ROUTS";
import {useTranslation} from "react-i18next";
import {injectApi} from "../store/Post/Posts.api";


const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const startIndex = (currentPage - 1 ) * pageSize;
  const endIndex = startIndex + pageSize;
  const navigate = useNavigate();
  const dispatch = useTypedDispatch()
  const [isModalVisible, setModalVisible] = useState(false);
  const [postImages, setPostImages] = useState<string[]>([]);
  const{data: posts,error,isLoading} = injectApi.useFetchAllPostsQuery(100)
  const [allPosts,setAllPosts] = useState<PostsTypes[]>(()=>{
    const localStoragePosts = JSON.parse(localStorage.getItem('postList') || '[]') as PostsTypes[];
    return localStoragePosts;
  });
  const { t } = useTranslation();
  useEffect(() => {
    if (Array.isArray(posts)) {
      setAllPosts((prevList) => [...prevList, ...posts]);
    }
  }, [posts]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchPostImages(allPosts);
      setPostImages(images);
    };
    fetchImages();
  }, [allPosts]);

  useEffect(() => {
    const localStoragePosts = JSON.parse(localStorage.getItem('postList') || '[]') as PostsTypes[];
    setAllPosts(localStoragePosts);
    const localStorageImages = JSON.parse(localStorage.getItem('postImages') || '[]') as string[];
    setPostImages(localStorageImages);
  }, []);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleButtonClick = (route:any) => {
    navigate(route);
  };
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddPost = async (post: PostsTypes) => {
    dispatch(addPost(post));
    const updatedPosts = [post, ...allPosts];
    setAllPosts(updatedPosts);
    localStorage.setItem('postList', JSON.stringify(updatedPosts));
    const images = await fetchPostImages(updatedPosts);
    setPostImages(images);
    localStorage.setItem('postImages', JSON.stringify(images));
  };

  return (
    <div>
      <div>
        <div className="header">
          <h1 className="text">Pokemon's posts</h1>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginBottom:20}}>
          <button className="btn"
            onClick={() => handleButtonClick(ROUTES.ABOUT)}>
            {t('Home')}
          </button>
          <button className="btn"
            onClick={() => handleButtonClick(ROUTES.POKEMON_LIST)}>
            {t('Pokedex')}
          </button>
        </div>
      </div>
      <div className="post__list" >
        <Button className="button_add" onClick={openModal}>{t('Add new post in local')}</Button>
        <Modal
          title={t('Adding posts')}
          open={isModalVisible}
          onCancel={closeModal}
          footer={null}
        >
          <AddPostForm closeModal={closeModal} onAddPost={handleAddPost}/>
        </Modal>
        {isLoading && <Spin style={{display: "flex",justifyContent:"center"}}/>}
        {error && <h1>Loading Error</h1>}
        {allPosts && allPosts.slice(startIndex,endIndex).map((post,index)=>(
          <div key={post.id}>
            <Post post={post} image = {postImages.find((img, index) => index === post.id)} />
          </div>
        ))}
      </div>
      {allPosts && (
        <div>
          <Divider />
          <Pagination
            current={currentPage}
            defaultPageSize={pageSize}
            total={allPosts.length}
            onChange={handlePageChange}
            style={{ marginBottom: '20px', display:"flex", justifyContent:"center" }}
          />
        </div>
      )}
    </div>
  );
};

export default Posts;