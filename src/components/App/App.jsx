import { PureComponent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Modal } from 'components/Modal/Modal';
import { AppStyle } from './AppStyle';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Gallery } from 'components/Gallery/Gallery';
import { API } from 'api/api';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

const status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECT: 'reject',
};

export class App extends PureComponent {
  state = {
    search: '',
    page: 1,
    error: '',
    gallery: [],
    isOpenModal: false,
    largeImage: {},
    status: status.IDLE,
  };

  onSearch = ({ image }) => {
    if (!image.trim()) {
      toast.info('Please, enter the text');
      return;
    }

    if (image === this.state.search) {
      toast.info(`The results of the search "${image}" are already displayed!`);
      return;
    }

    this.setState({ search: image, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
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

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if (search !== prevState.search || page !== prevState.page) {
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
    const { largeImage, isOpenModal, gallery, status } = this.state;
    let loadMore;

    if (status === 'idle' || status === 'reject') {
      loadMore = null;
    }

    if (status === 'pending') {
      loadMore = <Loader />;
    }

    if (status === 'resolved') {
      loadMore = <Button onLoadMore={this.onLoadMore} />;
    }

    return (
      <AppStyle>
        <Searchbar onSearch={this.onSearch}></Searchbar>
        <Gallery gallery={gallery} onImage={this.onImage} />
        {loadMore}
        {isOpenModal && (
          <Modal largeImage={largeImage} toggleModal={this.toggleModal} />
        )}
        <ToastContainer />
      </AppStyle>
    );
  }
}
