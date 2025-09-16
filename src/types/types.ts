export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface WorkTypes {
  id: number;
  name: string;
  nameGt5: string;
  nameLt5: string;
  nameOne: string;
}

export interface Shift {
  id: string;
  logo: string;
  coordinates: Coordinates;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: number;
  planWorkers: number;
  workTypes: WorkTypes[];
  priceWorker: number;
  bonusPriceWorker: number;
  customerFeedbacksCount: string;
  customerRating: number;
  isPromotionEnabled: boolean;
}


export interface DataResponse {
  data: Shift[],
  status: number;
}