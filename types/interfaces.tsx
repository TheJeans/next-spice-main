export interface Spice {
    id: number;
    name: string;
    price?: string;
    color: string;
    heat: number;
}

export interface Blend {
    id: number;
    name: string;
    blends: number[];
    spices: number[];
    description: string;
}
