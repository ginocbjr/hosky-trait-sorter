export const NFT_TRAITS = [
    "Fur", "Background", "Ear",
    "Mouth Decoration", "Hat", "Neck",
    "Eyes", "Frame", "Mouth"
];

export const FARM_TRAITS: FarmData[] = [
    {
        name: "A3C",
        traits: {
            Fur: ["pink"],
            Background: ["late night"],
            "Mouth Decoration": ["big moustache"],
            Hat: ["crown"],
            Neck: ["blue collar"],
            Eyes: ["visor dead"],
            Frame: ["damien hirst"],
        }
    },
    {
        name: "ABC",
        traits: {
            Fur: ["baby blue"],
            Background: ["poo"],
            "Mouth Decoration": ["tongue out"],
            Hat: ["police", "holographic hat"],
            Eyes: ["cyber hosky"],
            Frame: ["check mate"],
            Mouth: ["hmmm"],
        }
    },
    {
        name: "ALLI",
        traits: {
            Fur: ["white"],
            Background: ["red", "fireworks"],
            "Mouth Decoration": ["sick"],
            Hat: ["top hat red", "gold ribbon hat"],
            Eyes: ["visor heart"],
            Frame: ["fish bowl"],
            Mouth: ["sad"]
        }  
    },
    {
        name: "CHEF",
        traits: {
            Fur: ["bear"],
            Background: ["blue"],
            "Mouth Decoration": ["pizza"],
            Hat: ["miner", "black lny hat "],
            Eyes: ["gold glasses"],
            Frame: ["lny gold"],
        }
    },
    {
        name: "FARM",
        traits: {
            Fur: ["gold"],
            Background: ["khaki", "fireplace"],
            "Mouth Decoration": ["flaming hot"],
            Hat: ["robin hood"],
            Neck: ["blue collar gold spikes"],
            Eyes: ["visor beam"],
            Glasses: ["visor beam"],
            Frame: ["poo"],
        }
    },
    {
        name: "FIKA",
        traits: {
            Fur: ["tiger fur", "gold tiger", "imagine dragons", "panda"],
            Background: ["yello"],
            Ear: ["stud right"],
            Hat: ["trucker"],
            Eyes: ["lennon"],
            Frame: ["astronaut"],
            Mouth: ["sad-ish"]
        }
    },
    {
        name: "HERO",
        traits: {
            Fur: ["blue dog"],
            Background: ["grey"],
            "Mouth Decoration": ["goatee"],
            Hat: ["hero", "red woody hat", "blue wooly hat", "hero2"],
            Neck: ["red collar gold spikes", "bowtie"],
            Eyes: ["visor meh"],
            Frame: ["wood"]
        }
    },
    {
        name: "ITZA",
        traits: {
            Fur: ["senor hosqui"],
            Background: ["mint"],
            Ear: ["double stud left"],
            Hat: ["viking", "elf hat"],
            Eyes: ["laser visor"],
            Frame: ["silver"]
        }
    },
    {
        name: "JACK",
        traits: {
            Fur: ["oscar"],
            Background: ["peach"],
            Ear: ["right ring"],
            Hat: ["mcdonalds"],
            Eyes: ["blue laser"],
            Frame: ["playing card"]
        }
    },
    {
        name: "PRIDE",
        traits: {
            Fur: ["doberman"],
            Background: ["cyan"],
            "Mouth Decoration": ["rainbow vomit"],
            Hat: ["black lny hat"],
            Eyes: ["back to the future"],
            Frame: ["wernis"],
            Mouth: ["ooooo"],
            Neck: ["neckerchief"],
        }
    },
    {
        name: "PSB",
        traits: {
            Fur: ["hoskasaur"],
            Background: ["prison"],
            Ear: ["stud left"],
            Hat: ["red lny hat"],
            Eyes: ["3d gloss"],
            Frame: ["lny wave"],
            Mouth: ["happy"]
        }
    },
    {
        name: "PSYA",
        traits: {
            Fur: ["yellow dog"],
            Background: ["red"],
            "Mouth Decoration": ["crumpet"],
            Hat: ["spin top", "santa hat", "mcdonalds manager"],
            Eyes: ["upside down"],
            Frame: ["frosty"],
        }
    },
    {
        name: "QCPOL",
        traits: {
            Fur: ["hoskrogu"],
            Background: ["sunset"],
            Ear: ["double stud right"],
            "Mouth Decoration": ["cigar"],
            Hat: ["captain"],
            Neck: ["red collar", "chain"],
            Eyes: ["visor"],
            Frame: ["pernis"],
        }
    },
    {
        name: "SALT",
        traits: {
            Fur: ["hosky droid"],
            Background: ["purple"],
            Ear: ["double left rings"],
            Hat: ["top hat blue", "tiger hat", "micky"],
            Eyes: ["3d glasses"],
            Frame: ["candy came"]
        }
    },
    {
        name: "SEA",
        traits: {
            Fur: ["holographic"],
            Background: ["navy"],
            "Mouth Decoration": ["snorkle"],
            Hat: ["silver crown", "reindeer"],
            Neck: ["eye patch right"],
            Eyes: ["red laser"],
            Frame: ["test card"],
            Glasses: ["eye patch left"],
        }
    },
    {
        name: "VEGAS",
        traits: {
            Fur: ["radioactive pink"],
            Background: ["baby blue", "lny blue", "vegas"],
            "Mouth Decoration": ["cigarette"],
            Hat: ["flat peak"],
            Eyes: ["green laser"],
            Frame: ["fairy lights"],
            Mouth: ["meh"],
        }
    },
    {
        name: "WOOF",
        traits: {
            Fur: ["joker"],
            Background: ["green", "snowfall", "beige"],
            Ear: ["double right rings"],
            "Mouth Decoration": ["bone"],
            Hat: ["sweatband", "blood poo"],
            Eyes: ["thug life"],
            Frame: ["pernis vs wernis"],
            Neck: ["hawaiian"]
        }
    },
    {
        name: "POOL18",
        traits: {
            Fur: ["x-ray"],
            Background: ["dark black"],
            "Mouth Decoration": ["tooth"],
            Hat: ["poo hat", "red lny hat"],
            Eyes: ["yellow laser"],
            Frame: ["warning"],
            Mouth: ["wtf", "snowman error"]
        }
    },
    {
        name: "POOL19",
        traits: {
            Fur: ["robot"],
            Background: ["space", "fireworks lny"],
            "Mouth Decoration": ["eat poo"],
            Hat: ["bandana"],
            Eyes: ["love"],
            Frame: ["green hazmat suit"],
            Mouth: ["yeh but no"],
        }
    },
    {
        name: "POOL20",
        traits: {
            Fur: ["raccoon"],
            Background: ["deep purple", "lny red"],
            Ear: ["left ring"],
            "Mouth Decoration": ["taco"],
            Hat: ["dude"],
            Eyes: ["eyes patched"],
            Frame: ["orange hazmat suit"],
            Mouth: ["good boy"]
        }
    },
]

export type FarmData = {
    name: string;
    traits: FarmTrait;
}

export type FarmTrait = {
    Background?: string[];
    Fur?: string[];
    Ear?: string[];
    'Mouth Decoration'?: string[];
    Hat?: string[];
    Neck?: string[];
    Eyes?: string[];
    Frame?: string[];
    Glasses?: string[];
    Mouth?: string[];
}
