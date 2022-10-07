import React, { useEffect, useReducer } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import {
  capitalizeFirstLetter,
  getHoskyDetails,
  getJpgTransactions,
  getListings,
  NftTraits,
} from '../../utils/Api';
import PriceTable, { PriceData } from './PriceTable';

export type PriceSweepState = {
  hoskyNum?: string;
  hoskyNumTemp?: string;
  loading: boolean;
  data: PriceData[];
  error: string;
};

export type ActionType = {
  type: string;
  data: PriceData[];
  error?: string;
  hoskyNum?: string;
  hoskyNumTemp?: string;
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
    case 'SET_SWEEPER_HOSKY_NUM_TEMP': {
      return {
        ...state,
        loading: false,
        hoskyNumTemp: action.hoskyNumTemp,
      };
    }
    case 'SET_SWEEPER_HOSKY_NUM': {
      return {
        ...state,
        loading: false,
        hoskyNum: action.hoskyNum,
      };
    }
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
  const { data, loading, hoskyNum, hoskyNumTemp } = state;
  useEffect(() => {
    if (hoskyNum) {
      dispatch({ type: 'CALL_SWEEPER_API_START', data: [] });
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
  return (
    <Container>
      <Form>
        <Row className="align-items-center">
          <Col sm={3} className="my-1">
            <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
              Hosky Number
            </Form.Label>
            <Form.Control
              id="inlineFormInputName"
              placeholder="Hosky Number"
              type="number"
              onChange={(e) => {
                dispatch({
                  type: 'SET_SWEEPER_HOSKY_NUM_TEMP',
                  hoskyNumTemp: e.target.value,
                  data: [],
                });
              }}
            />
          </Col>
          <Col xs="auto" className="my-1">
            <Button
              type="submit"
              onClick={() => {
                dispatch({
                  type: 'SET_SWEEPER_HOSKY_NUM',
                  data: [],
                  hoskyNum: hoskyNumTemp,
                });
              }}
              disabled={loading || !hoskyNumTemp}>
              Sweep It!
            </Button>
          </Col>
        </Row>
      </Form>
      {loading && <Spinner animation="border" />}
      {!loading && <PriceTable data={data} />}
    </Container>
  );
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
