import { Component, OnInit,ViewChild } from '@angular/core';
import { BuildingDTO } from 'src/app/Classes/Building';
import { DashBoardService } from 'src/app/Services/DashBoardService';
import { Chart, registerables} from 'chart.js';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
  providers: [DatePipe]
})
export class DashBoardComponent implements OnInit {

  buildingsData:any;
  building: BuildingDTO = new BuildingDTO(); 
  Value = [];  
  TimeStamp = [];  
  public myChart: Chart;
  filteredTimeStamp = [];  
  
  
  constructor(private dashboardService:DashBoardService,private datePipe: DatePipe) { }

  ngOnInit() {
    
		this.building.FromDate = moment().format('YYYY-MM-DD HH:mm:ss');
		this.building.ToDate = moment().format('YYYY-MM-DD HH:mm:ss');
    this.building.CurrentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    //this.building.CurrentDate = new Date().toDateString();

    this.getBuildings();
    this.getObjects();
    this.getDatafields();
    this.getBuildingsDataForChart(1,2,1, '2021-11-11T00:00', '2021-11-11T23:59');
    Chart.register(...registerables);
    
  }
  loadChart(){

    if(this.building.Object == undefined) this.building.Object = 0;
    if(this.building.DataField == undefined) this.building.DataField = 0;
    this.getBuildingsDataForChart(this.building.Building,this.building.Object,this.building.DataField,this.building.FromDate,this.building.ToDate);

  }
  getBuildingsDataForChart(BuildingId,ObjectId,DataFieldId,FromDate,ToDate): void {
    debugger
    this.building.FromDate = FromDate;
    this.building.ToDate = ToDate;
    this.building.Object = ObjectId;
    this.building.DataField = DataFieldId;



		this.dashboardService.getBuildingsDataForChart(BuildingId,ObjectId,DataFieldId,FromDate,ToDate).subscribe(
			data => this.setBuildingsDataForChart(data),
			error => console.log(error)
		);
	}
	
	setBuildingsDataForChart(data: any) {
    
		this.buildingsData = data;
    this.Value = [];
    this.TimeStamp = [];
    this.filteredTimeStamp=[];

    this.buildingsData.forEach(element => {
      this.Value.push(element.value);  
      this.filteredTimeStamp.push(element.timestamp.slice(11,19));
      this.TimeStamp.push(element.timestamp);  
    });

    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus != undefined) {
     chartStatus.destroy();
  
    }

    this.myChart = new Chart('myChart', {  
        type: 'line',  
        data: {  
          labels: this.filteredTimeStamp,  

          datasets: [  
            {  
              data: this.Value,  
               backgroundColor: "#000000",  
               fill: false,
               borderColor: 'rgb(75, 192, 192)',
               tension: 0.1,
               spanGaps: false,
               label: "Value",


            }  
          ]  
        },  
        options: {  

          scales: {  
            x: {
            
             },
            y: {  
              grid: {
                drawBorder: false,
              }
            },  
          }  
        }  
       
        }
      );  
	}
  
  getBuildings(){
    this.dashboardService.getBuildings().subscribe(
			data => this.setBuildings(data),
			error => console.log(error)
		);
  }
  setBuildings(data){
    this.building.BuildingDropdownList = data;
  }

  getObjects(){
    this.dashboardService.getObjects().subscribe(
			data => this.setObjects(data),
			error => console.log(error)
		);
  }
  setObjects(data){
    this.building.ObjectDropdownList = data;

  }


  getDatafields(){
    this.dashboardService.getDatafields().subscribe(
			data => this.setDatafields(data),
			error => console.log(error)
		);

  }

  setDatafields(data){
    this.building.DatafieldDropdownList = data;

}

}
