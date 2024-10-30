import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databses;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    //slug here act as a document id
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("APPWRITE CREATEPOST ERROR: ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    // slug is passed a uniuque id for post and rest object can be updated, also user id is not given as post update will be already only accesible to that user only
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("APPWRITE UPDATEPOST ERROR: ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("APPWRITE DELETEPOST ERROR: ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("APPWRITE GETPOST ERROR: ", error);
      return false;
    }
  }

  //we need those posts which have active status type
  async getPosts(queries = [Query.equal("status", "active")]) {
    // here queries are given such that the params in [] brackets will be used as filter we can use biuilt in this is syntax to overwrite them
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries //queries = [Query.equal("status", "active")] this can also be written inside an object directly here
      );
    } catch (error) {
      console.log("APPWRITE GETPOST(S) ERROR: ", error);
    }
  }

  // file upload services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file // same as params
      );
    } catch (error) {
      console.log("APPWRITE UPLOADFILES ERROR: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("APPWRITE DELETEFILE ERROR: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("APPWRITE FILEPREVIEW ERROR: ", error);
    }
  }
}

const service = new Service();
export default service;

// Query.equal("status", "active") in this syntax only thos docs which status have actve status will be returned
//  this query syntax only works for indexed categories in schema
