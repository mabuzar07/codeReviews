import { resolve } from "path";
import ApiResult from "../ContactRegistration/ApiResult";
import { UpdateContactFormSchemaCommand } from "./ContactForm/ServerModel/UpdateContactFormSchemaCommand";
import { ReportModel } from "../ReportBuilder/ContactReport/model/ReportModel";
import { ContactReportViewModel } from "../ReportBuilder/ContactReport/serverModel/ContactReportViewModel";
import {apiConfig} from '../../shared/ApiConfig'
import {SetSecurityHeaderValue} from '../../shared/ApiRequest'
// 
export function saveContactFormSchema(contact: UpdateContactFormSchemaCommand): Promise<ApiResult> {
   
  let promise: Promise<any> = new Promise<ApiResult>((reslove, reject) => {

    const options = {
      method: 'PUT',
      body: JSON.stringify(contact),
      headers: SetSecurityHeaderValue({
        'Content-Type': 'application/json',
        "Accept": "application/json"
      })
    };
    fetch(apiConfig.serverUrl + apiConfig.formBuilderEndUrl, options)
      .then(res => res.json().then(data => ({ status: res.status, body: data })))
      .then(((result: any) => {
        if (result.status === 200) {
          reslove({ isSucceed: true, data: result.body.data, message:"" ,isErrorOccured: false})
        }
        else if (result.status === 400) {
          reslove({ isSucceed: false, data: result.body.data, message: result.body.message,isErrorOccured: false })
        }
        else if (result.status === 500) {
          reslove({ isSucceed: false, message: result.body.message,isErrorOccured: false })
        }else{
          reject({isSucceed: false, message: result.body.message,isErrorOccured: false })
        }
      }))
      
  });
  return promise;
}




export function fetchContactFormSchema(): Promise<ApiResult> {
  let promise: Promise<ApiResult> = new Promise<ApiResult>((reslove, reject) => {
      
    fetch(apiConfig.serverUrl + apiConfig.formBuilderEndUrl, {
      method: "GET",
      headers: SetSecurityHeaderValue({
        "Accept": "application/json"
      }),
    })
      .then(response => response.json().then(data => ({ status: response.status, body: data })))
      
      .then(response => {
        if (response.status === 200) {
          reslove({isSucceed: true, data: response.body,isErrorOccured: false })
        } else if(response.status === 500){
          reslove({ isSucceed: false, message: response.body.message,isErrorOccured: false })
        }
      })
      .catch(error => { console.log('request failed', error); });
  });

  return promise;
}
export function fetchAllSystemFields(): Promise<ApiResult> {
  let promise: Promise<ApiResult> = new Promise<ApiResult>((reslove, reject) => {
    
    fetch(apiConfig.serverUrl+apiConfig.formBuilderSystemFieldEndUrl, {
      method: "GET",
      headers: SetSecurityHeaderValue({
        "Accept": "application/json"
      }),
    })
      .then(response => response.json().then(data => ({ status: response.status, body: data })))
      .then(response => {
        //
        if (response.status === 200) {
          reslove({isSucceed: true, data: response.body,isErrorOccured: false })
        } else if(response.status === 500){
          reslove({ isSucceed: false, message: response.body.message,isErrorOccured: false })
        }
      })
      .catch(error => { console.log('request failed', error); });
  });

  return promise;
}
