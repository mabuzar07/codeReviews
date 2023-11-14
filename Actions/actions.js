export const getShippingZone = "GET_SHIPPING_ZONE_MERCHANT";
export const AppendShippingZone = 'APPEND_SHIPPING_ZONE_MERCHANT';
export const deleteShippingZone = 'DELETE_SHIPPING_ZONE';
export const getShippingZoneById = "GET_SHIPPING_ZONE_BY_ID_MERCHANT";

export function getShippingZoneAction(list, total) {
    return {
        type: getShippingZone,
        payload: { list, total }
    }
}
export function AppendShippingZoneAction(data) {
    return {
        type: AppendShippingZone,
        payload: { list: data }
    }
}
export function deleteShippingZoneAction(id) {
    return {
        type: deleteShippingZone,
        payload: { id }
    }
}
export function getShippingZoneByIdAction(item) {
    return {
        type: getShippingZoneById,
        payload: { item }
    }
}