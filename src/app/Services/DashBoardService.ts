import { Injectable } from '@angular/core';
import { MasterService } from './masterService';

@Injectable()
export class DashBoardService {
	constructor(private masterService: MasterService) { }
	getBuildingsDataForChart(BuildingId:number,ObjectId:number,DataFieldId:number,FromDate:Date,ToDate:Date): any { return this.masterService.get(`get/buildings/${BuildingId}/${ObjectId}/${DataFieldId}/${FromDate}/${ToDate}`); }
	getBuildings():any { return this.masterService.get(`get/buildings/dropdownlist`); }
	getObjects():any { return this.masterService.get(`get/objects/dropdownlist`); }
	getDatafields():any { return this.masterService.get(`get/datafields/dropdownlist`); }

}