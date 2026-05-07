export interface UrlData{
originalUrl: string;
shortCode:string;
visits: number;
createdAt: Date;
expiresAt?: Date;
}

 const urlDB = new Map<string, UrlData>();
 export { urlDB };