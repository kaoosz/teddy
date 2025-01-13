import { CreateUrlDto} from "../dto/url.dto";
import { IUrl } from "../models/IUrl.interface";


export interface IUrlRepository {
    createUrl(data: CreateUrlDto) : Promise<IUrl>;
    findUrl(url:string): Promise<IUrl | null>;
    findUrlById(id: number): Promise<any | null>;
    findAllByUserId(userid: number): Promise<IUrl[] | null>;
    update(id: number, data: { original_url: string}): Promise<any> 
    softDelete(id: number): Promise<IUrl>
    incrementClickCount(urlId: number): Promise<IUrl>
    createClickLog(data: { url_id: number, ip?: string, user_agent?: string}):Promise<any>
    
}
