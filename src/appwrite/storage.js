import { Client,Storage,ID} from "appwrite";
import conf from "../conf/conf";


export class StorageService{
    client=new Client()
    storage

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.storage=new Storage(this.client);
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log(`Appwrite serive :: uploadFile :: error`,error);
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(`Appwrite serive :: deleteFile :: error`,error);
            throw error;
        }
    }

    getFilePreview(fileId){
        try {
            return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log(`Appwrite serive :: getFilePreview :: error`,error);
            throw error;
        }
    }
    
}


const storageService= new StorageService();

export default storageService;