import { Prisma, Appointment } from '@prisma/client';

export interface IRepoAppointment {
  create(data: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment>;
  findById(id: string): Promise<Appointment | null>;
  findByPrestador(fk_prestador_id: string): Promise<Appointment[]>;
  findByClient(fk_client_id: string): Promise<Appointment | null>;
  delete(id: string): Promise<Appointment>;
  listAll(): Promise<Appointment[]>;
  update(data: Prisma.AppointmentUpdateInput, id: string): Promise<Appointment>;
}
