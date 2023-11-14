import {all} from 'redux-saga/effects';
import { contactSagaWatcher } from '../cms/ContactRegistration/saga';
import { reportBuilderSagaWatcher } from '../cms/ReportBuilder/saga';
import { FormBuilderSagaWatcher } from '../cms/FormBuilder1/saga';
import { SystemFieldsSagaWatcher } from '../cms/FormBuilder/SystemFields/saga';

export default function* rootSaga(){
    yield all([contactSagaWatcher(),reportBuilderSagaWatcher(),FormBuilderSagaWatcher(),SystemFieldsSagaWatcher()]);
}