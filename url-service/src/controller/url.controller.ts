import { Request, Response } from "express";
import { UrlService } from "../service/url.service"


export class UrlController {

    constructor(private urlService: UrlService){}

    async create(req: Request, res: Response): Promise<void> {
        try {

            const { url} = req.body;

            const result = await this.urlService.create(url,req.user);

            // res.redirect(newurl.originalUrl);
            res.status(200).json(result);
        } catch (error) {
            console.log("error",error);
        }
    }

    async redirect(req: Request, res: Response): Promise<void> {
        try {
            // const userId = req.user!.id;
            const { shortCode } = req.params;
            
            console.log("req.params",req.params);
            console.log("url.url",shortCode);
            console.log("url.url",req.ip);
            console.log("url.url",req.headers['user-agent']);

            const url = await this.urlService.handleRedirect(
                shortCode,
                req.ip,
                req.headers['user-agent'] as string
            );

            if(!url) {
                //
                res.status(404).json({msg: 'vou mudar pra thow'});
            }

            console.log("url.url",url);
            res.redirect(url.original_url);
            
            
        } catch (error) {
            console.error("listMyUrls error",error)
            res.status(500).json({msg: "deu ruim"});
        }
    }

    async listMyUrls(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user!.id;
            
            const result = await this.urlService.findMyUrls(userId);
            res.status(200).json(result);
            
        } catch (error) {
            console.error("listMyUrls error",error)
        }
    }
    
    async updateMyUrl(req: Request, res: Response): Promise<void> {
        try {
            const urlId = parseInt(req.params.id);
            const userId = req.user!.id;
            const { url } = req.body;

            const result = await this.urlService.updateUrl(urlId,userId,url);
            res.status(200).json(result);
            
        } catch (error) {
            console.error("listMyUrls error",error)
            res.status(404).json({error});
        }
    }

    async deleteUrl(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user!.id;
            const urlId = parseInt(req.params.id);
            
            const result = await this.urlService.deleteUrl(urlId);
            res.status(200).json(result);
            
        } catch (error) {
            console.error("listMyUrls error",error)
        }
    }
    

}