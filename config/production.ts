export default {
    base_url: process.env.BASE_URL,
    port: parseInt(process.env.PORT, 10),
    database: {
        uri: process.env.DATABASE_URI,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    sendgrid: {
        key: process.env.SENDGRID_API_KEY,
    },
    recaptcha: {
        private_key: process.env.RECAPTCHA_PRIVATE_KEY,
    },
};
