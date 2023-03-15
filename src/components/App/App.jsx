import { PureComponent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppStyle } from './AppStyle';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends PureComponent {
  state = {
    search: '',
  };

  onSearch = ({ image }) => {
    if (image.trim() === '') {
      toast.info('Please, enter the text');
      return;
    }

    if (image === this.state.search) {
      toast.info(`The results of search "${image}" is already displayed!`);
      return;
    }

    this.setState({ search: image });
  };

  render() {
    return (
      <AppStyle>
        <Searchbar onSearch={this.onSearch}></Searchbar>
        <ImageGallery search={this.state.search} />
        <ToastContainer />
      </AppStyle>
    );
  }
}
