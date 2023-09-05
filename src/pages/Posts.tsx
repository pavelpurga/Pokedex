import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {postsAPI} from "../api/PostsApi";
import Post from "../components/post/Post";
import {Button, Divider, Modal, Pagination, Radio, Spin} from "antd";
import AddPostForm from "../components/form/AddPostForm";
import {useTypedDispatch} from "../store/store";
import {PostsTypes} from "../entitysData/models/Posts.types";
import {fetchPostImages} from "../api/PostImageApi";
import {addPost} from "../store/PostSlice";
import {ROUTES} from "../entitysData/constants/API_ROUTS";
import i18n from "../entitysData/i18n/i18n";
import {useTranslation} from "react-i18next";


const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const startIndex = (currentPage - 1 ) * pageSize;
  const endIndex = startIndex + pageSize;
  const navigate = useNavigate();
  const dispatch = useTypedDispatch()
  const [isModalVisible, setModalVisible] = useState(false);
  const [postImages, setPostImages] = useState<string[]>([]);
  const{data: posts,error,isLoading} = postsAPI.useFetchAllPostsQuery(100)
  const [allPosts,setAllPosts] = useState<PostsTypes[]>(()=>{
    const localStoragePosts = JSON.parse(localStorage.getItem('postList') || '[]') as PostsTypes[];
    return localStoragePosts;
  });
  const { t } = useTranslation();
  const [selectedLanguage,setSelectedLanguage] = useState("en");

  useEffect(() => {
    if (Array.isArray(posts)) {
      setAllPosts((prevList) => [...posts, ...prevList]);
    }
  }, [posts]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchPostImages(allPosts);
      setPostImages(images);
    };
    fetchImages();
  }, [allPosts]);

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
    setAllPosts([...allPosts, post]);
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };
  return (
    <div>
      <div>
        <div className="header">
          <h1 className="text">Pokemon's posts</h1>
        </div>
        <Radio.Group value={selectedLanguage}>
          <Radio.Button value="ru" onChange={(e)=>handleLanguageChange(e.target.value)} >{t('RU')}</Radio.Button>
          <Radio.Button value="en" onChange={(e)=>handleLanguageChange(e.target.value)}>{t('EN')}</Radio.Button>
          <Radio.Button value="ua" onChange={(e)=>handleLanguageChange(e.target.value)}>{t('UA')}</Radio.Button>
        </Radio.Group>
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
          <AddPostForm onAddPost={handleAddPost}/>
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