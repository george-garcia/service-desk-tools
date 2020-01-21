import _ from 'lodash';

export default (state = {}, action) => {
    switch(action.type){
        case 'FETCH_ALL_TEMPLATES': { return { ...state, ..._.mapKeys(action.payload, 'name') }}
        case 'IMPORT_TEMPLATES': { return { ...state, ..._.mapKeys(action.payload, 'id') }}
        case 'FETCH_TEMPLATE': { return { ...state, [action.payload.data.id]: action.payload.data }}
        case 'CREATE_TEMPLATE': { return { ...state, [action.payload.data.name]: action.payload.data }}
        default: return state;
    }
}

/*
export default (state = {}, action) => {
    switch(action.type){
        case 'FETCH_ALL_TOURS': { return { ...state, ..._.mapKeys(action.payload.data.data, '_id') }}
        case 'FETCH_TOUR': { return { ...state, [action.payload.data.data._id]: action.payload.data.data }}
        case 'CREATE_TOUR': { return { ...state, [action.payload.data.data._id]: action.payload.data }}
        case 'EDIT_TOUR': {return { ...state, [action.payload.data.data._id]: action.payload.data }}
        case 'DELETE_DEFECT': return _.omit(state, action.payload.data);
        default: return state;
    }
}
 */