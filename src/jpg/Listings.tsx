import { useEffect, useReducer } from "react";
import { getListing, sortHoskies } from "../utils/Api";
import { HoskyPoolProps } from "../hoskies/HoskyPool";
import Pools from "../hoskies/Pools";
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
      case 'CALL_LISTINGS_API_START': {
        return {
          ...state,
          loading: true,
        };
      }
      case 'CALL_LISTINGS_API_SUCCESS': {
        return {
          ...state,
          loading: false,
          data: action.data,
        }
      }
      case 'CALL_LISTINGS_API_ERROR': {
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
  
function Listings() {
    const [state, dispatch] = useReducer(hoskyReducer, initialState);
    const { data } = state;
    const { listingId } = useParams();
    useEffect(() => {
        if (listingId) {
            getListing(listingId.split(',')).then((res) => {
                const result = sortHoskies(res);
                dispatch({ type: 'CALL_LISTINGS_API_SUCCESS', data: result });
            }).catch((err: Error) => {
                console.log(err);
                dispatch({ type: 'CALL_LISTINGS_API_ERROR', data: [], error: err.message });
            });
        }
    }, [listingId]);
    return (
        <Pools hoskies={data} />
    )
}
export default Listings;
