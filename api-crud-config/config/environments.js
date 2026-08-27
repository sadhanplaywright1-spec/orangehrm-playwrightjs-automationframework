   const baseURL = process.env.API_BASE_URL;

if (!baseURL) {
    throw new Error(
        'API_BASE_URL is missing from .env.crud'
    );
}

module.exports = {
    baseURL
};