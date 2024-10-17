import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthServices{
    client = new Client()
    account

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const currUser=await account.create(ID.unique(), email, password, name);
            if(currUser){
                //calling the login method to authenticate the user;
                return this.login({email,password});
            }else{
                throw new Error("User creation failed");
            }
        } catch (error) {
            console.log(`Appwrite serive :: createAccount :: error`,error);
            return false;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            console.log(`Appwrite serive :: login :: error`,error);
            return false;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log(`Appwrite serive :: getCurrentUser :: error`,error);
            return null;
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log(`Appwrite serive :: logout :: error`,error);
            return false;
        }
    }

}

const authService=new AuthServices();

export default authService;