import spices from './spices'
import blends from './blends'

export const fetchSpices = async () => {
  const prom = new Promise((resolveOuter) => {
    setTimeout(() => {
      resolveOuter(spices)
    }, 2000)
  });

  return prom
}

export const fetchBlends = async () => {
  const prom = new Promise((resolveOuter) => {
    setTimeout(() => {
      resolveOuter(blends)
    }, 2000)
  });

  return prom
}

export const fetchSpice = async (name: string) => {
  const prom = new Promise((resolveOuter) => {
    setTimeout(() => {
      resolveOuter(spices.find((spice) => spice.name === name))
    }, 2000)
  });

  return prom
}
