import axios from 'axios';

const API = {
  instance: axios.create({
    baseURL: 'https://pixabay.com',
  }),

  params: {
    q: '',
    key: '33106084-36d167006bb8f159b153673e0',
    page: 1,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },

  async fetchImage(value, onLoadMore) {
    this.configParams(value, onLoadMore);

    const response = await this.instance.get('/api/', {
      params: this.params,
    });

    if (response.data.hits.length === 0) {
      throw Error(`There are no images!`);
    }

    return response;
  },

  configParams(value, { onLoadMore } = false) {
    this.setImageName(value);
    onLoadMore ? this.increasePage() : this.resetPage();
  },

  increasePage() {
    const { page: prevValue } = this.params;
    this.params = { ...this.params, page: prevValue + 1 };
  },

  resetPage() {
    this.params = { ...this.params, page: 1 };
  },

  setImageName(value) {
    this.params = { ...this.params, q: value };
  },
};

export { API };
