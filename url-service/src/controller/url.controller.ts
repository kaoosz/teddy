import { Request, Response } from "express";
import { UrlService } from "../service/url.service"
import { STATUS } from "../utils/statusCode";
import { AppError} from "../utils/error";
import { logger } from "../service/logger.service";


export class UrlController {

    constructor(private urlService: UrlService){}

    async create(req: Request, res: Response): Promise<void> {
        try {

            const { url} = req.body;

            //  async create(originalUrl:string,userId:number): Promise<IUrl> {
            const result = await this.urlService.create(url,req.user?.id);
            logger.info('Url created successfully', { userId: result.id });
            res.status(200).json(result);
            return;
        } catch (error) {
            logger.error('Failed to create url', { error: error });
            if(error instanceof AppError){
                const status = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;
                const message = error.message || STATUS.DEFAULT_ERROR;
                res.status(status).json({ error: message });
                return;
            }else{

                res.status(STATUS.INTERNAL_SERVER_ERROR).json({ 
                    error: STATUS.DEFAULT_ERROR 
                });
                return;
            }
        }
    }

    async redirect(req: Request, res: Response): Promise<void> {
        try {
            const { shortCode } = req.params;
            
            const url = await this.urlService.handleRedirect(
                shortCode,
                req.ip,
                req.headers['user-agent'] as string
            );

            if(!url) {
                throw new AppError('url not found', STATUS.BAD_REQUEST);
            }

            logger.info('successfully redirect', { originalUrl: url.original_url, shortUrl: shortCode });
            res.redirect(url.original_url);     
            return;     
        } catch (error) {
            logger.error('Failed to redirect url', { error: error });
            if(error instanceof AppError){
                const status = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;
                const message = error.message || STATUS.DEFAULT_ERROR;
                res.status(status).json({ error: message });
                return;
            }else{
                res.status(STATUS.INTERNAL_SERVER_ERROR).json({ 
                    error: STATUS.DEFAULT_ERROR 
                });
                return;
            }
        }
    }

    async listMyUrls(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user!.id;
            
            const result = await this.urlService.findMyUrls(userId);
            logger.info('successfully list myUrls', { Urls: result });
            res.status(200).json(result);
            return;
        } catch (error) {
            logger.error('Failed to list my urls', { error: error });
            if(error instanceof AppError){
                const status = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;
                const message = error.message || STATUS.DEFAULT_ERROR;
                res.status(status).json({ error: message });
                return;
            }else{
                res.status(STATUS.INTERNAL_SERVER_ERROR).json({ 
                    error: STATUS.DEFAULT_ERROR 
                });
                return;
            }
        }
    }
    
    async updateMyUrl(req: Request, res: Response): Promise<void> {
        try {
            const urlId = parseInt(req.params.id);
            const userId = req.user!.id;
            const { url } = req.body;


            const result = await this.urlService.updateUrl(urlId,userId,url);
            logger.info('successfully update my url', { Url: result });
            res.status(200).json(result);
            return;
        } catch (error) {
            logger.error('Failed to update my url', { error: error });
            if(error instanceof AppError){
                const status = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;
                const message = error.message || STATUS.DEFAULT_ERROR;
                res.status(status).json({ error: message });
                return;
            }else{
                res.status(STATUS.INTERNAL_SERVER_ERROR).json({ 
                    error: STATUS.DEFAULT_ERROR 
                });
                return;
            }
        }
    }

    async deleteUrl(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user!.id;
            const urlId = parseInt(req.params.id);
            
            const result = await this.urlService.deleteUrl(urlId,userId);
            logger.info('successfully delete my url', { Url: result });
            res.status(200).json(result);
            return;

        } catch (error) {
            logger.error('Failed to delete my urls', { error: error });
            if(error instanceof AppError){
                const status = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;
                const message = error.message || STATUS.DEFAULT_ERROR;
                res.status(status).json({ error: message });
                return;
            }else{
                res.status(STATUS.INTERNAL_SERVER_ERROR).json({ 
                    error: STATUS.DEFAULT_ERROR 
                });
                return;
            }
        }
    }
    

}