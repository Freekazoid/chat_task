
import { createStore } from 'redux';


export function saveMSG(state = [], action=false) {
  switch (action.type) {
    case 'ADD':
      if(action.text){
        state = state.concat([action.text])
      }
      break;
    case 'ADD_msg':
      if(action.text){
        if((typeof action.text === 'object' || typeof action.text === 'array') && state.msg)
          state.msg = state.msg.concat([action.text])
        else if(typeof action.text === 'object' && !state.msg){
          state.msg = []
          state.msg = state.msg.concat([action.text])
        }
      }
      break;
    case 'ADD_UP_msg':
      if(action.text){
        if((typeof action.text === 'object' || typeof action.text === 'array') && state.msg)
          state.msg = action.text.concat(state.msg)
      }
      break;
    case 'REMOVE':
      state.splice(action.id, 1)
      break;
  }
  // console.log(action,  state )
  return state
};

export const store = createStore(saveMSG, []);

