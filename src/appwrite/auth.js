import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() { // yahan par client tab banega jab constructor call hoga ie new object banega agar class mai define karenge to memory waste hogi
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
        console.log("createAccountError: ",error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
        console.log("loginError: ",error);
    }
  }

  async getCurrentUSer() {
    try {
      return await this.account.get();
    } catch (error) {
        console.log("getCurrentUserError: ",error);
    }
    return null; // given so if service works but account not get then null returned
  }

  async logout(){
    try {
        await this.account.deleteSessions()
    } catch (error) {
        console.log("logoutError: ",error);
    }
  }
}

const authService = new AuthService();

export default authService;
