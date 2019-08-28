import User from "../models/User";
import Product from "../models/product";

export class UserService {

  // Create a new user
  static async createUser(user) {
    const newUser = new User(user);
    await newUser.save();
    const token = await newUser.generateAuthToken();
    return { newUser, token };
  }

  //Login a registered user
  static async login({username, password}) {
    const user = await User.findByCredentials(username, password);
    if (!user) {
      throwError({code: 401, error: 'Error al iniciar sesión! Compruebe sus credenciales'});
    }
    const token = await user.generateAuthToken();
    return{ user, token };
  }

  // update an existing user
  static async updateUser(userId, user) {
    await Product.findOneAndUpdate({_id: userId}, {$set: user}, {useFindAndModify: false, new: true});
  }

  // delete an user
  static async deleteUser(userId) {
    await User.deleteOne({"_id": userId});
    return { message: 'Usuario eliminado' };
  }

  // logout current sesion
  static async logoutCurrent(user) {
    user.tokens = user.tokens.filter((token) => {
      return token.token !== token;
    });
    await user.save();
  }

  // Log user out of all sessions
  static async logoutAll(user) {
    user.tokens.splice(0, user.tokens.length);
    await user.save();
  }

}
