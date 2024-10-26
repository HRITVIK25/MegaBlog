import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    // we added client and account to constructor so it is only crreated along with the ibject automatically
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client); // yahan par humnbe bas account ko client ke endpoints ke sath initilaize kiya hai
  }

  // yahan hum methods bana denge jinko hum call karke use kar sakte hai under the hood appwrite firebase kuch bhi use ho baaki nhi badlega code to migration becomes easy
  async createAccount({ email, password, name }) {
    // jab bhi hum pass karenge to arguments mai object pass karenge here we just destructerd that
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      ); // ye documentation mai se dekhna padta hai .create ke params
      if (userAccount) {
        // call another method agar userAccoutn exist or created successfully log in kara do
        return this.login({ email, password }); // yahan seedha login karane ke liye login method call kar diya
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("APPWRITE CREATEACCOUNT ERROR: ", error);
      // try catch is used as often time in BaaS and custom backend these metjods might fail so good to have custom errorhandling along with erro handling in backend
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("APPWRITE LOGIN ERROR: ", error);
    }
  }

  async getCurrentUser() {
    try {
      await this.account.get();
    } catch (error) {
      console.log("APPWRITE GETCURRENTUSER ERROR: ", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions(); //session use karne se instance of currenbt browser delete hoga sessions se saare browser ke instances ogout ho jayenge
    } catch (error) {
      console.log("APPWRITE LOGOUT ERROR: ", error);
    }
  }

  
}

const authService = new AuthService(); // ye isliye kara taki hum e baar baar ibhject na create karna pade

export default authService;
