import { ActionTypes } from '../constants/actionTypes';
export interface Action {
  type: ActionTypes;
  params: any[];
}
