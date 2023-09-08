import axios from "axios";
import {PostsTypes} from "../entitysData/models/Posts.types";

export const fetchPostImages = async (allPosts : PostsTypes[]) => {
  const imagePromises = allPosts.map(async (post) => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        headers: {
          Authorization: process.env.REACT_APP_API_KEY,
        },
        params: {
          query: 'nature',
          per_page: 115,
        },
      });

      const photos = response.data.photos;
      if (photos.length > 0) {
        const randomIndex = Math.floor(Math.random() * photos.length);
        return photos[randomIndex].src.small;
      } else {
        return '';
      }
    } catch (error) {
      console.log('Error fetching image:', error);
      return '';
    }
  });

  const images = await Promise.all(imagePromises);
  return images;
};