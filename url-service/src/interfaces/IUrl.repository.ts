import { CreateUrlDto} from "../dto/url.dto";
import { IUrl } from "../models/IUrl.interface";


export interface IUrlRepository {
    create(data: CreateUrlDto) : Promise<IUrl>;
    findUrl(url:string): Promise<IUrl | null>;
    findUrlById(id: number): Promise<any | null>;
    findAllByUserId(userid: number): Promise<any[] | null>; //mudar pro IUrl
    update(id: number, data: { original_url: string}): Promise<any> 
    softDelete(id: number): Promise<any>
    incrementClickCount(urlId: number): Promise<any>
    createClickLog(data: { url_id: number, ip?: string, user_agent?: string}):Promise<any>
    
}
