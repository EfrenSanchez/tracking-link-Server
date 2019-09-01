const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//DB Models
const User = require("../db/models/User");

module.exports = resolvers = {
  Query: {
    user: async (_, args, req) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      try {
        const user = await User.findById(req.userId);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (err) {
        throw err;
      }
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User does not exist!");
      }

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect!");
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      return { userId: user.id, token: token, tokenExpiration: 1 };
    }
  },
  Mutation: {
    createUser: async (_, { input }, req) => {
      //Have to be a user authenticated to create a new user
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      try {
        //Check if user exist already
        const existingUser = await User.findOne({ email: input.email });
        if (existingUser) {
          throw new Error("User exist already");
        }
        //Crypt password
        const hashedPassword = await bcrypt.hash(input.password, 12);

        //New User
        const newUser = new User({
          name: input.name,
          email: input.email,
          password: hashedPassword
        });
        await newUser.save();
        return newUser;
      } catch (err) {
        throw err;
      }
    }
    // deleteUser: async (_, { _id }) => await User.findByIdAndDelete(_id), //todo
    // updateUser: async (_, { _id, input }) =>
    //   await User.findByIdAndUpdate(_id, input, { new: true }) //todo
  }
};
