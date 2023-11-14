import StoreState from './../../../../Constants/initialState';
import * as Actions from './../Actions/actions';
import cloneDeep from 'lodash/cloneDeep';

const shippingMerchantReducer = (state = StoreState.shippingMerchant, action) => {
  switch (action.type) {
    case Actions.getShippingZone:
      var s = Object.assign(state);
      s.list = action.payload.list;
      s.total = action.payload.total;
      return s;

    case Actions.AppendShippingZone:
      var s = cloneDeep(state);
      var arr = s.list.slice();
      s.list = arr.concat(action.payload.list);
      return s;

    case Actions.deleteShippingZone:
      var s = cloneDeep(state);
      var arr = s.list.slice();
      let index = arr.findIndex(x => x._id === action.payload.id);
      if (index > -1) {
        arr.splice(index, 1)
      }
      s.list = arr;
      s.total = s.total - 1;
      return s;

    case Actions.getShippingZoneById:
      var s = Object.assign(state);
      s.editItem = action.payload.item;
      return s;

    default:
      return state
  }
}

export default shippingMerchantReducer;