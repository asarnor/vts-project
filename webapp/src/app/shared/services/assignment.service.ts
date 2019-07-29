import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Sample data
 */
const ELEMENT_DATA: Models.CameraAssignment[] = [
  {
    DateCreated: new Date('1/14/2019').toUTCString(),
    Location: '7511 Columbia St. El Paso, TX 79930',
    Name: 'Corporate',
    Deleted: true,
    Id: 1,
    CameraId: 6,
    VehicleId: 6,
  },
  {
    DateCreated: new Date('2/14/2019').toUTCString(),
    Location: '9395 Circle St. Tacoma, WA 98444',
    Name: 'Farm Safety',
    Deleted: true,
    Id: 2,
    CameraId: 7,
    VehicleId: 7,
  },
  {
    DateCreated: new Date('3/15/2019').toUTCString(),
    Location: '7348 North East Ave. Knoxville, TN 37918',
    Name: 'Tanker Test',
    Deleted: true,
    Id: 3,
    CameraId: 8,
    VehicleId: 8,
  },
];

const CAMERA_AVAILABLE: Models.CameraInterface[] = [
  { Name: 'Blackmagic PCC4K', DeviceNo: 6, Id: 6 },
  { Name: 'Sony AX700', DeviceNo: 7, Id: 7 },
  { Name: 'Panasonic HC-VX1', DeviceNo: 8, Id: 8 },
  { Name: 'Canon Vixia HF R800', DeviceNo: 9, Id: 9 },
  { Name: 'GoPro Hero7 Black', DeviceNo: 10, Id: 10 },
  { Name: 'Panasonic Lumix GH5', DeviceNo: 11, Id: 11 },
];

const VEHICLE_AVAILABLE: Models.VehicleInterface[] = [
  { Name: 'Ford Truck', Description: 'Nice Truck', Id: 6 },
  { Name: 'Cement mixer', Description: '4 wheel drive', Id: 7 },
  { Name: 'Tanker', Description: '8', Id: 8 },
  { Name: 'Forklift', Description: '9', Id: 9 },
  { Name: 'Tractor', Description: '10', Id: 10 },
  { Name: 'Tractor-trailer', Description: '11', Id: 11 },
];

/**
 * Manages receiving and setting initial environment settings
 */
@Injectable()
export class AssignmentService {
  constructor() {}

  getAllAssignments(): Models.CameraAssignment[] {
    return ELEMENT_DATA;
  }

  getAllCameras(): Models.CameraInterface[] {
    return CAMERA_AVAILABLE;
  }

  getAllVehicles(): Models.VehicleInterface[] {
    return VEHICLE_AVAILABLE;
  }

  getAvailableCameras(): Models.CameraInterface[] {
    const cameras = ELEMENT_DATA.slice().map(x => x.CameraId);
    return CAMERA_AVAILABLE.filter(camera => {
      return cameras.includes(camera.Id) === false;
    });
  }

  getSelectedCameras(): Models.CameraInterface[] {
    return CAMERA_AVAILABLE.filter(camera => {
      return ELEMENT_DATA.find(assignment => {
        return camera.Id === assignment.CameraId;
      });
    });
  }

  getAvailableVehicles(): Models.VehicleInterface[] {
    const vehicles = ELEMENT_DATA.slice().map(x => x.VehicleId);
    return VEHICLE_AVAILABLE.filter(vehicle => {
      return vehicles.includes(vehicle.Id) === false;
    });
  }

  getSelectedVehicles(): Models.VehicleInterface[] {
    return VEHICLE_AVAILABLE.filter(vehicle => {
      return ELEMENT_DATA.find(assignment => {
        return vehicle.Id === assignment.VehicleId;
      });
    });
  }

  removeSelectedAssignment(assignment: Models.CameraAssignment): Observable<Models.CameraAssignment[]> {
    return of(ELEMENT_DATA.splice(ELEMENT_DATA.findIndex(ele => ele.Id === assignment.Id), 1));
  }

  addAssignment(assignment: Models.CameraAssignment): Observable<Models.CameraAssignment[]> {
    const assignmentIndex = this.checkForExistingId(assignment.Id);
    if (assignmentIndex !== -1) {
      console.log('same index');
      ELEMENT_DATA[assignmentIndex] = assignment;
    } else {
      console.log('new index');
      ELEMENT_DATA.push(assignment);
    }
    return of(ELEMENT_DATA);
  }
  checkForExistingId(id: Number) {
    return ELEMENT_DATA.findIndex(element => element.Id === id);
  }
}
