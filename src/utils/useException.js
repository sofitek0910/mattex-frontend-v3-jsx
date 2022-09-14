import { history } from 'umi';

const useException = (err) => {
  console.log(err.response);
  try {
    const statusCode = err.response.status;
    switch (statusCode) {
      case 403:
        history.push('/exception/403');
        break;
      case 404:
        history.push('/exception/404');
        break;
      case 500:
        history.push('/exception/500');
        break;
      default:
        history.push('/exception/403');
        break;
    }
  } catch {
    history.push('/exception/403');
  }
};

export default useException;
