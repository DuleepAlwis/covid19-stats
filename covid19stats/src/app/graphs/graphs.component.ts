import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { StatService } from '../services/stat.service';
import { StatusCountry } from '../module/StatusCountry';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  @Input('countryName') countryName: string;

  graphDisplay:boolean = false;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Cases reported' }
  ];

  countryStat: Array<StatusCountry>;
  clickEventsubscription: Subscription;

  constructor(private statService: StatService) {
    this.clickEventsubscription = this.statService.getClickEvent().subscribe(() => {
      this.getCountryDailyData();
    });


  }

  ngOnInit(): void {

  }

  getCountryDailyData() {
    this.graphDisplay = false;
    this.barChartData[0].data.length = 0;
    this.barChartLabels.length = 0;
    console.log(this.countryName);
    this.statService.getCoutryDayilyDataApi();
    setTimeout(() => {
      this.countryStat = this.statService.getCountryDayilyData();
      console.log(this.countryStat);
      this.barchartInit();
    }, 3000);

  }

  barchartInit() {
    this.barChartData[0].data.length = 0;
    this.barChartLabels.length = 0;
    if (this.countryStat != null) {
      
      this.graphDisplay = true;

      this.countryStat.forEach((i) => {
       

        this.barChartData[0].data.push(i.Cases);
        this.barChartLabels.push(i.Date.split("T")[0]);
      })
    }

  }
}
