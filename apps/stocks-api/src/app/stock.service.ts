import * as Wreck from '@hapi/wreck';
import { environment } from '../environments/environment';

class StockService {
  async getStockData(symbol: string, period: string, token: string) {
    const url = `${
      environment.apiURL
    }/beta/stock/${symbol}/chart/${period}?token=${token}`;
    const { res, payload } = await Wreck.get(url);
    return payload.toString();
  }
}
export const stockService = new StockService();
