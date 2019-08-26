const mongoose = require('mongoose');

module.exports = async function connect() {
  try {
    await mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds135427.mlab.com:35427/rtm-tracking_link`,
      { useNewUrlParser: true }
    );
    console.log('>>> 📁 DB is connected');

  } catch(err) {
    console.error(err);
  }
}