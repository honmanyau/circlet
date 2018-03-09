export const INITIALISE_CIRCLET = 'INITIALISE_CIRCLET';

export function initialiseCirclet(timestamp) {
  return {
    type: INITIALISE_CIRCLET,
    payload: { timestamp }
  }
}
