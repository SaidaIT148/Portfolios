import { Injectable } from "@angular/core";

import * as CompaniesInfo from "./companies.info.json";
import { companiesInfo, companyInfo } from "./app.modal";

@Injectable({ providedIn: "root" })
export class AppService {
  jsonData: any;
  companiesInfo: companiesInfo;
  constructor() {
    this.jsonData = CompaniesInfo;
    this.companiesInfo = this.jsonData;
  }

  getCompanyBySafeNumber(safeNumber: string): companyInfo {
    let company = this.companiesInfo.companies.filter(
      (c) => c.cs_company_id === safeNumber
    );
    if (company.length > 0) {
      return company[0];
    }
    return null;
  }

  getSimilarCompanies(safeNumber: string, parameters: Array<any>) {
    let _company = this.getCompanyBySafeNumber(safeNumber);
    console.log(_company);
    if (_company !== null) {
      let similarCompanies: Array<companyInfo> =
        this.companiesInfo.companies.filter(
          (C) =>
            C.cs_company_id !== safeNumber &&
            C.country == _company.country &&
            C.activity_code == _company.activity_code
        );
      parameters.forEach((c) => {
        if (c.checked) {
          switch (c.key) {
            case "Credit Score":
              similarCompanies = similarCompanies.filter(
                (c) =>
                  Math.abs(
                    parseInt(c.credit_score, 0) -
                      parseInt(_company.credit_score, 0)
                  ) < 10
              );
              break;
            case "Location":
              similarCompanies = similarCompanies.filter(
                (c) => c.city == _company.city
              );
              break;
            case "Credit worthy":
              similarCompanies = similarCompanies.filter(
                (c) => c.creditworthy == _company.creditworthy
              );
              break;
            case "No of employees":
              similarCompanies = similarCompanies.filter(
                (c) =>
                  Math.abs(
                    parseInt(c.employees, 0) - parseInt(_company.employees, 0)
                  ) < 300
              );
              break;

            case "Turnover":
              similarCompanies = similarCompanies.filter(
                (c) =>
                  Math.abs(
                    parseInt(c.turnover, 0) - parseInt(_company.turnover, 0)
                  ) < 1000000
              );
              break;
          }
        }
      });

      return similarCompanies
        .sort(
          (a, b) => parseInt(b.credit_score, 10) - parseInt(a.credit_score, 10)
        )
        .slice(0, 10);
    } else {
      return [];
    }
  }
}
