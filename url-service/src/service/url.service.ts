import { CreateUrlDto } from "../dto/url.dto";
import { IUrlRepository } from "../interfaces/IUrl.repository";
import { IUrl } from "../models/IUrl.interface";
import { AppError } from "../utils/error";
import { STATUS } from "../utils/statusCode";
import { Url } from "./urlShort.service";



export class UrlService {
    constructor(private urlRepository: IUrlRepository){}

    async create(url: string,user?: any): Promise<any> {//vou precisar mudar

        let urlValid = new Url(url);
        const check_Url_Exists_Db = await this.urlRepository.findUrl(urlValid.shortUrl);

        if(check_Url_Exists_Db){
            throw new AppError("Conflict generate Url try again",STATUS.CONFLICT);
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
            throw new AppError("url not found ",STATUS.BAD_REQUEST);
        }

        if(urlExists.user_id != userId){
            throw new AppError("user_id not owner of url",STATUS.UNAUTHORIZED);
        }

        let urlValid = new Url(newOriginalUrl);
        const check_Url_Exists_Db = await this.urlRepository.findUrl(urlValid.shortUrl);

        if(check_Url_Exists_Db){
            throw new AppError("url exists generate new one",STATUS.CONFLICT);
        }

        return await this.urlRepository.update(urlId,{ original_url: newOriginalUrl });
    }

    async deleteUrl(urlId: number,userId: number): Promise<any>{

        const urlExists = await this.urlRepository.findUrlById(urlId);

        if(!urlExists){
            throw new AppError("url not found ",STATUS.BAD_REQUEST);
        }

        if(urlExists.user_id != userId){
            throw new AppError("user_id not owner of url",STATUS.UNAUTHORIZED);
        }

        return await this.urlRepository.softDelete(urlId);
    }

    async handleRedirect(shortCode: string, ip?: string, userAgent?: string): Promise<any> {

        const shortUrl = `${process.env.BASE_URL}${shortCode}`;
        const url = await this.urlRepository.findUrl(shortUrl);

        
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
