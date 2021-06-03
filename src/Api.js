import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import md5 from 'blueimp-md5';

export const BASE_URL = 'https://host1.medsafe.tech:40443/';

const getImei = async function getImei() {
  const fpPromise = FingerprintJS.load({ token: 'CmaOCCWcRFUU8DcMgXOm' });
  const fp = await fpPromise;
  const result = await fp.get();
  return md5(result.visitorId);
};

export default class Api {
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: { 'Content-Type': 'application/json' },
    });
    this.getImei = getImei;
  }

  async getImei() {
    return this.getImei();
  }

  async sendRequest(url, payload) {
    try {
      const response = await this.instance.get(url, {
        params: {
          json: payload,
        },
      });
      const result = await response.data;
      return result;
    } catch (error) {
      return error;
    }
  }
}
