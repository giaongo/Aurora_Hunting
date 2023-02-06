import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

const doFetch = async (url, options = null) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const loadMedia = async () => {
    try {
      const result = await doFetch(baseUrl + 'media');
      const media = await Promise.all(
        result.map(async (file) => {
          return await doFetch(baseUrl + 'media/' + file.file_id);
        })
      );
      setMediaArray(media);
    } catch (error) {
      console.error('loadMediaError', error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);
  return mediaArray;
};

const useUser = () => {
  const getUserById = async (userId, token) => {
    const options = {
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'users/' + userId, options);
    } catch (error) {
      console.error('getUserByIdError', error);
    }
  };
  return {getUserById};
};

const useFavourite = () => {
  const loadFavouritesByFileId = async (fileId) => {
    try {
      return await doFetch(baseUrl + 'favourites/file/' + fileId);
    } catch (error) {
      console.error('getFavoriteError', error);
    }
  };

  const addFavourite = async (fileId, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id: fileId}),
    };
    try {
      return await doFetch(baseUrl + 'favourites', options);
    } catch (error) {
      console.error('addFavouriteError', error);
    }
  };

  const removeFavourite = async (fileId, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'favourites/file/' + fileId, options);
    } catch (error) {
      console.error('deleteFavouriteError', error);
    }
  };

  return {loadFavouritesByFileId, addFavourite, removeFavourite};
};

const useComment = () => {
  const loadCommentsByFileId = async (fileId) => {
    try {
      return await doFetch(baseUrl + 'comments/file/' + fileId);
    } catch (error) {
      console.error('getCommentError', error);
    }
  };
  return {loadCommentsByFileId};
};

const useRating = () => {
  const loadRatingsByFileId = async (fileId) => {
    try {
      return await doFetch(baseUrl + 'ratings/file/' + fileId);
    } catch (error) {
      console.error('getRatingError', error);
    }
  };
  return {loadRatingsByFileId};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + 'tags/' + tag);
    } catch (error) {
      console.error('getFilesByTagError', error);
    }
  };
  return {getFilesByTag};
};
export {useMedia, useUser, useFavourite, useComment, useRating, useTag};
