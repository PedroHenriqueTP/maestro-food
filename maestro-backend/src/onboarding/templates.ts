export const BusinessTemplates = {
  RESTAURANT: {
    hasScale: false,
    hasKds: true,
    hasTableService: true,
    defaultModules: ['waiter', 'kds', 'qrcode']
  },
  BAKERY: {
    hasScale: true,
    hasKds: false,
    hasTableService: false,
    defaultModules: ['scale', 'pos', 'display']
  },
  DARK_KITCHEN: {
    hasScale: false,
    hasKds: true,
    hasTableService: false,
    defaultModules: ['kds', 'delivery_integrations']
  },
  FAST_FOOD: {
    hasScale: false,
    hasKds: true,
    hasTableService: false,
    defaultModules: ['kiosk', 'pos', 'kds']
  }
};
