const API_KEY = process.env.REACT_APP_API_KEY;
if (!API_KEY)
  throw new Error(
    "Please provide value for 'API_KEY' in '.env.local' file in root directory."
  );

const CONFIG = {
  API_KEY,
};

exports.CONFIG = CONFIG;
