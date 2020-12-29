import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-service/authService';
import { Subscription, Observable } from 'rxjs';
import { PeopleService } from '../../../PeopleComponent/people.service';
import { startWith, debounceTime } from 'rxjs/operators';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProcessTransactionService } from '../../transactions/overview-transactions/doTransaction/process-transaction.service';
import { EventService } from 'src/app/Data-service/event.service';
import { ConfirmDialogComponent } from '../../../common-component/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-crm-notes',
  templateUrl: './crm-notes.component.html',
  styleUrls: ['./crm-notes.component.scss']
})
export class CrmNotesComponent implements OnInit {

  isAdvisorSection = true;
  familyOutputSubscription: Subscription;
  familyOutputObservable: Observable<any> = new Observable<any>();
  filteredStates: any;
  stateCtrl = new FormControl('', [Validators.required]);
  familyMemberData: any;
  selectedName: any;
  listOfNotes: any;
  emailBody: string = "";
  selectedNote: any;
  noteData: any;
  notes: any;
  date: Date;
  isLoading: any;
  isMainLoading: any;
  clientId: any;
  visibleToClient: boolean = false
  objForDelete: any;
  searchQuery: any;
  activeOnSelect: boolean = false;


  constructor(private peopleService: PeopleService,
    public dialog: MatDialog,
    public eventService: EventService,
    private fb: FormBuilder,
    public processTransaction: ProcessTransactionService, ) { }

  ngOnInit() {
    this.objForDelete = []
    this.listOfNotes = []
    this.date = new Date()
    this.getNotes();
    this.getdataForm("")
    this.isLoading = true;
  }
  getdataForm(data) {
    this.notes = this.fb.group({
      subject: [(!data.ownershipType) ? '' : (data.subject) + '', [Validators.required]],
      clientName: [(!data.clientName) ? '' : (data.clientName) + '', [Validators.required]],
    });


  }
  showToClient(value) {
    this.visibleToClient = value.checked
  }
  getFormControl(): any {
    return this.notes.controls;
  }
  checkOwnerList(value) {
    if (!this.isAdvisorSection) {
      return;
    }
    if (value.length <= 2) {
      this.filteredStates = undefined
      return;
    }
    const obj = {
      advisorId: AuthService.getAdvisorId(),
      displayName: value
    };
    if (this.familyOutputSubscription && !this.familyOutputSubscription.closed) {
      this.familyOutputSubscription.unsubscribe();
    }
    this.familyOutputSubscription = this.familyOutputObservable.pipe(startWith(''),
      debounceTime(1000)).subscribe(
        data => {
          this.peopleService.getClientFamilyMemberList(obj).subscribe(responseArray => {
            if (responseArray) {
              this.clientId = responseArray[0].clientId
              if (value.length >= 0) {
                this.filteredStates = responseArray;
              } else {
                this.filteredStates = undefined
              }
            } else {
              this.filteredStates = undefined
              this.stateCtrl.setErrors({ invalid: true })
            }
          }, error => {
            this.filteredStates = undefined
            console.log('getFamilyMemberListRes error : ', error);
          });
        }
      );
  }
  clearNote() {
    this.selectedNote = undefined
    this.emailBody = ""
    this.notes.controls.subject.setValue('')
    this, this.stateCtrl.setValue('')
  }
  selectClient(value) {
    console.log(value)
    this.clientId = value.clientId
  }

  getNotes() {
    this.isLoading = true
    let obj = {
      advisorId: AuthService.getAdvisorId(),
      searchQuery: (this.searchQuery) ? this.searchQuery : '',
      limit: -1,
      offset: 0
    }
    this.peopleService.getNotes(obj)
      .subscribe(res => {
        if (res && res.length > 0) {
          console.log(res);
          this.isLoading = false
          this.listOfNotes = res
          this.listOfNotes.forEach(element => {
            element.content = element.content.replace(/<\/?p[^>]*>/g, "");
            element.activeOnSelect = false
            element.checked = false
          });
          console.log(this.listOfNotes);
        } else {
          this.isLoading = false
          this.listOfNotes = []
        }


      }, err => {
        console.error(err);
        this.isLoading = false
        this.listOfNotes = []
      })
  }
  selectAll(event) {
    if (event.checked == true) {
      this.listOfNotes.forEach(element => {
        element.checked = true
        this.objForDelete.push({ id: element.id })
      });
    } else {
      this.listOfNotes.forEach(element => {
        element.checked = false
        this.objForDelete = []
      });
    }
  }
  selectNote(note) {
    console.log('selectedNote', note)
    this.stateCtrl.setValue('');
    this.selectedNote = note
    this.clientId = note.clientId
    this.notes.controls.subject.setValue(note.subject)
    this.notes.controls.clientName.setValue(note.clientName)
    this.stateCtrl.setValue(note.clientName)
    this.emailBody = note.content
    this.listOfNotes.forEach(element => {
      if (element.id == note.id) {
        element.activeOnSelect = true
      } else {
        element.activeOnSelect = false
      }

    });
  }
  addNotes(note) {
    let obj = {
      id: null,
      advisorId: AuthService.getAdvisorId(),
      clientId: this.clientId,
      clientName: this.stateCtrl.value.name,
      subject: this.notes.controls.subject.value,
      content: this.emailBody,
      updatedTime: new Date(),
      visibleToClient: this.visibleToClient
    }
    if (!this.selectedNote) {
      this.peopleService.addNotes(obj)
        .subscribe(res => {
          console.log(res);
          this.eventService.openSnackBar("Note save successfully!", "DISMISS");
          this.getNotes()
          this.clearNote()
        }, err => {
          console.error(err);
        })
    } else {
      obj.id = this.selectedNote.id
      this.peopleService.editNotes(obj)
        .subscribe(res => {
          console.log(res);
          this.eventService.openSnackBar("Notes updated successfully!", "DISMISS");
          this.getNotes()
          this.clearNote()
        }, err => {
          console.error(err);
        })
    }

  }
  selectForDelete(value, note) {
    if (this.objForDelete.length == 0) {
      if (value.checked == true) {
        this.objForDelete.push({ id: note.id })
      }
    } else {
      this.objForDelete.forEach((x) => {
        if (x.id != note.id) {
          if (value.checked == true) {
            this.objForDelete.push({ id: note.id })
          }
        }
      })
    }
    this.listOfNotes.forEach(element => {
      if (element.id == note.id) {
        element.checked = value.checked
      }
    });
  }
  editNotes() {
    let obj = {}

  }
  saveData(data) {
    this.emailBody = data;
  }
  onSearchChange(value) {
    this.searchQuery = value
    if (this.searchQuery.length > 3) {
      this.getNotes()
    }
  }
  deleteNotes(note) {
    if (this.objForDelete.length == 0) {
      this.objForDelete.push({ id: note.id })
    }
    const dialogData = {
      data: '',
      header: 'DELETE',
      body: 'Are you sure you want to delete?',
      body2: 'This cannot be undone.',
      btnYes: 'CANCEL',
      btnNo: 'DELETE',
      positiveMethod: () => {
        // const obj = {
        //   advisorId: this.advisorId,
        //   id: this.singlePlanData.id
        // };
        this.peopleService.deleteNotes(this.objForDelete).subscribe(
          data => {
            this.getNotes()
            this.clearNote()
            dialogRef.close();
          }
        );

      },
      negativeMethod: () => {
      }
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData,
      autoFocus: false,

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  ownerDetails(value) {
    this.notes.controls.clientName.setValue(value.name)
    this.selectedName = value.name;
    this.familyMemberData = value;
  }
}
