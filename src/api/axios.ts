import { message } from 'antd';
import axios from 'axios';

export const api = "http://localhost:3000";

export default function myAxios(url: string, data: any) {
  return new Promise((resolve, reject) => {
    axios.post(`${api}${url}`, data).then(({ data }) => {
      if (data.code === 200) {
        resolve(data.data);
        return;
      }
      message.error(data.msg);
    }).catch(err => {
      reject(err);
    })
  })
}