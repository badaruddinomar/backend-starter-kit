import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI as string,
  jwt_secret: process.env.JWT_SECRET as string,
  jwt_expiration: process.env.JWT_EXPIRATION,
  node_env: process.env.NODE_ENV,
  client_url: process.env.CLIENT_URL,

  smtp_host: process.env.SMTP_HOST as string,
  smtp_port: process.env.SMTP_PORT,
  smtp_mail: process.env.SMTP_MAIL as string,
  smtp_password: process.env.SMTP_PASSWORD as string,
  smtp_service: process.env.SMTP_SERVICE as string,

  cloudinary: {
    cloud_name: process.env.CLOUD_NAME as string,
    api_key: process.env.API_KEY as string,
    api_secret: process.env.API_SECRET as string,
  },
};
