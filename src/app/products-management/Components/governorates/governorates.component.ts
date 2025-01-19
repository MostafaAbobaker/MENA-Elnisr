import { Component, OnInit } from '@angular/core';
import { GovernoratesService } from '../../Services/governorates.service';
import { IGovernorates } from '../../Interfaces/igovernorates';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-governorates',
  templateUrl: './governorates.component.html',
  styleUrls: ['./governorates.component.scss'],
  providers: [MessageService]
})
export class GovernoratesComponent implements OnInit {
  textSearch:string =''
  isAdd: boolean = false;
  buttonEdit: boolean = false;
  governorates: IGovernorates[] = []
  selectedGovernorate: any = null; // Add this line

  constructor(private _governoratesService: GovernoratesService, private messageService: MessageService) { }


  ngOnInit(): void {
    this.showGovernorates()
  }

  showGovernorates() {
    this._governoratesService.getGovernorates().subscribe({
      next: (response) => {
        console.log(response);
        this.governorates = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  formGovernorates: FormGroup = new FormGroup({
    nameAr: new FormControl(null, [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]),
    nameEn: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
    isFreeDelivery: new FormControl(false),
    deliverdFees: new FormControl(null, Validators.pattern(/^\d+$/)),
  }
  );

  addGovernorates(): void {
    console.log(this.formGovernorates);

    let nameEn: string = this.formGovernorates.value.nameEn.toLocaleLowerCase().trim()
    let govListNameEn = this.governorates.some(gov => gov.nameEn.toLocaleLowerCase() === nameEn.toLocaleLowerCase())


    if (this.formGovernorates.valid) {

        debugger
        if (this.selectedGovernorate) {
          this._governoratesService.updateGovernorates(this.selectedGovernorate.id, this.formGovernorates.value).subscribe({
            next: (response) => {
              console.log(response);
              this.showGovernorates();
              this.isAdd = false;
              this.buttonEdit = false;
              this.formGovernorates.reset();
              this.selectedGovernorate = null;
            },
            error: (err) => { console.log(err); },
          })
        } else {
          if (!govListNameEn) {
          this._governoratesService.addGovernorates(this.formGovernorates.value).subscribe({
            next: (response) => {
              console.log(response);
              this.showGovernorates()
              this.messageService.add({ severity: 'success', summary: 'تنبيه', detail: 'تم الاضافة بنجاح   ' });

            },
            error: (err) => {
              console.log(err);
            },
          })
        } else {
          this.messageService.add({ severity: 'info', summary: 'تنبيه', detail: 'هذه المحافظه موجوده بالفعل' });

        }
        }


    }

  }
  editGovernorates(gov: IGovernorates): void {
    this.isAdd = true;
    this.buttonEdit = true;
    this.selectedGovernorate = gov;
    this.formGovernorates.patchValue(gov)
    window.scrollTo(0, 0);

  }

  deleteGovernorates(id: number) {
    this._governoratesService.deleteGovernorates(id).subscribe({
      next: (response) => {
        console.log(response);
        this.showGovernorates();
        this.messageService.add({ severity: 'info', summary: 'تنبيه', detail: 'تم الحذف   ' });

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
