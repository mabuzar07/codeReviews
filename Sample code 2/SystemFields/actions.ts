import { action } from "typesafe-actions";
import { Field } from "../ContactForm/model/Field";

export enum SystemFieldsActionCreater{
  FETCH_ALL_SYSTEM_FIELDS = "@@SystemFields/FETCH_ALL_SYSTEM_FIELDS",

  ADD_SYSTEM_FIELDS = "@@SystemFields/ADD_SYSTEM_FIELDS",
  SYSTEM_FIELDS_REQUEST_FAILED  = "@@SystemFields/SYSTEM_FIELDS_REQUEST_FAILED",
}

export const FetchAllSystemFieldsActionCreater = () =>
action(SystemFieldsActionCreater.FETCH_ALL_SYSTEM_FIELDS);

export const AddSystemFieldsActionCreater = (payload:Array<Field>) =>
action(SystemFieldsActionCreater.ADD_SYSTEM_FIELDS,payload);
export const SystemFieldsRequestFailedActionCreater  = (payload:string) =>
action(SystemFieldsActionCreater.SYSTEM_FIELDS_REQUEST_FAILED,payload);
