import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class PantryApi {
  static token;

  static async request(endpoint, data = {}, method) {
    console.log(PantryApi.token);
    const url = `${BASE_URL}/${endpoint}`;

    const headers = { Authorization: `Bearer ${PantryApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      let message = err.response.data.error.message;

      throw Array.isArray(message) ? message : [message];
    }
  }

  // ********************************************************************************
  // POST and PATCH requests

  // validate a user sign In, returns a token
  static async login(data) {
    let res = await this.request("users/login", data, "post");
    return res.token;
  }

  static async addFood(data) {
    console.log(data);

    let res = await this.request("food", data, "post");
    return res.food;
  }

  static async addClient(data) {
    let res = await this.request("clients", data, "post");
    return res.client;
  }

  static async editClient(clientId, data) {
    let res = await this.request(`clients/${clientId}`, data, "patch");
    return res.client;
  }

  static async addOrder(clientId) {
    let res = await this.request(
      `clients/${clientId}/orders`,
      clientId,
      "post"
    );
    console.log(res);
    return res.order;
  }

  static async addOrderItems(orderId, foodId, data) {
    let res = await this.request(
      `orders/${orderId}/food/${foodId}`,
      data,
      "post"
    );
    return res.orderItem;
  }

  static async editOrderItems(orderId, foodId, data) {
    let res = await this.request(
      `orders/${orderId}/food/${foodId}`,
      data,
      "patch"
    );
    return res.orderItem;
  }

  static async updateInv(foodId, inventory) {
    let res = await this.request(`food/${foodId}`, { inventory }, "patch");
    return res.food;
  }

  static async addPurchase(data) {
    let res = await this.request("purchases", data, "post");
    return res.purchase;
  }

  static async addPurchaseItems(purchaseId, foodId, data) {
    let res = await this.request(
      `purchases/${purchaseId}/food/${foodId}`,
      data,
      "post"
    );
    return res.purchaseItem;
  }

  // GET REQUESTS
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`, "get");
    return res.user;
  }

  static async getFood() {
    let res = await this.request(`food`, "get");
    return res.food;
  }

  static async getPurchases() {
    let res = await this.request(`purchases`, "get");
    return res.purchases;
  }

  static async getPurchaseDetails(purchaseId) {
    let res = await this.request(`purchases/${purchaseId}`, "get");
    return res.purchase;
  }

  static async getClients(lastName) {
    let res = await this.request(`clients`, { lastName }, "get");
    return res.clients;
  }

  static async getClient(clientId) {
    let res = await this.request(`clients/${clientId}`, "get");
    return res.client;
  }

  static async getFilteredClients(name) {
    let res = await this.request(`clients/?lastName=${name}`, "get");
    return res.client;
  }

  static async getOrder(orderId) {
    let res = await this.request(`orders/${orderId}`, "get");
    return res.order;
  }

  static async getAllOrders() {
    let res = await this.request(`orders`, "get");
    return res.orders;
  }

  // ***********************DELETE******************************
  static async removeUser(username) {
    let res = await axios({
      url: `http://localhost:3001/users/${username}`,
      method: "delete",
      header: { Authorization: `Bearer ${PantryApi.token}` },
    });

    return res.body;
  }

  static async removeOrder(orderId) {
    let res = await axios({
      url: `http://localhost:3001/orders/${orderId}`,
      method: "delete",
      header: { Authorization: `Bearer ${PantryApi.token}` },
    });

    return res.body;
  }

  static async removePurchase(purchaseId) {
    let res = await axios({
      url: `http://localhost:3001/purchases/${purchaseId}`,
      method: "delete",
      header: { Authorization: `Bearer ${PantryApi.token}` },
    });

    return res.body;
  }

  static async removeClient(clientId) {
    let res = await axios({
      url: `http://localhost:3001/clients/${clientId}`,
      method: "delete",
      header: { Authorization: `Bearer ${PantryApi.token}` },
    });

    return res.body;
  }

  static async removeOrderItem(orderId, foodId) {
    let res = await axios({
      url: `http://localhost:3001/orders/${orderId}/food/${foodId}`,
      method: "delete",
      header: { Authorization: `Bearer ${PantryApi.token}` },
    });

    return res.data;
  }

  static async removePurchaseItem(purchaseId, foodId) {
    let res = await axios({
      url: `http://localhost:3001/purchases/${purchaseId}/food/${foodId}`,
      method: "delete",
      header: { Authorization: `Bearer ${PantryApi.token}` },
    });

    return res.data;
  }
}

export default PantryApi;
