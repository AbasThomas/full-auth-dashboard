// src/config/appConfig.js
const configs = {
    development: {
      API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    },
    production: {
      API_BASE_URL: import.meta.env.VITE_API_BASE_URL_PROD,
    },
  };
  
  // Set the environment variable (defaults to "development" if not set)
  const ENV = import.meta.env.VITE_APP_ENV || "development";
  
  // Choose the configuration based on the current environment
  const appConfig = configs[ENV];
  
  export default appConfig;
  