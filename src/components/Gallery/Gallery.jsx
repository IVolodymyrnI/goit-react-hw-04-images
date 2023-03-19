import PropTypes from 'prop-types';
import { Component, Fragment } from 'react';
import { toast } from 'react-toastify';

import { GalleryItem } from 'components/ImageGalleryItem/GalleryItem';
import { GalleryStyle } from './GalleryStyle';
import { API } from 'api/api';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

const status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECT: 'reject',
};

export class Gallery extends Component {
  state = {
    gallery: [],
    error: '',
    isOpenModal: false,
    largeImage: {},
    status: status.IDLE,
  };

  toggleModal = () => {
    this.setState(prevState => ({ isOpenModal: !prevState.isOpenModal }));
  };

  onImage = e => {
    if (e.target.nodeName === 'IMG') {
      const id = e.target.id;
      const largeImageObj = this.state.gallery.find(image => image.id === id);
      const { largeImageURL, tags } = largeImageObj;

      this.setState({ largeImage: { largeImageURL, tags } });
      this.toggleModal();
    }
  };

  componentDidUpdate(prevProps) {
    const { search, page } = this.props;

    if (search !== prevProps.search || page !== prevProps.page) {
      this.fetchImage(search, page);
    }
  }

  fetchImage = async (value, page) => {
    this.setState({ status: status.PENDING });
    const isPageOne = page !== 1;

    try {
      const response = await API.fetchImage(value, page);
      const newImageObj = this.takeObjectPropeties(response.data.hits);

      this.setState(prevState => ({
        gallery: isPageOne
          ? [...prevState.gallery, ...newImageObj]
          : [...newImageObj],
      }));

      this.setState({ status: status.RESOLVED });
    } catch (error) {
      toast.error(error.message);
      this.setState({ status: status.REJECT });
    }
  };

  takeObjectPropeties = data => {
    return data.map(({ id, webformatURL, largeImageURL, tags }) => {
      const stringifiedId = String(id);

      return {
        id: stringifiedId,
        webformatURL,
        largeImageURL,
        tags,
      };
    });
  };

  render() {
    const { gallery, largeImage, isOpenModal, status } = this.state;
    const { onLoadMore } = this.props;
    let loadMore;

    if (status === 'idle' || status === 'reject') {
      loadMore = '';
    }

    if (status === 'pending') {
      loadMore = <Loader />;
    }

    if (status === 'resolved') {
      loadMore = <Button onLoadMore={onLoadMore} />;
    }

    return (
      <Fragment>
        <GalleryStyle onClick={this.onImage}>
          <GalleryItem gallery={gallery} />
        </GalleryStyle>
        {loadMore}
        {isOpenModal && (
          <Modal largeImage={largeImage} toggleModal={this.toggleModal} />
        )}
      </Fragment>
    );
  }
}

Gallery.propTypes = {
  search: PropTypes.string.isRequired,
};
