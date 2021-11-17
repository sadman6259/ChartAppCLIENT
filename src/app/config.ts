import { HttpHeaders } from "@angular/common/http";

export class Config{

    public static get API_URL(): string {return "https://localhost:44307/api/"; }

    public static getAPI(url: string){
        var URL = "";
        var endPoint = this.API_URL;
        URL = endPoint + url;
        return URL;
    } 
    public static getHeaders(){
            const headers = new HttpHeaders()
            .set('Access-Control-Allow-Origin','*')
            .set('Access-Control-Allow-Methods','*')
			.set('X-Requested-With', 'XMLHttpRequest')
			.set('Content-Type', 'application/json; charset=utf-8');
            return { headers: headers };   
    }

  


   
}