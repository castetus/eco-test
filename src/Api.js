import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import md5 from 'blueimp-md5';

const BASE_URL = 'https://host1.medsafe.tech:40443/api/';

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

  async sendLoginData(userdata) {
    console.log(userdata);
    try {
      const response = await this.instance.get('client_login', {
        params: {
          json: userdata,
        },
      });
      const result = await response.data[0];
      return result;
    } catch (error) {
      return error;
    }
  }

  async requestDocsList(requestData) {
    try {
      const response = await this.instance.get('test', {
        params: {
          json: requestData,
        },
      });
      const result = await response.data;
      return result;
    } catch (error) {
      return error;
    }
  }
}
