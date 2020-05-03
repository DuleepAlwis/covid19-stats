import { Component, OnInit } from '@angular/core';
import { StatService } from '../services/stat.service';
import { Country } from '../module/Country';
import { Observable } from 'rxjs';
import { CountryStat } from '../module/CountryStat';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {

  options: Array<Country>;
  countryName: String = "Global";
  statCountry: CountryStat = {
    Country: "",
    Slug: "",
    ISO2: "",
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewRecovered: 0,
    TotalRecovered: 0
  };
  dataLoad = false;
  constructor(private statService: StatService) {
    this.getCountries();


  }

  ngOnInit(): void {
    console.log("Init");

    setTimeout(() => {
      this.statCountry = this.statService.getGlobalData();
      console.log(this.statCountry);
      this.dataLoad = true;
    }, 3000);



  }

  getCountries() {
    this.statService.getCountries().subscribe(
      (observer: Array<Country>) => {

        this.options = observer;
      }
    )
  }

  getStatCountry(value) {
    this.dataLoad = false;

    this.countryName = value;
    this.statService.setCountryName(value);
    this.statCountry = this.statService.getStatData(value);
    if (this.statCountry != null) {
      this.dataLoad = true;
      console.log(this.statCountry);
      this.statService.sendClickEvent();
    }
    console.log(this.statCountry);
  }
}
