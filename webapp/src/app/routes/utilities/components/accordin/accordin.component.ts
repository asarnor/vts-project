import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
// import { ModalsService } from '$modals';
import { MatAccordion } from '@angular/material';
// import { Router } from '@angular/router';
import { AssignmentService } from '$shared';

export interface JobBriefSummary {
  Address: string;
  Date: string;
  Foreman: string;
  Signed: boolean;
  Forms: string[];
  View: string;
}

@Component({
  selector: 'app-accordin',
  templateUrl: './accordin.component.html',
  styleUrls: ['./accordin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordinComponent implements OnInit, OnDestroy {
  public panelOpenState: Boolean = true;
  public allCameras = this.assignmentService.getAllCameras();
  public allVehicles = this.assignmentService.getAllVehicles();
  public allAssignments = this.assignmentService.getAllAssignments();

  @ViewChild('accordion', { static: true }) Accordion: MatAccordion;

  constructor(private assignmentService: AssignmentService) {}

  public isAvailableCamera(id: Number) {
    return this.assignmentService.getAllAssignments().findIndex(element => element.CameraId === id) > -1;
  }

  public isAvailableVehicle(id: Number) {
    return this.assignmentService.getAllAssignments().findIndex(element => element.VehicleId === id) > -1;
  }

  ngOnInit() {
    console.log('accordin');
    this.allCameras = this.assignmentService.getAllCameras();
    this.allVehicles = this.assignmentService.getAllVehicles();
    this.allAssignments = this.assignmentService.getAllAssignments();
  }

  /** Must be present even if not used for autounsub */
  ngOnDestroy() {}
}
