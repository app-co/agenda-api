import { envRoutes } from '@/env';
import { schemeRoutes } from '@/shared/routes/schemeRoutes';
import { FastifyInstance } from 'fastify';

import { appointmentAvaliableController } from '../appoitment-controllers/appointment-avaliable';
import { AppointmentController } from '../appoitment-controllers/controllers-appoitments';
import { listAll } from '../appoitment-controllers/listAll';
import { register } from '../appoitment-controllers/register';
import { update } from '../appoitment-controllers/update';

const controller = new AppointmentController();

export async function RoutesAppointment(app: FastifyInstance) {
  app.post(envRoutes.CREATE_APPOINTMENT, register);
  app.put(envRoutes.UPDATE_APPOINTMENT, update);

  app.get(envRoutes.LIST_ALL_APPOINTMENT, listAll);
  app.get(schemeRoutes.appointment.by_prestador, controller.byPrestador);
  app.get(schemeRoutes.appointment.avaliable, appointmentAvaliableController);
}
