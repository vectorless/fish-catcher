// Diving gloves. Determine which fish rarities you can grab by hand.
// Bare hands can only handle small / mid-sized fish — bigger ones thrash
// out of your grip. Better gloves let you wrestle rares (and one day epics).

export const GLOVES = {
  bare: {
    id: 'bare', name: 'Bare Hands', price: 0,
    allowed: ['common', 'uncommon'],
    color: 0xf2c89a,
    blurb: 'Skin contact. Slippery on big fish.'
  },
  mesh: {
    id: 'mesh', name: 'Mesh Gloves', price: 400,
    allowed: ['common', 'uncommon', 'rare'],
    color: 0x4a4a5e,
    blurb: 'Steel-mesh grip. You can wrestle a rare to the surface.'
  }
};

export const GLOVE_ORDER = ['bare', 'mesh'];
