import { useEffect, useReducer } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppStyle } from './AppStyle';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Gallery } from 'components/Gallery/Gallery';
import { API } from 'api/api';
import { Button } from 'components/Button/Button';
import { type, status } from 'constants';

const {
  SEARCH,
  INIT_PAGE,
  NEXT_PAGE,
  STATUS,
  GALLERY,
} = type;
const { REJECTED, RESOLVED, PENDING, IDLE } = status;

export const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    search: '',
    page: 1,
    gallery: [],
    status: IDLE,
  });
  const { search, page, gallery, status } = state;

  const onSearch = ({ image }) => {
    if (!image.trim()) {
      toast.info('Please, enter the text');
      return;
    }

    if (image === search) {
      toast.info(`The results of the search "${image}" are already displayed!`);
      return;
    }

    dispatch({ type: SEARCH, payload: image });
    dispatch({ type: INIT_PAGE, payload: 1 });
    dispatch({ type: GALLERY, payload: [] });
  };

  const onLoadMore = () => {
    dispatch({ type: NEXT_PAGE, payload: 1 });
  };

  useEffect(() => {
    if (!search) {
      return;
    }

    dispatch({ type: STATUS, payload: PENDING });
    API.fetchImage(search, page)
      .then(r => {
        const images = r.data.hits;

        dispatch({ type: GALLERY, payload: images });
        dispatch({ type: STATUS, payload: RESOLVED });
      })
      .catch(e => {
        toast.error(e.message);
        dispatch({ type: STATUS, payload: REJECTED });
      });
  }, [search, page]);

  return (
    <AppStyle>
      <Searchbar onSearch={onSearch}></Searchbar>
      <Gallery gallery={gallery} />
      <Button onLoadMore={onLoadMore} status={status} />
      <ToastContainer />
    </AppStyle>
  );
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SEARCH:
      return { ...state, search: payload };
    case INIT_PAGE:
      return { ...state, page: payload };
    case NEXT_PAGE:
      return { ...state, page: state.page + payload };
    case STATUS:
      return { ...state, status: payload };
    case GALLERY:
      return {
        ...state,
        gallery: state.page === 1 ? payload : [...state.gallery, ...payload],
      };
    default:
      return state;
  }
};
