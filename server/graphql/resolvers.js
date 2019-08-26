const tasks = require("../dummyData");

//DB Models
const User = require("../db/models/User");

module.exports = resolvers = {
  Query: {
    hello: () => "hello world",
    greet: (_, { name }) => `Hello ${name}`,
    users: async () => await User.find()
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const newUser = new User(input);
      await newUser.save();

      return newUser;
    },
    deleteUser: async (_, { _id }) => await User.findByIdAndDelete(_id),
    updateUser: async(_, {_id, input}) => await User.findByIdAndUpdate(_id, input, {new: true})
  }
};
