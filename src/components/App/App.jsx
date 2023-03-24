import { useEffect, useReducer } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Modal } from 'components/Modal/Modal';
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
  TOGGLE_MODAL,
  STATUS,
  MODAL_PHOTO,
  GALLERY,
} = type;
const { REJECTED, RESOLVED, PENDING, IDLE } = status;

export const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    search: '',
    page: 1,
    gallery: [],
    isOpenModal: false,
    modalPhoto: {},
    status: IDLE,
  });
  const { search, page, gallery, isOpenModal, modalPhoto, status } = state;

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

  const toggleModal = () => {
    dispatch({ type: TOGGLE_MODAL });
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

  const onImage = ({ target: { nodeName, id } }) => {
    if (nodeName === 'IMG') {
      const modalPhoto = gallery.find(image => image.id === Number(id));

      dispatch({ type: MODAL_PHOTO, payload: modalPhoto });
      toggleModal();
    }
  };

  return (
    <AppStyle>
      <Searchbar onSearch={onSearch}></Searchbar>
      <Gallery gallery={gallery} onImage={onImage} />
      <Button onLoadMore={onLoadMore} status={status} />
      {isOpenModal && (
        <Modal modalPhoto={modalPhoto} toggleModal={toggleModal} />
      )}
      <ToastContainer />
    </AppStyle>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case SEARCH:
      return { ...state, search: action.payload };
    case INIT_PAGE:
      return { ...state, page: action.payload };
    case NEXT_PAGE:
      return { ...state, page: state.page + action.payload };
    case TOGGLE_MODAL:
      return { ...state, isOpenModal: !state.isOpenModal };
    case STATUS:
      return { ...state, status: action.payload };
    case MODAL_PHOTO:
      return { ...state, modalPhoto: action.payload };
    case GALLERY:
      return {
        ...state,
        gallery:
          state.page === 1
            ? action.payload
            : [...state.gallery, ...action.payload],
      };
    default:
      return state;
  }
};
