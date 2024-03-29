import spices from "./spices";
import blends from "./blends";
import { Spice, Blend } from '../types/interfaces'

export const fetchSpices = async (): Promise<Spice[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(spices);
        }, 2000);
    });
};

export const fetchBlends = async (): Promise<Blend[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(blends);
        }, 2000);
    });
};

export const fetchSpice = async (name: string): Promise<Spice | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(spices.find((spice) => spice.name === name));
        }, 2000);
    });
};

export const fetchSpiceById = async (id: number): Promise<Spice | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(spices.find((spice) => spice.id === id));
        }, 2000);
    });
};

export const fetchBlend = async (name: string): Promise<Blend | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(blends.find((blend) => blend.name === name));
        }, 2000);
    });
};

export const fetchBlendById = async (id: number): Promise<Blend | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(blends.find((blend) => blend.id === id));
        }, 2000);
    });
};