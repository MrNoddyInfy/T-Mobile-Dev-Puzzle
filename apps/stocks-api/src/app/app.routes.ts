import { stockController } from './stock.controller';

export const Routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.response('hapi server running...');
    }
  },
  {
    method: 'GET',
    path: '/stock/{symbol}/{period}',
    handler: stockController.getStockData
  }
];
