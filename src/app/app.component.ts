import { Component, ElementRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { companyInfo, Status } from "./app.modal";
import { AppService } from "./app.service";

import { ChartType, ChartOptions } from "chart.js";
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from "ng2-charts";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  inputSafeNumber: string = "CA09649099";
  compParamChangedStatus: Status = Status.None;
  @ViewChild("filterSelect") filterSelect: ElementRef;
  @ViewChild("comparision") comparision: ElementRef;

  parameters: Array<any> = [
    { key: "Turnover", checked: false },
    { key: "Credit Score", checked: false },
    { key: "Location", checked: false },
    { key: "Credit worthy", checked: false },
    { key: "No of employees", checked: false },
  ];

  selectedCompParam = "Credit Score";

  comparisonParams: Array<string> = [
    "Credit Score",
    "Turnover",
    "No of employees",
  ];

  similarCompaniesInfo: Array<any> = [];
  creditScoreDefinations: Array<any> = [];
  selectedDef: string = "";

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [];

  config: any = {};

  lastCountry: string = "";
  currentCompany: companyInfo;
  referenceCompany: companyInfo;

  constructor(private _appService: AppService, private modalService: NgbModal) {
    this.onSearch();
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  onSearch() {
    this.currentCompany = this._appService.getCompanyBySafeNumber(
      this.inputSafeNumber
    );
    if (this.currentCompany) {
      this.similarCompaniesInfo = this._appService.getSimilarCompanies(
        this.inputSafeNumber,
        this.parameters
      );
    } else {
      this.similarCompaniesInfo = [];
    }
  }

  frameChartObject() {
    this.compParamChangedStatus = Status.None;
    this.currentCompany = this._appService.getCompanyBySafeNumber(
      this.inputSafeNumber
    );
    if (this.currentCompany && this.referenceCompany) {
      this.compParamChangedStatus = Status.InProgress;
      this.pieChartLabels = [
        this.currentCompany.cs_company_id,
        this.referenceCompany.cs_company_id,
      ];
      this.pieChartData = [];
      switch (this.selectedCompParam) {
        case "Turnover":
          this.pieChartData.push(parseInt(this.currentCompany.turnover, 0));
          this.pieChartData.push(parseInt(this.referenceCompany.turnover, 0));
          break;
        case "Credit Score":
          this.pieChartData.push(parseInt(this.currentCompany.credit_score, 0));
          this.pieChartData.push(
            parseInt(this.referenceCompany.credit_score, 0)
          );
          break;
        case "No of employees":
          this.pieChartData.push(parseInt(this.currentCompany.employees, 0));
          this.pieChartData.push(parseInt(this.referenceCompany.employees, 0));
          break;
      }
      this.compParamChangedStatus = Status.Completed;
    }
  }

  compareWithActualCompany(refCompany: companyInfo) {
    this.referenceCompany = refCompany;
    this.frameChartObject();
    this.modalService.open(this.comparision, {
      backdrop: "static",
      keyboard: false,
    });
  }

  isNoParamFilterSelected() {
    return this.parameters.filter((c) => c.checked === true).length === 0;
  }

  openAdvMatchFilterPopup() {
    this.modalService
      .open(this.filterSelect, {
        backdrop: "static",
        keyboard: false,
      })
      .result.then(
        (result) => {
          this.onSearch();
        },
        (reson) => {
          this.onSearch();
        }
      );
  }
}
