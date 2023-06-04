import cloudinary from 'cloudinary';

export const configColudinary = async (cloud_name, api_key, api_secret) => {
    await cloudinary.config({
        cloud_name,
        api_key,
        api_secret,
    })
}