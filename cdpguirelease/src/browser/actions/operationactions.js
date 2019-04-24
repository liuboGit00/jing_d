/**
 * Created by tanglinhai on 2016/9/13.
 */
//import 'babel-polyfill'

export const ADD_OPERATION = 'ADD_OPERATION'
export const DEL_OPERATION = 'DEL_OPERATION'
export const FETCH_OPERATIONS = 'FETCH_OPERATIONS'

/* add */
export function add_operation(operation) {
    return {
        type:ADD_OPERATION,
        operation
    }
}
/* del */
export function del_operation(id) {
    return {
        type:DEL_OPERATION,
        id
    }
}

/* fetch */
export function fetch_operations(conditions={}, pageSize, current) {
    return {
        type:FETCH_OPERATIONS,
        conditions,
        pageSize,
        current
    }
}
