

export class Url {
    code: string;
    shortUrl: string;
    originalUrl: string;

    constructor(originalUrl: string){
      this.originalUrl = originalUrl;
      this.code = Url.generateCode();
      this.shortUrl = Url.generateShortUrl(this.code);
    }

    static generateShortUrl(url:string): string {
      // return `http://localhost:3000/${url}`
      return `${process.env.BASE_URL}${url}`
    }

    static generateCode(): string {
        let code = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for (let i = 0; i < 7; i++) {
          const randomCharacter = Math.floor(Math.random() * possible.length);
          code += possible.charAt(randomCharacter);
        }
    
        return code; 
      }
}