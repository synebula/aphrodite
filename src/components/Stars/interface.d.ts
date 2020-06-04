import { format } from './StarFormat';
import { Dispatch } from 'redux';

export interface StarProps {
  format?: format;

  dispatch?: Dispatch;
}
