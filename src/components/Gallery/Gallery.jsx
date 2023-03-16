import PropTypes from 'prop-types';
import { Component, Fragment } from 'react';
import { toast } from 'react-toastify';

import { GalleryItem } from 'components/ImageGalleryItem/GalleryItem';
import { GalleryStyle } from './GalleryStyle';
import { API } from 'components/api/api';
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
      const image = this.state.gallery.find(image => image.id === id);
      const { largeImageURL, tags } = image;

      this.setState({ largeImage: { largeImageURL, tags } });
      this.toggleModal();
    }
  };

  onLoadMore = () => {
    this.fetchImage(this.props.search, { onLoadMore: true });
  };

  componentDidUpdate(prevProps) {
    if (this.props.search !== prevProps.search) {
      this.fetchImage(this.props.search);
    }
  }

  fetchImage = async (value, { onLoadMore } = false) => {
    this.setState({ status: status.PENDING });

    try {
      const response = await API.fetchImage(value, { onLoadMore });
      const newImageObj = this.takeObjectPropeties(response.data.hits);

      this.setState(prevState => ({
        gallery: onLoadMore
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
    let loadMore;

    if (status === 'idle' || status === 'reject') {
      loadMore = '';
    }

    if (status === 'pending') {
      loadMore = <Loader />;
    }

    if (status === 'resolved') {
      loadMore = <Button onLoadMore={this.onLoadMore} />;
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
