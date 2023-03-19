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

  async fetchImage(value, page) {
    this.setConfigParams(value, page);

    const response = await this.instance.get('/api/', {
      params: this.params,
    });

    if (response.data.hits.length === 0) {
      throw Error(`There are no images!`);
    }

    return response;
  },

  setConfigParams(value, page) {
    this.setImageName(value);
    this.setPage(page);
  },

  setPage(page) {
    this.params = { ...this.params, page };
  },

  setImageName(q) {
    this.params = { ...this.params, q };
  },
};

export { API };
