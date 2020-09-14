require('../start/bootstrap');

module.exports = {
  url: process.env.DB_URL,
  options: {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
};
