import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IThingsList, defaultValue } from 'app/shared/model/things-list.model';

export const ACTION_TYPES = {
  FETCH_THINGSLIST_LIST: 'thingsList/FETCH_THINGSLIST_LIST',
  FETCH_THINGSLIST: 'thingsList/FETCH_THINGSLIST',
  CREATE_THINGSLIST: 'thingsList/CREATE_THINGSLIST',
  UPDATE_THINGSLIST: 'thingsList/UPDATE_THINGSLIST',
  DELETE_THINGSLIST: 'thingsList/DELETE_THINGSLIST',
  RESET: 'thingsList/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IThingsList>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ThingsListState = Readonly<typeof initialState>;

// Reducer

export default (state: ThingsListState = initialState, action): ThingsListState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_THINGSLIST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_THINGSLIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_THINGSLIST):
    case REQUEST(ACTION_TYPES.UPDATE_THINGSLIST):
    case REQUEST(ACTION_TYPES.DELETE_THINGSLIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_THINGSLIST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_THINGSLIST):
    case FAILURE(ACTION_TYPES.CREATE_THINGSLIST):
    case FAILURE(ACTION_TYPES.UPDATE_THINGSLIST):
    case FAILURE(ACTION_TYPES.DELETE_THINGSLIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_THINGSLIST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_THINGSLIST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_THINGSLIST):
    case SUCCESS(ACTION_TYPES.UPDATE_THINGSLIST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_THINGSLIST):
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

const apiUrl = 'api/things-lists';

// Actions

export const getEntities: ICrudGetAllAction<IThingsList> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_THINGSLIST_LIST,
  payload: axios.get<IThingsList>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IThingsList> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_THINGSLIST,
    payload: axios.get<IThingsList>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IThingsList> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_THINGSLIST,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IThingsList> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_THINGSLIST,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IThingsList> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_THINGSLIST,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
