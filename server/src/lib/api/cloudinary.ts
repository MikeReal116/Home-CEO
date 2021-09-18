import cloudinary from 'cloudinary';

export const Cloudinary = {
  upload: async (image: string) => {
    try {
      const response = await cloudinary.v2.uploader.upload(image, {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true,
        public_id: 'homeCEO/listings'
      });
      return response.secure_url;
    } catch (error) {
      throw new Error('image upload error');
    }
  }
};
