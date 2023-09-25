import { RoutesAppointment } from '@/modules/appointments/http/routes/routes';
import { RoutesClient } from '@/modules/clients/http/routes/routes';
import { RoutesProvider } from '@/modules/providers/http/routes/routes';
import { RoutesServices } from '@/modules/services/http/routes/routes';
import { VovationRoutes } from '@/modules/vacation/http/routes';
import { RoutesWorkhour } from '@/modules/work-hour/http/routes/routes';
import { FastifyInstance } from 'fastify';

export async function Routes(app: FastifyInstance) {
  app.register(RoutesClient);
  app.register(RoutesServices);
  app.register(RoutesProvider);
  app.register(RoutesAppointment);
  app.register(RoutesWorkhour);
  app.register(VovationRoutes);
}
