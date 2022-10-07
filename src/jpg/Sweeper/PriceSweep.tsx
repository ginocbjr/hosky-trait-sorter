import React, { useEffect, useReducer } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {
  capitalizeFirstLetter,
  getHoskyDetails,
  getJpgTransactions,
  getListings,
  NftTraits,
} from '../../utils/Api';
import PriceTable, { PriceData } from './PriceTable';

export type PriceSweepState = {
  loading: boolean;
  data: PriceData[];
  error: string;
};

export type ActionType = {
  type: string;
  data: PriceData[];
  error?: string;
};

const initialState: PriceSweepState = {
  loading: false,
  data: [],
  error: '',
};

const priceSweepReducer = (
  state: PriceSweepState,
  action: ActionType,
): PriceSweepState => {
  switch (action.type) {
    case 'CALL_SWEEPER_API_START': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'CALL_SWEEPER_API_SUCCESS': {
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    }
    case 'CALL_SWEEPER_API_ERROR': {
      return {
        ...state,
        loading: false,
        error: action.error!,
      };
    }
    default:
      return initialState;
  }
};

const PriceSweep = () => {
  const [state, dispatch] = useReducer(priceSweepReducer, initialState);
  const { data, loading } = state;
  const { hoskyNum } = useParams();
  useEffect(() => {
    if (hoskyNum) {
      dispatch({ type: 'CALL_SWEEPER_API_START', data });
      getPriceData(parseInt(hoskyNum))
        .then((data) => {
          dispatch({ type: 'CALL_SWEEPER_API_SUCCESS', data });
        })
        .catch((err) => {
          dispatch({
            type: 'CALL_SWEEPER_API_ERROR',
            data: [],
            error: err.message,
          });
        });
    }
  }, [hoskyNum]);
  if (loading) {
    return <Spinner animation="border" />;
  }
  return <PriceTable data={data} />;
};

const getPriceData = async (num: number): Promise<PriceData[]> => {
  const nft = await getHoskyDetails(num);
  if (nft) {
    const { traits } = nft;
    const data = await Promise.all(
      Object.keys(traits)
        .filter((trait) => trait.startsWith('-----traits-----'))
        .map<Promise<PriceData>>(async (trait) => {
          const actualTrait = trait.split(' / ')[1];
          const name = traits[trait as keyof NftTraits] as string;
          const traitsParam = capitalizeFirstLetter(actualTrait);
          const listings = await getListings(2, {
            [traitsParam]: [name.toLowerCase()],
          });
          const jpgTrxns = await getJpgTransactions({
            trait: traitsParam,
            name,
          }).catch((err) => {
            return null;
          });
          const activities: string[] = [];
          if (jpgTrxns && jpgTrxns.tot > 0) {
            jpgTrxns.transactions.forEach((txn) => {
              activities.push(`${txn.amount_lovelace / 1000000}`);
            });
          }
          return {
            name: name,
            trait: actualTrait,
            floorPrice: listings.tokens[0]?.price || 0,
            activities,
          };
        }),
    );
    return data.sort((d1, d2) => (d2.floorPrice || 0) - (d1.floorPrice || 0));
  }
  return [];
};

export default PriceSweep;
