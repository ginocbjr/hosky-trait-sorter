import { useEffect, useReducer } from "react";
import { getHoskies, sortHoskies } from "../utils/Api";
import { HoskyPoolProps } from "./HoskyPool";
import Pools from "./Pools";
import { useParams } from 'react-router-dom';

export type HoskyState = {
    loading: boolean; 
    data: HoskyPoolProps[];
    error: string;
  }
  
  export type ActionType = {
    type: string;
    data: HoskyPoolProps[],
    error?: string;
  }
  
  const hoskyReducer = (state: HoskyState, action: ActionType): HoskyState => {
    switch(action.type) {
      case 'CALL_API_START': {
        return {
          ...state,
          loading: true,
        };
      }
      case 'CALL_API_SUCCESS': {
        return {
          ...state,
          loading: false,
          data: action.data,
        }
      }
      case 'CALL_API_ERROR': {
        return {
          ...state,
          loading: false,
          error: action.error!,
        }
      }
      default: return initialState;
    }
  }
  
  const initialState: HoskyState = {
    loading: false,
    data: [],
    error: '',
  }
  
function Hoskies() {
    const [state, dispatch] = useReducer(hoskyReducer, initialState);
    const { data } = state;
    const { address } = useParams();
    useEffect(() => {
        if (address) {
            getHoskies(address).then((res) => {
                const result = sortHoskies(res);
                dispatch({ type: 'CALL_API_SUCCESS', data: result });
            }).catch((err: Error) => {
                dispatch({ type: 'CALL_API_ERROR', data: [], error: err.message });
            });
        }
    }, []);
    return (
        <Pools hoskies={data} />
    )
}
export default Hoskies;
