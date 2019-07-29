import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AssignmentService } from 'src/app/shared/services/assignment.service';

@Component({
  selector: 'app-add-form-modal',
  templateUrl: './add-form-modal.component.html',
})
export class AddFormModalComponent implements OnInit {
  public formMain: FormGroup;
  public dataSource = this.assignmentService.getAllAssignments();
  public cameraAvailable: Models.CameraInterface[] = this.assignmentService.getAvailableCameras();
  public vehicleAvailable: Models.VehicleInterface[] = this.assignmentService.getAvailableVehicles();
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public dataAlt: any,
    private fb: FormBuilder,
    private assignmentService: AssignmentService,
  ) {}
  myControl = new FormControl();
  ngOnInit() {
    this.dataSource = this.assignmentService.getAllAssignments();
    this.cameraAvailable = this.assignmentService.getAvailableCameras();
    this.vehicleAvailable = this.assignmentService.getAvailableVehicles();

    // console.log('cameraAvailable', this.cameraAvailable);
    // console.log('vehicleAvailable', this.vehicleAvailable);
    console.log('getAllAssignments', this.dataSource);

    this.formMain = this.fb.group({
      Name: ['', []],
      Location: ['', []],
      VehicleId: [null, Validators.required],
      CameraId: [null, Validators.required],
    });

    if (this.dataAlt) {
      console.log('dataAlt');

      const selectedCameras: Models.CameraInterface = this.assignmentService
        .getAllCameras()
        .slice()
        .filter(ele => ele.Id === this.dataAlt.CameraId)[0];

      const selectedVehicles: Models.VehicleInterface = this.assignmentService
        .getAllVehicles()
        .slice()
        .filter(ele => ele.Id === this.dataAlt.VehicleId)[0];

      this.vehicleAvailable.push(selectedVehicles);
      this.formMain.get('VehicleId').setValue(this.dataAlt.VehicleId);

      this.cameraAvailable.push(selectedCameras);
      this.formMain.get('CameraId').setValue(this.dataAlt.CameraId);

      this.formMain.get('Name').setValue(this.dataAlt.Name);
      this.formMain.get('Location').setValue(this.dataAlt.Location);
    }
  }

  /**
   * Submit the form send info to the main page
   */
  public submit() {
    const leadObj = {
      ...this.formMain.getRawValue(),
      DateCreated: new Date().toUTCString(),
    };

    leadObj.Id = this.dataAlt ? this.dataAlt.Id : Math.floor(Math.random() * 999999);

    console.log(leadObj, 'submit');

    this.dialogRef.close(leadObj);
  }

  public userSubmit(info: any) {
    console.log(info);
  }

  public setFormType(type: any) {
    console.log(type);
  }
}
