import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ModalsService } from '$modals';
import { AssignmentService } from '$shared';
// import { CREW_SELECTED } from 'src/app/routes/_route/shared/services/questionaire';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('crewExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SummaryTableComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['Location', 'Date Created', 'Name', 'Deleted', 'Modify', 'Id', 'VehicleId', 'CameraId'];
  public dataSource = new MatTableDataSource(this.assignments.getAllAssignments());
  public expandedElement: Models.CameraAssignment | null;
  public cameraSelected: Models.CameraInterface[] = this.assignments.getSelectedCameras();
  public vehicleSelected: Models.VehicleInterface[] = this.assignments.getSelectedVehicles();
  public vehiclesAvailable: Models.VehicleInterface[] = this.assignments.getAvailableVehicles();
  public camerasAvailable: Models.CameraInterface[] = this.assignments.getAvailableCameras();
  constructor(
    private modals: ModalsService,
    private assignments: AssignmentService, // private router: Router,
  ) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    // Open log out modal window
    // this.modals.open('AddFormModalComponent', false, 'lg', 60).afterClosed();

    this.dataSource.sort = this.sort;

    this.camerasAvailable = this.assignments.getAvailableCameras();
    this.vehiclesAvailable = this.assignments.getAvailableVehicles();

    this.cameraSelected = this.assignments.getSelectedCameras();
    this.vehicleSelected = this.assignments.getSelectedVehicles();
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public modifyForm($event: Event, data: any) {
    $event.stopPropagation();
    this.modals.open('AddFormModalComponent', false, 'lg', 'Modify Form', data).afterClosed();
  }

  public removeSelectedAssignment(assignment: Models.CameraAssignment) {
    this.assignments.removeSelectedAssignment(assignment);
    this.resetData();
  }

  public addAssignment(assignment: Models.CameraAssignment) {
    this.assignments.addAssignment(assignment);
    this.resetData();
  }

  public addForm($event: Event, data: any = false) {
    $event.stopPropagation();

    if (data) {
      this.modals
        .open('AddFormModalComponent', true, 'lg', 'Modify Form', data)
        .afterClosed()
        .subscribe(value => {
          console.log(value);
          console.log(`Dialog sent: ${value}`);
          if (value && value !== undefined) {
            this.modals
              .open('ConfirmationModalComponent', true, 'lg', 'Are your sure?')
              .afterClosed()
              .subscribe(confirm => {
                console.log(confirm);
                console.log(`Dialog sent: ${confirm}`);
                if (confirm && confirm !== undefined) {
                  this.addAssignment(value);
                }
              });
          }
        });
    } else {
      this.modals
        .open('AddFormModalComponent', true, 'lg', data)
        .afterClosed()
        .subscribe(value => {
          console.log(value);
          console.log(`Dialog sent: ${value}`);
          if (value && value !== undefined) {
            this.modals
              .open('ConfirmationModalComponent', true, 'lg', 'Are your sure?')
              .afterClosed()
              .subscribe(confirm => {
                console.log(confirm);
                console.log(`Dialog sent: ${confirm}`);
                if (confirm && confirm !== undefined) {
                  this.addAssignment(value);
                }
              });
          }
        });
    }
  }

  private resetData() {
    this.camerasAvailable = this.assignments.getAvailableCameras();
    this.vehiclesAvailable = this.assignments.getAvailableVehicles();

    this.cameraSelected = this.assignments.getSelectedCameras();
    this.vehicleSelected = this.assignments.getSelectedVehicles();

    this.dataSource.data = this.assignments.getAllAssignments();
  }

  /** Must be present even if not used for autounsub */
  ngOnDestroy() {}
}
