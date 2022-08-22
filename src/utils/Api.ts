import axios from "axios";
import { FARM_TRAITS } from "../constants/constants";
import { CgNftType, HoskyPoolProps } from "../hoskies/HoskyPool";

export async function getHoskies(address: string): Promise<HoskyData> {
  const { data } = await axios.get<PoolPmData>(
    `https://pool.pm/wallet/${address}`
  );
  const hoskyTokens = data.tokens
    .filter(
      (token) =>
        token.policy ===
        "a5bb0e5bb275a573d744a021f9b3bff73595468e002755b447e01559"
    )
    .map<HoskyToken>((token) => {
      return {
        ...token,
        display_name: token.metadata.name,
        traits: {
          traitcount: token.metadata["-----Traits-----"].length,
          ...token.metadata["-----Traits-----"].reduce(
            (orig, trait) => ({
              ...orig,
              [Object.keys(trait)[0]]: Object.values(trait)[0].toLowerCase(),
            }),
            {}
          ),
        },
      };
    });
  return {
    ...data,
    tokens: hoskyTokens,
  };
}

export function sortHoskies(data: HoskyData, farm?: string): HoskyPoolProps[] {
  const result: TaskResult = {
    NONE: [],
  };
  data.tokens.forEach((nft) => {
    const {
      Background: background,
      'Ear Decoration': ear1,
      'Ear decoration': ear2,
      Eyes: eyes,
      Frame: frame,
      Fur: fur,
      Hat: hat,
      "Mouth Decoration": mouthDecor,
      Mouth: mouth,
      Neck: neck,
      Glasses: glasses,
    } = nft.traits;
    const found = FARM_TRAITS.filter((trait) => {
      if (
        background &&
        trait.traits.Background &&
        trait.traits.Background.indexOf(background) >= 0
      ) {
        return true;
      }
      if (ear1 && trait.traits["Ear Decoration"] && trait.traits["Ear Decoration"].indexOf(ear1) >= 0) {
        return true;
      }
      if (ear2 && trait.traits["Ear decoration"] && trait.traits["Ear decoration"].indexOf(ear2) >= 0) {
        return true;
      }
      if (eyes && trait.traits.Eyes && trait.traits.Eyes.indexOf(eyes) >= 0) {
        return true;
      }
      if (
        frame &&
        trait.traits.Frame &&
        trait.traits.Frame.indexOf(frame) >= 0
      ) {
        return true;
      }
      if (fur && trait.traits.Fur && trait.traits.Fur.indexOf(fur) >= 0) {
        return true;
      }
      if (
        glasses &&
        trait.traits.Glasses &&
        trait.traits.Glasses.indexOf(glasses) >= 0
      ) {
        return true;
      }
      if (hat && trait.traits.Hat && trait.traits.Hat.indexOf(hat) >= 0) {
        return true;
      }
      if (
        mouthDecor &&
        trait.traits["Mouth Decoration"] &&
        trait.traits["Mouth Decoration"].indexOf(mouthDecor) >= 0
      ) {
        return true;
      }
      if (
        mouth &&
        trait.traits.Mouth &&
        trait.traits.Mouth.indexOf(mouth) >= 0
      ) {
        return true;
      }
      if (neck && trait.traits.Neck && trait.traits.Neck.indexOf(neck) >= 0) {
        return true;
      }
      return false;
    });
    if (found.length > 0) {
      let checkFarm = false;
      found.forEach((f) => {
        if (farm && farm === f.name) {
          checkFarm = true;
          return;
        }
      });
      found.filter((f) => {
        if (farm && checkFarm) {
          return f.name === farm;
        }
        return true;
      }).forEach((farm) => {
        if (!result[farm.name]) {
          result[farm.name] = [];
        }
        const nftName = `${nft.display_name} (${nft.price ?? 0} ADA)`
        result[farm.name].push({
            name: nftName,
            fingerprint: nft.fingerprint,
        });
      });
    } else {
      const nftName = `${nft.display_name} (${nft.price ?? 0} ADA)`
      result["NONE"].push({
        name: nftName,
        fingerprint: nft.fingerprint,
    });
    }
  });
  return Object.keys(result).map<HoskyPoolProps>((key) => {
    return {
        name: key,
        hoskies: result[key],
    }
  });
}

export async function getListing(ids: string[]): Promise<HoskyData> {
  const result = await Promise.all(ids.map(async (id) => {
    const { data } = await axios.get<ListingResponse>(`https://server.jpgstoreapis.com/listing/${id}`);
    return data;
  }));
  // const { data } = await axios.get<ListingResponse>(`https://server.jpgstoreapis.com/listing/${ids}`);
  const tokens: Nft[] = result.map((res) => res.tokens);
  const hoskyTokens = tokens
    .filter(
      (token) =>
        token.policy_id ===
        "a5bb0e5bb275a573d744a021f9b3bff73595468e002755b447e01559"
    )
    .map<HoskyToken>((token) => {
      return {
        display_name: token.display_name,
        fingerprint: token.fingerprint,
        name: token.display_name,
        metadata: token.onchain_metadata,
        policy: token.policy_id,
        price: token.listing_lovelace / 1000000,
        traits: {
          traitcount: token.onchain_metadata["-----traits-----"].length,
          ...token.onchain_metadata["-----traits-----"].reduce(
            (orig, trait) => ({
              ...orig,
              [Object.keys(trait)[0]]: Object.values(trait)[0].toLowerCase(),
            }),
            {}
          ),
        },
      };
    });
  return {
    tokens: hoskyTokens,
  };
}

export async function getListings(size: number): Promise<HoskyData> {
  const policyIds = 'a5bb0e5bb275a573d744a021f9b3bff73595468e002755b447e01559';
  const url = `https://server.jpgstoreapis.com/search/tokens?policyIds=["${policyIds}"]&saleType=default&sortBy=price-low-to-high&traits={}&nameQuery=&verified=default&pagination={}&size=${size}`
  const { data } = await axios.get<JpgListings>(url);
  const { tokens } = data;
  const hoskyTokens = tokens
    .filter(
      (token) =>
        token.policy_id === policyIds
    )
    .map<HoskyToken>((token) => {
      return {
        display_name: token.display_name,
        fingerprint: token.fingerprint,
        name: token.display_name,
        metadata: token.onchain_metadata,
        policy: token.policy_id,
        price: token.listing_lovelace / 1000000,
        traits: {
          traitcount: token.traits.traitcount,
          ...(Object.keys(token.traits)
            .filter((trait) => trait !== 'traitCount')
            .reduce((orig, trait) => ({
              ...orig,
                [trait.split(" / ")[1]]: token.traits[trait as keyof NftTraits],
            }), {})),
        },
      };
    });
  return {
    tokens: hoskyTokens,
  };
}

export type ListingResponse = {
  tokens: Nft;
}

export type NftTraits = {
  traitcount: number;
    '-----traits----- / Background'?: string;
    '-----traits----- / Fur'?: string;
    '-----traits----- / Ear Decoration'?: string;
    '-----traits----- / Ear decoration'?: string;
    '-----traits----- / Mouth Decoration'?: string;
    '-----traits----- / Hat'?: string;
    '-----traits----- / Neck'?: string;
    '-----traits----- / Eyes'?: string;
    '-----traits----- / Frame'?: string;
    '-----traits----- / Glasses'?: string;
    '-----traits----- / Mouth'?: string;
}

export type Nft = {
  asset_id: string;
  policy_id: string;
  display_name: string;
  onchain_metadata: HoskyMetadata;
  fingerprint: string;
  traits: NftTraits,
  listing_lovelace: number;
}

export type PoolPmData = {
  addr: string;
  tokens: Token[];
};

export type Token = {
  fingerprint: string;
  policy: string;
  name: string;
  metadata: HoskyMetadata;
};

export interface HoskyData {
  addr?: string;
  tokens: HoskyToken[];
}

export interface HoskyToken extends Token {
  display_name: string;
  traits: {
    traitcount: number;
    Background?: string;
    Fur?: string;
    'Ear Decoration'?: string;
    'Ear decoration'?: string;
    "Mouth Decoration"?: string;
    Hat?: string;
    Neck?: string;
    Eyes?: string;
    Frame?: string;
    Glasses?: string;
    Mouth?: string;
  };
  price?: number;
}

export type BackgroundTrait = { Background: string };
export type FurTrait = { Fur: string };
export type EarTrait1 = { 'Ear Decoration': string; };
export type EarTrait2 = { 'Ear decoration': string; };
export type MouthDecorTrait = { "Mouth Decoration": string };
export type HatTrait = { Hat: string };
export type NeckTrait = { Neck: string };
export type EyesTrait = { Eyes: string };
export type FrameTrait = { Frame: string };
export type GlassesTrait = { Glasses: string };
export type MouthTrait = { Mouth: string };

export type Trait =
  | BackgroundTrait
  | FurTrait
  | EarTrait1
  | EarTrait2
  | MouthDecorTrait
  | HatTrait
  | NeckTrait
  | EyesTrait
  | FrameTrait
  | MouthTrait;

export type HoskyMetadata = {
  "-----Traits-----": Trait[];
  "-----traits-----": Trait[];
  image: string;
  name: string;
};

export type TaskResult = {
  [farm: string]: CgNftType[];
};

export type JpgPagination = {
  lastHitSort: number[];
  pointInTimeExpiryMs: number;
  pointInTimeId: string;
  total: number;
}

export type JpgListings = {
  pagination: JpgPagination;
  tokens: Nft[];
}
