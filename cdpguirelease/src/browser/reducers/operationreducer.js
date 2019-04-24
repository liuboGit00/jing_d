/**
 * Created by tanglinhai on 2016/9/13.
 */
import {
    ADD_OPERATION,
    DEL_OPERATION,
    FETCH_OPERATIONS
} from '../actions/operationactions'


function updateOperationState(state={isFetching:false,didInvalidate:true, items: [], pagination:{current:1,total:0, pageSize: 5}},action) {
    state.items = localStorage.operations ? JSON.parse(localStorage.operations) : [];
    state.pagination.total = state.items.length;

    switch (action.type) {
        case ADD_OPERATION:
            const operation = action.operation,now = new Date();
            operation.id = now.getTime();
            let month = (now.getMonth()+1).toString();
            let day = now.getDate().toString();
            let hour = now.getHours().toString();
            let minute = now.getMinutes().toString();
            let second = now.getSeconds().toString();
            month = month.length == 1 ? '0'+month : month;
            day = day.length == 1 ? '0'+day : day;
            hour = hour.length == 1 ? '0'+hour : hour;
            minute = minute.length == 1 ? '0'+minute : minute;
            second = second.length == 1 ? '0'+second : second;
            operation.date = now.getFullYear()+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
            if(state.items.length == 70){
                state.items.pop();
            }
            state.items.unshift(operation);
            state.pagination.total++;
            localStorage.operations = JSON.stringify(state.items);
            return Object.assign({}, state);
        case DEL_OPERATION:
            const len = state.items.length;
            for(let i=0;i<len;i++){
                if(state.items[i].id == action.id){
                    state.items.splice(i, 1);
                    localStorage.operations = JSON.stringify(state.items);
                    state.pagination.total--;
                    break;
                }
            }
            return Object.assign({}, state);
        case FETCH_OPERATIONS:
            state.pagination.current = action.current;
            state.pagination.pageSize = action.pageSize;
            return Object.assign({}, state);
        default:
            return state
    }
}

function operationState(state={isFetching:false,didInvalidate:true, items: [], pagination:{current:1,total:0, pageSize: 5}},action) {
    return updateOperationState(state,action)
}

export default operationState
