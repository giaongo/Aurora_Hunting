import {useEffect, useState} from 'react';
import {basesUrl} from '../utils/variables';

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
      const result = await doFetch(basesUrl + 'media');
      const media = await Promise.all(
        result.map(async (file) => {
          return await doFetch(basesUrl + 'media/' + file.file_id);
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

const useFavourite = () => {
  const loadFavouritesByFileId = async (fileId) => {
    try {
      return await doFetch(basesUrl + 'favourites/file/' + fileId);
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
      return await doFetch(basesUrl + 'favourites', options);
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
      return await doFetch(basesUrl + 'favourites/file/' + fileId, options);
    } catch (error) {
      console.error('deleteFavouriteError', error);
    }
  };

  return {loadFavouritesByFileId, addFavourite, removeFavourite};
};

export {useMedia, useFavourite};
