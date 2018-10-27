/**
 * Created by vivek on 21/5/17.
 */
const config = {
    production: {
      user_api_endpoint: 'http://localhost:8123/api/user',
      user_match_api_endpoint: `http://localhost:8123/api/userId/matches`,
      user_filter_api_endpoint: `http://localhost:8123/api/userId/matches`,
    },
    development: {
      user_api_endpoint: 'http://localhost:8123/api/user',
      user_match_api_endpoint: `http://localhost:8123/api/userId/matches`,
      user_filter_api_endpoint: `http://localhost:8123/api/userId/matches`,
    },
    testing: {
      user_api_endpoint: 'http://localhost:8123/api/user',
      user_match_api_endpoint: `http://localhost:8123/api/userId/matches`,
      user_filter_api_endpoint: `http://localhost:8123/api/userId/matches`,
    },
};
  
export default config;
