import axios from "axios";
import {PostsTypes} from "../entity'sData/models/Posts.types";

export const fetchPostImages = async (allPosts : PostsTypes[]) => {
  const imagePromises = allPosts.map(async (post) => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        headers: {
          Authorization: 'PSt9K39lJ0GvSolnmXxGpStqzbFS593dz7jvn7pEcOpK2IfFd1Q8i4SG',
        },
        params: {
          query: 'nature',
          per_page: 1,
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