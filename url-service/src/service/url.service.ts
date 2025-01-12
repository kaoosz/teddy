import { CreateUrlDto } from "../dto/url.dto";
import { IUrlRepository } from "../interfaces/IUrl.repository";
import { IUrl } from "../models/IUrl.interface";
import { Url } from "./urlShort.service";



export class UrlService {
    constructor(private urlRepository: IUrlRepository){}

    async create(url: string,user?: any): Promise<any> {//vou precisar mudar
        // transformar a url direto em 

        // criar duplicado url?
        let urlValid = new Url(url);
        const check_Url_Exists_Db = await this.urlRepository.findUrl(urlValid.shortUrl);

        console.log("urlValid",urlValid);
        console.log("user",user);

        if(check_Url_Exists_Db){
            throw new Error("URL EXIST");
        }

        const newUrlDb = await this.urlRepository.create({
         original_url: urlValid.originalUrl,
         short_url: urlValid.shortUrl,
         user_id: user?.id || null
        });

        return newUrlDb;

    }

    async findMyUrls(id: number): Promise<any>{
        return await this.urlRepository.findAllByUserId(id);
    }

    async updateUrl(urlId: number, userId: number, newOriginalUrl: string): Promise<any>{

        const urlExists = await this.urlRepository.findUrlById(urlId);

        if(!urlExists){
            throw new Error("URL NAO EXISTE");
        }

        if(urlExists.user_id != userId){
            throw new Error("VOCÊ não é dono");
        }

        console.log("urlExists",urlExists);
        console.log("urlId",urlId);

        console.log("userId",userId);
        console.log("newOriginalUrl",newOriginalUrl);

        let urlValid = new Url(newOriginalUrl);
        const check_Url_Exists_Db = await this.urlRepository.findUrl(urlValid.shortUrl);
        console.log("check_Url_Exists_Db",check_Url_Exists_Db);

        if(check_Url_Exists_Db){
            throw new Error("URL EXIST");
        }

        return await this.urlRepository.update(urlId,{ original_url: newOriginalUrl });
    }

    async deleteUrl(urlId: number): Promise<any>{

        const urlExists = await this.urlRepository.findUrlById(urlId);

        if(!urlExists){
            throw new Error("URL NAO EXISTE");
        }

        console.log("urlId",urlId);
        return await this.urlRepository.softDelete(urlId);
    }

    async handleRedirect(shortCode: string, ip?: string, userAgent?: string): Promise<any> {
        const shortUrl = `${process.env.BASE_URL}${shortCode}`;
        // const shortUrl = `http://localhost:3000/${shortCode}`;
    
        const url = await this.urlRepository.findUrl(shortUrl);
        console.log("shortUrl",shortUrl);
        // console.log("shortUrl",shortUrl);
        
        if (!url || url.deleted_at) {
            return null;
        }
    
        await Promise.all([
            this.urlRepository.incrementClickCount(url.id),
            this.urlRepository.createClickLog({
                url_id: url.id,
                ip,
                user_agent: userAgent
            })
        ]);
    
        return url;
    }

}
