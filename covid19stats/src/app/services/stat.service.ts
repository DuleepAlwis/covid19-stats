import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../module/Country';
import { Observable } from 'rxjs/internal/Observable';
import { CountryStat } from '../module/CountryStat';
import { element } from 'protractor';
import { StatusCountry } from '../module/StatusCountry';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StatService {

  private country: Array<Country> = [];
  private countryStat: Array<CountryStat>;
  private globalStat: CountryStat;
  private countryDailyGraph: Array<StatusCountry>;
  private countryName: string;

  private subject = new Subject<any>();

  constructor(private http: HttpClient) {
    this.getCountriesApi();
    this.getStatDataApi();
  }

  sendClickEvent() {
    this.subject.next();
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  getCoutryName() {
    return this.countryName;
  }

  setCountryName(countryName: string) {
    this.countryName = countryName;
  }

  getCountriesApi() {
    this.http.get("https://api.covid19api.com/countries").subscribe(
      (response: Array<Country>) => {
        this.country = response;
      }
    )
  }

  getCountries() {
    return new Observable<Array<Country>>(observer => {
      setInterval(() => observer.next(this.country)
      )
    });
    //return this.country;
  }

  getStatDataApi() {
    this.http.get("https://api.covid19api.com/summary").subscribe(
      (response: Summary) => {
        this.globalStat = response.Global;
        this.countryStat = response.Countries;
      }
    )
  }

  getStatData(country: String) {

    if (country == "Global") {
      return this.globalStat;
    }
    else {
      let result: CountryStat = null;
      this.countryStat.forEach(element => {
        if (element.Country == country) {
          console.log(element);
          result = element;
        }
      });
      console.log("AAA");
      return result;
    }
  }

  getGlobalData() {
    return this.globalStat;

  }

  getCoutryDayilyDataApi() {
    this.http.get("https://api.covid19api.com/country/" + this.countryName + "/status/confirmed").subscribe(
      (response: Array<StatusCountry>) => {
        this.countryDailyGraph = response;
      }
    )
  }

  getCountryDayilyData() {

    return this.countryDailyGraph;
  }


}

interface Summary {
  Global: CountryStat,
  Countries: Array<CountryStat>
}
