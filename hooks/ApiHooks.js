import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {appId, baseUrl} from '../utils/variables';

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
  const {update} = useContext(MainContext);
  const [mediaArray, setMediaArray] = useState([]);
  const loadMedia = async () => {
    try {
      const result = await useTag().getFilesByTag(appId + '_mediafile');
      const media = await Promise.all(
        result.map(async (file) => {
          return await doFetch(baseUrl + 'media/' + file.file_id);
        })
      );
      setMediaArray(media.reverse());
    } catch (error) {
      throw new Error('loadMediaError: ' + error.message);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [update]);

  const postMedia = async (fileData, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: fileData,
    };
    try {
      return await doFetch(baseUrl + 'media', options);
    } catch (error) {
      throw new Error('postMediaError: ' + error.message);
    }
  };

  const modifyMedia = async (fileData, fileId, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fileData),
    };
    try {
      return await doFetch(baseUrl + 'media/' + fileId, options);
    } catch (error) {
      throw new Error('modifyMediaError: ' + error.message);
    }
  };

  const deleteMedia = async (fileId, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'media/' + fileId, options);
    } catch (error) {
      throw new Error('deleteMediaError: ' + error.message);
    }
  };
  return {mediaArray, postMedia, modifyMedia, deleteMedia};
};

const useFavourite = () => {
  const loadFavouritesByFileId = async (fileId) => {
    try {
      return await doFetch(baseUrl + 'favourites/file/' + fileId);
    } catch (error) {
      throw new Error('getFavoriteError: ' + error.message);
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
      throw new Error('addFavouriteError: ' + error.message);
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
      throw new Error('deleteFavouriteError: ' + error.message);
    }
  };

  return {loadFavouritesByFileId, addFavourite, removeFavourite};
};

const useComment = () => {
  const loadCommentsByFileId = async (fileId) => {
    try {
      return await doFetch(baseUrl + 'comments/file/' + fileId);
    } catch (error) {
      throw new Error('getCommentError: ' + error.message);
    }
  };
  return {loadCommentsByFileId};
};

const useRating = () => {
  const loadRatingsByFileId = async (fileId) => {
    try {
      return await doFetch(baseUrl + 'ratings/file/' + fileId);
    } catch (error) {
      throw new Error('getRatingError: ' + error.message);
    }
  };
  return {loadRatingsByFileId};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + 'tags/' + tag);
    } catch (error) {
      throw new Error('getFilesByTagError: ' + error.message);
    }
  };
  const postTag = async (fileId, tag, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id: fileId, tag: tag}),
    };
    try {
      return await doFetch(baseUrl + 'tags', options);
    } catch (error) {
      throw new Error('postTagError: ' + error.message);
    }
  };
  const getAllTagsByFileId = async (fileId) => {
    try {
      return await doFetch(baseUrl + 'tags/file/' + fileId);
    } catch (error) {
      throw new Error('getAllTagsByFileIdError: ' + error.message);
    }
  };

  return {
    getFilesByTag,
    postTag,
    getAllTagsByFileId,
  };
};

const useAuthentication = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      const loginResult = await doFetch(baseUrl + 'login', options);
      return loginResult;
    } catch (error) {
      throw new Error('postLogin: ' + error.message);
    }
  };
  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      return await doFetch(baseUrl + 'users/user', options);
    } catch (error) {
      throw new Error('checkUser: ' + error.message);
    }
  };

  const postUser = async (userData) => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    try {
      const loginResult = await doFetch(baseUrl + 'users', options);
      return loginResult;
    } catch (error) {
      throw new Error('postUser: ' + error.message);
    }
  };

  const checkUsername = async (username) => {
    try {
      const result = await doFetch(baseUrl + 'users/username/' + username);
      return result.available;
    } catch (error) {
      throw new Error('checkUsername: ' + error.message);
    }
  };

  const getUserById = async (id, token) => {
    try {
      return await doFetch(baseUrl + 'users/' + id, {
        headers: {'x-access-token': token},
      });
    } catch (error) {
      throw new Error('getUserById, ' + error.message);
    }
  };

  return {getUserByToken, postUser, checkUsername, getUserById};
};

export {
  useMedia,
  useUser,
  useFavourite,
  useComment,
  useRating,
  useTag,
  useAuthentication,
};
