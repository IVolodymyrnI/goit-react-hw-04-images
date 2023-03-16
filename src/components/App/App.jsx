import { PureComponent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppStyle } from './AppStyle';
import Searchbar from 'components/Searchbar/Searchbar';
import { Gallery } from 'components/Gallery/Gallery';

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
      toast.info(`The results of the search "${image}" are already displayed!`);
      return;
    }

    this.setState({ search: image });
  };

  render() {
    return (
      <AppStyle>
        <Searchbar onSearch={this.onSearch}></Searchbar>
        <Gallery search={this.state.search} />
        <ToastContainer />
      </AppStyle>
    );
  }
}
