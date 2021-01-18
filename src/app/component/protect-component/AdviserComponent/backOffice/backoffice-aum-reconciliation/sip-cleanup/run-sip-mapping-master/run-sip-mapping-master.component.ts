import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BackOfficeService } from '../../../back-office.service';
import { EventService } from 'src/app/Data-service/event.service';
import { AuthService } from 'src/app/auth-service/authService';

@Component({
  selector: 'app-run-sip-mapping-master',
  templateUrl: './run-sip-mapping-master.component.html',
  styleUrls: ['./run-sip-mapping-master.component.scss']
})
export class RunSipMappingMasterComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  countOfWizard: any;
  hideCount: boolean = false;
  wizardList: any;
<<<<<<< HEAD
  isLoading: boolean;
  isLoding: boolean = false;
=======
  isLoading: boolean = false;
>>>>>>> 3991e8718c19a8c37cc41ec7b27c7367ad6a2d7c
  percentage: number = 0;
  constructor(public dialogRef: MatDialogRef<RunSipMappingMasterComponent>,
    private backOfficeService: BackOfficeService, private eventService: EventService) { }
  showWizard: boolean = false
  ngOnInit() {
    this.getSipWizardCount()
  }
  close() {
    this.dialogRef.close()
  }
  getSipWizardCount() {
    this.isLoading = true;
    let data = {
      advisorId: AuthService.getAdvisorId()
    }
    this.backOfficeService.getSipWizardCount(data).subscribe(
      (res) => {
        if (res) {
          this.isLoading = false;
          this.countOfWizard = res
          console.log('count wizard')
        } else {
          this.eventService.openSnackBar("No Data Found!", "DISMISS")
        }
      },
      (err) => {
        this.eventService.openSnackBar(err, "DISMISS")
      }
    );
  }
  previousWizard() {
    this.isLoading = true;
    let data = {
      advisorId: AuthService.getAdvisorId()
    }
    this.backOfficeService.previousSipWizard(data).subscribe(
      (res) => {
        this.isLoading = false;
        if (res) {
          this.wizardList = []
          if (res.length > 1) {
            this.wizardList = res
          }
          this.showWizard = true
          this.hideCount = true
          console.log('previousSipWizard', res)
        } else {
          this.eventService.openSnackBar("No Data Found!", "DISMISS")
        }
      },
      (err) => {
        this.eventService.openSnackBar(err, "DISMISS")

      }
    );
  }
  refreshWizard(value) {
    this.isLoading = true;
    let data = {
      id: value.id
    }
    this.backOfficeService.refreshWizard(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.wizardList.forEach(element => {
          if (res.id == element.id) {
            element = res
            if (element.processedCount == 0) {
              this.percentage = 0
            } else {
              this.percentage = (element.totalSip / element.processedCount) * 100
            }
          }
        });
        this.showWizard = true
        this.hideCount = true
        console.log('refreshWizard', res)
        if (res) {
        } else {
          this.eventService.openSnackBar("No Data Found!", "DISMISS")
        }
      },
      (err) => {
        this.eventService.openSnackBar(err, "DISMISS")
      }
    );
  }
  runWizard() {
    this.isLoading = true;
    let data = {
      advisorId: AuthService.getAdvisorId()
    }
    this.backOfficeService.runSipWizard(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.wizardList = []
        this.wizardList.push(res)
        if (res.processedCount == 0) {
          this.percentage = 0
        } else {
          this.percentage = (res.totalSip / res.processedCount) * 100
        }
        this.showWizard = true
        this.hideCount = true
        console.log('count wizard', res)
        if (res) {

        } else {
          this.eventService.openSnackBar("No Data Found!", "DISMISS")
        }
      },
      (err) => {

      }
    );
  }
}
export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: '4,489', name: '1,720', weight: '1,339', symbol: '381' },

];