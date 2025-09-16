import { makeAutoObservable, runInAction } from 'mobx';
import { Shift } from '../types/types';

class ShiftStore {
  shifts: Shift[] = [];
  selectedShiftId: string | null = null;
  loading: boolean = false;
  error: string | null = null;
  permissionGranted: boolean | null = null;
  isGeolocationRequested: boolean = false;
  latitude: number | null = null;
  longitude: number | null = null;
  isLocationGranted: boolean = false;
  isLocationRequested: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  resetGeolocation() {
    this.latitude = null;
    this.longitude = null;
    this.isLocationGranted = false;
    this.isLocationRequested = false;
    this.isGeolocationRequested = false;
    this.permissionGranted = false;
  }

  setShifts = (data: Shift[]) => {
    this.shifts = data;
  };

  selectShift = (id: string) => {
    this.selectedShiftId = String(id);
  };

  get selectedShift(): Shift | null {
    return this.shifts.find(shift => shift.id === this.selectedShiftId) || null;
  }

  setPermissionGranted = (status: boolean) => {
    this.permissionGranted = status;
  };

  setGeolocationRequested = (status: boolean) => {
    this.isGeolocationRequested = status;
  };

  async fetchShifts() {
    this.loading = true;
    this.error = null;
 

    console.log('shiftstore - ', this.latitude)

    try {
      const response = await fetch(
        `https://mobile.handswork.pro/api/shifts/map-list-unauthorized?latitude=${this.latitude}&longitude=${this.longitude}`,
      );
      const responseText = await response.text();
      

      if (!response.ok) throw new Error('Ошибка запроса');
      const data: Shift[] = await JSON.parse(responseText).data;

      runInAction(() => {
        this.shifts = data;
        this.loading = false;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || 'Ошибка при загрузке данных';
        this.loading = false;
      });
    }
  }
}

export const shiftStore = new ShiftStore();
