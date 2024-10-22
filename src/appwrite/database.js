import { Client, Databases ,Query } from "appwrite";
import conf from "../conf/conf";


export class DatabaseService{
    client=new Client()
    database    

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.database=new Databases(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,username,userId,summary}){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    username,
                    summary,
                }
            )
        } catch (error) {
            console.log(`Appwrite serive :: createPost :: error`,error);
            throw error;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status,summary,username}){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    summary,
                    username,
                }
            )
        } catch (error) {
            console.log(`Appwrite serive :: updatePost :: error`,error);
            throw error;
        }
    }

    async deletePost(slug){
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(`Appwrite serive :: deletePost :: error`,error);
            throw error;
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(`Appwrite serive :: getPost :: error`,error);
            throw error;
        }
    }

    async getPosts(queries=[Query.equal('status','active')]){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log(`Appwrite serive :: getPosts :: error`,error);
            throw error;
        }
    }
}


const databaseService=new DatabaseService();

export default databaseService;