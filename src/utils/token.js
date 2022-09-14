export default {
  get() {
    return window.localStorage.getItem('TOKEN');
  },
  save(token) {
    window.localStorage.setItem('TOKEN', token);
  },
  getHeader() {
    return {
      'Content-Type': 'application/json',
      'Authorization': window.localStorage.getItem('TOKEN')
    }
  }
};
