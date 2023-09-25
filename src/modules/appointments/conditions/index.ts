/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { prisma } from '@/lib/prisma';
import pt, {
  addMinutes,
  eachMinuteOfInterval,
  format,
  getDay,
  getHours,
  getMinutes,
  getMonth,
  isAfter,
  isBefore,
  isPast,
  isSameDay,
  set,
  setDate,
  subMinutes,
} from 'date-fns';
import dayjs from 'dayjs';

import 'dayjs/locale/pt-br'; // import locale

import { isInterval } from '../utils/units-convers';

// dayjs.extend(isLeapYear); // use plugin

dayjs.locale('pt-BR');

interface I {
  clientId: string;
  providerId: string;
  from: number;
  at: number;
}

interface IAvaliable {
  providerId: string;
  service: string;
  duration: number;
  day: number;
  month: number;
}

export async function avaliable(data: IAvaliable) {
  const error = null;
  let agenda: string[] = [];
  const hoursAvaliable: Date[] = [];
  const hours: Date[] = [];
  const workhours: Date[] = [];

  const workhour = await prisma.workhour.findFirst({
    where: { fk_provider_id: data.providerId },
  });

  const startWorkhour = set(new Date(), {
    date: data.day,
    month: data.month,
    hours: workhour!.from / 60,
    minutes: 0,
    seconds: 0,
  });

  const lastWordHour = set(new Date(), {
    date: data.day,
    month: data.month,
    hours: workhour!.at / 60,
    minutes: 0,
    seconds: 0,
  });

  const appointment = await prisma.appointment.findMany({
    where: {
      AND: [{ fk_provider_id: data.providerId }],
    },
  });

  const appointments = appointment
    .filter(h => {
      const isHour = isInterval(
        h.start,
        subMinutes(startWorkhour, 1),
        lastWordHour,
      );
      if (isHour) {
        return h;
      }
    })
    .sort((a, b) => {
      if (a.start < b.start) {
        return -1;
      }
    });

  const lastLength = appointments.length - 1;

  if (appointments.length > 0 && workhour) {
    const ispas = isBefore(startWorkhour, subMinutes(appointments[0].start, 1));

    if (ispas) {
      eachMinuteOfInterval(
        // calcula do inicio da jornada até o primeiro horário agendado
        {
          start: startWorkhour,
          end: subMinutes(appointments[0].start, 1),
        },
        { step: data.duration },
      ).forEach(h => {
        const past = isBefore(
          addMinutes(h, data.duration),
          subMinutes(appointments[0].start, 1),
        );

        if (past) {
          workhours.push(h);
        }
      });
    }

    eachMinuteOfInterval(
      // calcula do inicio da jornada até o primeiro horário agendado
      {
        start: appointments[lastLength].end,
        end: lastWordHour,
      },
      { step: data.duration },
    ).forEach(h => {
      const past = isBefore(addMinutes(h, data.duration), lastWordHour);

      if (past) {
        workhours.push(h);
      }
    });

    appointments.forEach((h, i) => {
      const index = i + 1;

      if (index <= lastLength) {
        const sub = subMinutes(appointments[index].start, 1);

        const start = h.end;
        const end = sub;

        eachMinuteOfInterval(
          {
            start,
            end,
          },
          {
            step: data.duration,
          },
        ).forEach(p => {
          const past = isBefore(addMinutes(p, data.duration), sub);

          if (past) {
            workhours.push(p);
          }
        });
      }
    });
  }

  if (appointments.length === 0 && workhour) {
    const sub = subMinutes(lastWordHour, data.duration);
    eachMinuteOfInterval(
      {
        start: startWorkhour,
        end: sub,
      },
      {
        step: data.duration,
      },
    ).forEach(h => workhours.push(h));
  }

  workhour?.week.forEach(h => {
    workhours.forEach(p => {
      const week = getDay(p);
      if (h === week) {
        hoursAvaliable.push(p);
      }
    });
  });

  const avaliableVocation = await prisma.vocation.findMany({
    where: { fk_provider_id: data.providerId },
  });

  const horariosDisponiveis: Date[] = [];
  const date = set(new Date(), {
    date: data.day,
    month: data.month,
  });

  const weekWorkHour = getDay(startWorkhour);
  const monthWorkHour = getMonth(startWorkhour);

  const vocation = avaliableVocation
    .filter((h, i) => {
      const { start } = h;

      const isDay = isSameDay(date, start);

      if (isDay && h.type === 'DIARIA') {
        return h;
      }

      if (weekWorkHour === h.weekend[i] && h.type === 'SEMANAL') {
        return h;
      }

      if (monthWorkHour === getMonth(h.start) && h.type === 'MENSAL') {
        return h;
      }
    })
    .sort((a, b) => {
      if (a.start < b.start) {
        return -1;
      }
    });

  if (vocation.length > 0) {
    const lastIndexVocation = vocation.length - 1;

    vocation.forEach((h, i) => {
      if (h.type === 'DIARIA') {
        const end = subMinutes(h.end, data.duration);
        eachMinuteOfInterval({
          start: subMinutes(h.start, data.duration - 1),
          end: h.end,
        }).forEach(p => hours.push(p));
      }

      if (h.type === 'SEMANAL') {
        const start = set(new Date(), {
          month: data.month,
          hours: getHours(h.start),
          minutes: getMinutes(h.start),
          date: data.day,
        });
        const endVocation = set(new Date(), {
          date: data.day,
          month: data.month,
          hours: getHours(h.end),
          minutes: getMinutes(h.end),
        });
        const end = addMinutes(endVocation, 1);

        eachMinuteOfInterval({
          start: subMinutes(start, 1),
          end,
        }).forEach(p => hours.push(p));
      }

      if (h.type === 'MENSAL') {
        const start = set(new Date(), {
          month: data.month,
          hours: getHours(h.start),
          minutes: getMinutes(h.start),
          date: data.day,
        });
        const endVocation = set(new Date(), {
          date: data.day,
          month: data.month,
          hours: getHours(h.end),
          minutes: getMinutes(h.end),
        });
        const end = addMinutes(endVocation, 1);

        eachMinuteOfInterval({
          start: subMinutes(start, 1),
          end,
        }).forEach(p => hours.push(p));
      }
    });

    console.log(hours);
    workhours.forEach(h => {
      const findIndex = hours.findIndex(p => p.getTime() === h.getTime());
      if (findIndex <= 0) {
        horariosDisponiveis.push(h);
      }
    });
  }

  if (vocation.length === 0) {
    workhours.forEach(h => horariosDisponiveis.push(h));
  }

  agenda = horariosDisponiveis
    .sort((a, b) => {
      if (a < b) {
        return -1;
      }
    })
    .map(h => {
      const hour = format(h, 'HH:mm');
      return hour;
    });

  console.log(agenda);

  return { agenda, error };
}
