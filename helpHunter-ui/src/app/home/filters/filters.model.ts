export interface Filters {
  size: {
    5: boolean
    10: boolean
    15: boolean
    20: boolean
  },
  work: {
    office: boolean
    remote: boolean
  },
  builder: {
    tiles: boolean
    painting: boolean
    bath: boolean
    hydraulics: boolean
  },
  it: {
    printer: boolean
    laptop: boolean
    phone: boolean
    network: boolean
  },
  mechanic: {
    oil: boolean,
    filter: boolean
    tire: boolean,
    diagnostics: boolean,
    geometry: boolean
  }
}
