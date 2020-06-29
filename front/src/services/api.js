import apisauce from 'apisauce';
import { BASE_URL } from '../config';

const create = () => {
  const api = apisauce.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  // Credentials requests
  // On a real project, this route would be private
  const getCredentials = () => api.get('credentials');

  // Orders requests
  const getOrders = (data) =>
    api.get('orders', {
      'meta[state]': data.state,
      'meta[created_at]': data.created_at,
      'meta[address]': data.address,
    });

  const createOrder = (data) =>
    api.post('orders', {
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
    });

  // Photos requests
  const getPhotos = (orderId) => api.get(`orders/${orderId}/photos`);

  const createPhoto = (data) =>
    api.post(`orders/${data.orderId}/photos`, {
      photo: {
        order_id: data.orderId,
        resource_url: data.url,
      },
    });

  return {
    getCredentials,
    getOrders,
    createOrder,
    getPhotos,
    createPhoto,
  };
};

export default {
  create,
};
