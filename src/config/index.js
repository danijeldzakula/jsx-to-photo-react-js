const SERVER_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_SERVER_URL : process.env.REACT_APP_DEV_SERVER_URL;

export { SERVER_URL };
