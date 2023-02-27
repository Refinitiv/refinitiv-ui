import type { Notification } from '../elements/notification';

export type Task = {
  el: Notification;
  options: TaskOptions;
}

export type TaskOptions = {
  message: string;
  type: string;
  duration: number;
}

