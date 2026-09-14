export const WONDER_IMAGES = {
  portal: 'https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779707217/image_1_vdzwae.png',
  curtainLeft: 'https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706559/curtain_left_znkmva.png',
  curtainRight: 'https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706564/curtain_right_paeyym.png',
  world: 'https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706392/image_2_gkcdlx.png',
  clouds: 'https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706555/bottom_clouds_xskut6.png',
};

export const WONDER_CARD_IMAGES = [
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260525_160507_2ccbb4eb-1469-484f-af25-59168ad9a233.png&w=1280&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260525_160644_072a7f68-a101-4ded-a332-7d37707dbdd1.png&w=1280&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260525_160706_1c153d04-0dfb-4ac9-a4ef-e74f301c329c.png&w=1280&q=85',
];

export const WONDER_CARDS = [
  ['Hidden Realms', 'Luminous sanctuaries unseen by wandering eyes', '#f3cdd6'],
  ['Wild Solitudes', 'Dissolve into untamed horizons and deep calm', '#dcedc2'],
  ['Silent Havens', 'Remote escapes far beyond ordinary reach', '#c3e3f4'],
  ['Bespoke Quests', 'Journeys shaped around your vision and soul', '#f0e4c0'],
  ['Vivid Drifts', 'Surreal passages through breathtaking terrain', '#dcd2f2'],
  ['Mystic Crests', 'Timeless ridgelines wrapped in cloud and myth', '#f3cdd6'],
  ['Deep Currents', 'Glowing depths alive with uncharted wonder', '#c3e3f4'],
  ['Gilded Dusk', 'Amber horizons that stretch past all reason', '#f0e4c0'],
  ['Glassy Tides', 'Calm waters holding skies of pure stillness', '#dcedc2'],
].map(([title, description, color], index) => ({ index, title, description, color }));
