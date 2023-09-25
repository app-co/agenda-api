import { AppointmentAvaliable } from '../use-cases/appointment-avaliable';

export function makeAvaliable() {
  const make = new AppointmentAvaliable();

  return make;
}
