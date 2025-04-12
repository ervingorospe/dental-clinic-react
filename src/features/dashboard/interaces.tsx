export interface Service {
  id?: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export interface User {
  id?: string | number;
  firstName: string;
  lastName: string;
  role: string;
  email?: string;
  active?: boolean;
}

export interface Appointment {
  id?: string | number;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  reason?: string;
  notes?: string,
  service: Service
  patient: User;
  doctor: User;
}

export interface Datetime {
  date: string;
  startTime: string;
  endTime: string;
}