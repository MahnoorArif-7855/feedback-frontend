import axios from 'axios';

const createAxiosInstance = ({ apiType, cancelRequest }) => {
  // It decide which cloud function api to hit.
  // tool craft is donw with safee on his cloud function
  // the rest of APIs are in diff cloud function

  const firebase = getFirebase();

  const instance = axios.create({
    baseURL: baseURL,
  });
  const CancelToken = axios.CancelToken;

  // Cancel mechanism, When user change the page,tool craft api get cancelled.
  if (cancelRequest) {
    cancel('Request is canceled'); // cancel request
  }
  instance.interceptors.request.use(
    async (config) => {
      config.cancelToken = new CancelToken(function executor(c) {
        cancel = c;
      });
      //! Firebase user authentication is used to send as token
      const token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
      config.headers.authorization = `Bearer ${token}`;
      return { ...config };
    },
    (error) => {
      console.log('error in firebase', error);
      return Promise.reject(error);
    }
  );
  return instance;
};

export default createAxiosInstance;
