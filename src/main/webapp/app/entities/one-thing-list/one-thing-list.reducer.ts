import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOneThingList, defaultValue } from 'app/shared/model/one-thing-list.model';

export const ACTION_TYPES = {
  FETCH_ONETHINGLIST_LIST: 'oneThingList/FETCH_ONETHINGLIST_LIST',
  FETCH_ONETHINGLIST: 'oneThingList/FETCH_ONETHINGLIST',
  CREATE_ONETHINGLIST: 'oneThingList/CREATE_ONETHINGLIST',
  UPDATE_ONETHINGLIST: 'oneThingList/UPDATE_ONETHINGLIST',
  DELETE_ONETHINGLIST: 'oneThingList/DELETE_ONETHINGLIST',
  RESET: 'oneThingList/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOneThingList>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type OneThingListState = Readonly<typeof initialState>;

// Reducer

export default (state: OneThingListState = initialState, action): OneThingListState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ONETHINGLIST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ONETHINGLIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ONETHINGLIST):
    case REQUEST(ACTION_TYPES.UPDATE_ONETHINGLIST):
    case REQUEST(ACTION_TYPES.DELETE_ONETHINGLIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ONETHINGLIST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ONETHINGLIST):
    case FAILURE(ACTION_TYPES.CREATE_ONETHINGLIST):
    case FAILURE(ACTION_TYPES.UPDATE_ONETHINGLIST):
    case FAILURE(ACTION_TYPES.DELETE_ONETHINGLIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ONETHINGLIST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ONETHINGLIST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ONETHINGLIST):
    case SUCCESS(ACTION_TYPES.UPDATE_ONETHINGLIST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ONETHINGLIST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/one-thing-lists';

// Actions

export const getEntities: ICrudGetAllAction<IOneThingList> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ONETHINGLIST_LIST,
  payload: axios.get<IOneThingList>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IOneThingList> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ONETHINGLIST,
    payload: axios.get<IOneThingList>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IOneThingList> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ONETHINGLIST,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOneThingList> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ONETHINGLIST,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOneThingList> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ONETHINGLIST,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
