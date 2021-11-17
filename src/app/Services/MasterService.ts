import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from "./../config";

@Injectable()
export class MasterService{


    constructor(private http: HttpClient) { }

	get(URL: string) : any{
		return this.http.get(Config.getAPI(URL.trim()), Config.getHeaders());
	}

}