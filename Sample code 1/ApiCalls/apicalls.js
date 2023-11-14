import * as ApiActions from '../../../ApiCallStatus/Actions/action';
import * as Actions from '../Actions/actions'
import { Constant } from '../../../../Constants/constant';

export function getShippingZone(token, userId, offset) {
    return dispatch => {
        if (offset !== 0) {
            dispatch(ApiActions.ApiRequestedAction({ apiCallFor: "appendShippingZone" }));
        } else {
            dispatch(ApiActions.ApiRequestedAction({ apiCallFor: "getShippingZone" }));
            dispatch(Actions.getShippingZoneAction([], 0))
        }
        fetch(Constant.apiURl + '/shippingZone/list/' + userId + "/" + offset + "/20", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-access-token": token
            }
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            if (myJson.code === 200) {
                if (offset !== 0) {
                    dispatch(Actions.AppendShippingZoneAction(myJson.data))
                    dispatch(ApiActions.ApiFulfilledAction({ apiCallFor: "appendShippingZone", message: "" }))
                } else {
                    dispatch(Actions.getShippingZoneAction(myJson.data, myJson.total))
                    dispatch(ApiActions.ApiFulfilledAction({ apiCallFor: "getShippingZone", message: "" }))
                }

            } else {
                if (offset !== 0) {
                    dispatch(ApiActions.ApiRejectedAction({ apiCallFor: "appendShippingZone", message: myJson.message }))
                } else {
                    dispatch(ApiActions.ApiRejectedAction({ apiCallFor: "getShippingZone", message: myJson.message }))
                }
            }
        }).catch((error) => {
            if (offset !== 0) {
                dispatch(ApiActions.ApiRejectedAction({ apiCallFor: "appendShippingZone", message: error }))
            } else {
                dispatch(ApiActions.ApiRejectedAction({ apiCallFor: "getShippingZone", message: error }))
            }
        });

    }
}

export function addShippingZone(token, data) {
    return dispatch => {
        dispatch(ApiActions.ApiRequestedAction({ apiCallFor: "addShippingZone" }));
        fetch(Constant.apiURl + '/shippingZone', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-access-token": token
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            if (myJson.code === 200) {
                dispatch(ApiActions.ApiFulfilledAction({ apiCallFor: "addShippingZone", message: "" }))
            } else {
                dispatch(ApiActions.ApiRejectedAction({ apiCallFor: "addShippingZone", message: myJson.message }))
            }
        }).catch((error) => {
            dispatch(ApiActions.ApiRejectedAction({ apiCallFor: "addShippingZone", message: error }))
        });
    }
}

export function getCountryStatesCount(token, data) {
    return dispatch => {
        let arr = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            arr.push(data[index].id)
        }
        dispatch(ApiActions.ApiRequestedAction({ apiCallFor: "getCountryStatesCount" }));
        fetch(Constant.apiURl + '/state/count', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-access-token": token
            },
            body: JSON.stringify({
                "countryId": arr
            })
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            if (myJson.code === 200) {
                for (let i = 0; i < myJson.data.length; i++) {
                    let index = data.findIndex(x => x.id === myJson.data[i].countryId);
                    if (index !== -1) {
                        data[index].state = myJson.data[i].state
                        data[index].totalState = myJson.data[i].totalState
                    }
                }
                dispatch(ApiActions.ApiFulfilledAction({ apiCallFor: "getCountryStatesCount", message: data }))
            } else {
                dispatch(ApiActions.ApiRejectedAction({ apiCallFor: "getCountryStatesCount", message: myJson.message }))
            }
        }).catch((error) => {
            dispatch(ApiActions.ApiRejectedAction({ apiCallFor: "getCountryStatesCount", message: error }))
        });
    }
}

export function deleteShippingZone(token, id) {
    return dispatch => {
        dispatch(ApiActions.ApiRequestedAction({ apiCallFor: "deleteShippingZone" }));
        fetch(Constant.apiURl + '/shippingZone/remove/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-access-token": token
            }
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            if (myJson.code === 200) {
                dispatch(Actions.deleteShippingZoneAction(id))
                dispatch(ApiActions.ApiFulfilledAction({ apiCallFor: "deleteShippingZone", message: "" }))
            } else {
                dispatch(ApiActions.ApiRejectedAction({ apiCallFor: "deleteShippingZone", message: myJson.message }))
            }
        }).catch((error) => {
            dispatch(ApiActions.ApiRejectedAction({ apiCallFor: "deleteShippingZone", message: error }))
        });
    }
}

export function getShippingZoneById(token, id) {
    return dispatch => {
        dispatch(ApiActions.ApiRequestedAction({ apiCallFor: "getShippingZoneById" }))
        fetch(Constant.apiURl + '/shippingZone/getById/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-access-token": token
            }
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            if (myJson.code === 200) {
                dispatch(Actions.getShippingZoneByIdAction(myJson.data))
                dispatch(ApiActions.ApiFulfilledAction({ apiCallFor: "getShippingZoneById", message: "" }))
            } else {
                dispatch(ApiActions.ApiRejectedAction({ apiCallFor: "getShippingZoneById", message: myJson.message }))
            }
        }).catch((error) => {
            dispatch(ApiActions.ApiRejectedAction({ apiCallFor: "getShippingZoneById", message: error }))
        });

    }
}

export function editShippingZone(token, data) {
    return dispatch => {
        dispatch(ApiActions.ApiRequestedAction({ apiCallFor: "editShippingZone" }));
        fetch(Constant.apiURl + '/shippingZone/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "x-access-token": token
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            if (myJson.code === 200) {
                dispatch(ApiActions.ApiFulfilledAction({ apiCallFor: "editShippingZone", message: "" }))
            } else {
                dispatch(ApiActions.ApiRejectedAction({ apiCallFor: "editShippingZone", message: myJson.message }))
            }
        }).catch((error) => {
            dispatch(ApiActions.ApiRejectedAction({ apiCallFor: "editShippingZone", message: error }))
        });
    }
}