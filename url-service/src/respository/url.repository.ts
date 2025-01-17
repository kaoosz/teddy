import { CreateUrlDto } from "../dto/url.dto";
import { DatabaseClient } from "../service/prisma.service";
import { IUrlRepository } from "../interfaces/IUrl.repository";
import { IUrl } from "../models/IUrl.interface";

export class UrlRepository implements IUrlRepository {
    constructor(private readonly prisma: DatabaseClient) {}
    

    async createUrl(data: CreateUrlDto): Promise<IUrl> {
        return await this.prisma.url.create({ data });
    }
    
    async findUrl(url: string): Promise<IUrl | null> {
        return await this.prisma.url.findFirst({
            where: {
                short_url: url
            }
        })
    }

    async findUrlById(id: number): Promise<IUrl | null> {
        return await this.prisma.url.findUnique({
            where: {
                id: id,
                deleted_at: null
            }
        })
    }

    async findAllByUserId(userid: number): Promise<any[] | null> {
        return this.prisma.url.findMany({
            where: {
                user_id: userid,
                deleted_at: null
            },
            include: {
                _count: {
                    select: {clicks: true}
                }
            }
        });
    }

    async update(id: number, data: { original_url: string}) {
        return await this.prisma.url.update({
            where: {id},
            data: {
                ...data,
                updated_at: new Date()
            }
        });
    }

    async softDelete(id: number): Promise<IUrl>{
        return await this.prisma.url.update({
            where: {id},
            data: {                
                updated_at: new Date(),
                deleted_at: new Date()
            }
        });
    }

    async incrementClickCount(urlId: number): Promise<IUrl> {
        return this.prisma.url.update({
            where: {id: urlId },
            data: {
                click_count: {
                    increment: 1
                }
            }
        });
    }

    async createClickLog(data: { url_id: number, ip?: string, user_agent?: string}): Promise<any>{
        return this.prisma.clickLog.create({
            data
        });
    }
}