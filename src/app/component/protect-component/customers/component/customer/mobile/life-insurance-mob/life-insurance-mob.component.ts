import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { EventService } from 'src/app/Data-service/event.service';
import { AuthService } from 'src/app/auth-service/authService';

@Component({
  selector: 'app-life-insurance-mob',
  templateUrl: './life-insurance-mob.component.html',
  styleUrls: ['./life-insurance-mob.component.scss']
})
export class LifeInsuranceMobComponent implements OnInit {
  @Output() outputValue = new EventEmitter<any>();
  clientId: any;
  advisorId: any;
  totalCurrentValue = 0;
  termCv: any;
  traditionalCv: number;
  ulipCv: number;

  constructor(private custumService:CustomerService,private eventService:EventService) { }

  ngOnInit() {
    this.advisorId = AuthService.getAdvisorId();
    this.clientId = AuthService.getClientId();
    this.getTermInsurance();
    this.getTraditionalInsurance();
    this.getUlipInsurance();
  }
  getTermInsurance(){
    const obj = {
      clientId: this.clientId,
      advisorId: this.advisorId,
      insuranceSubTypeId: 1,
      insuranceTypeId: 1
    };
    this.custumService.getLifeInsuranceData(obj).subscribe(
      data => {
        if(data){
          this.termCv = 0;
          data.forEach(element => {
            this.termCv =+ element.currentValue
          });
          this.calculateSum();
        }
      }, (error) => {
        this.eventService.showErrorMessage(error);
      }
    );
  }
  getTraditionalInsurance(){
    const obj = {
      clientId: this.clientId,
      advisorId: this.advisorId,
      insuranceSubTypeId: 2,
      insuranceTypeId: 1
    };
    this.custumService.getLifeInsuranceData(obj).subscribe(
      data => {
        if(data){
          this.traditionalCv = 0;
          data.forEach(element => {
            this.traditionalCv =+ element.currentValue
          });
          this.calculateSum();
        }
      }, (error) => {
        this.eventService.showErrorMessage(error);
      }
    );
  }
  getUlipInsurance(){
    const obj = {
      clientId: this.clientId,
      advisorId: this.advisorId,
      insuranceSubTypeId: 3,
      insuranceTypeId: 1
    };
    this.custumService.getLifeInsuranceData(obj).subscribe(
      data => {
        if(data){
          this.ulipCv = 0;
          data.forEach(element => {
            this.ulipCv =+ element.currentValue
          });
          this.calculateSum();
        }
      }, (error) => {
        this.eventService.showErrorMessage(error);
      }
    );
  }
  changeValue(flag){
    this.outputValue.emit(flag);
  }
  calculateSum(){
    this.totalCurrentValue = this.termCv+this.traditionalCv+this.ulipCv
  }
}
