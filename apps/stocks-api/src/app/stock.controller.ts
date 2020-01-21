import { Constants } from './app.constants';
import { stockService } from './stock.service';

export class StockController {
  constructor() {}

  init() {
    Constants.SERVER.method('getStockData', stockService.getStockData, {
      cache: {
        expiresIn: 600000,
        generateTimeout: 10000
      },
      generateKey: function(symbol, period) {
        return `${symbol}:${period}`;
      }
    });
  }

  async getStockData(request, h) {
    const token = request.query.token;
    const { symbol, period } = request.params;

    const result = await Constants.SERVER.methods.getStockData(
      symbol,
      period,
      token
    );
    return h.response(result);
  }
}
export const stockController = new StockController();
