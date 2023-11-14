import {takeEvery, call, put} from 'redux-saga/effects';
import * as actionTypes from './actions';
import ApiResult from '../ApiResult';
import { fetchAllSystemFields } from '../apiGateway';
import * as modelConversion from '../ContactForm/model/modelConversion'
import { orderBy } from 'lodash';
import { FieldModel } from '../ContactForm/ServerModel/FieldModel';
import { Field } from '../ContactForm/model/Field';

const fetchSystemFieldsApi = async () : Promise<ApiResult> => {
    return await fetchAllSystemFields();    
}

function*  fetchSystemFieldsWorker(){   
    try {
        let defaultFields:Array<Field>=[]
        let getConvertedField:Field
        let apiResult:ApiResult = yield call(fetchSystemFieldsApi);
        if (apiResult.isSucceed) {
            let records=apiResult.data
                records.map((sysField:FieldModel,i:number)=>{
                     
                        sysField.type.toLowerCase()    
                         getConvertedField=modelConversion.ServerFieldModelToviewModelFields(sysField)
                         defaultFields.push(getConvertedField)
                })
          
            yield put(actionTypes.AddSystemFieldsActionCreater(defaultFields)); 
        } else{
            yield put(actionTypes.SystemFieldsRequestFailedActionCreater(apiResult.message || 'some error occured')); 
        }    
    } catch (error) {
        console.log(error);
        yield put(actionTypes.SystemFieldsRequestFailedActionCreater(error)); 
    } 
        
}

export function* SystemFieldsSagaWatcher(){    
    yield takeEvery(actionTypes.SystemFieldsActionCreater.FETCH_ALL_SYSTEM_FIELDS,fetchSystemFieldsWorker);
}