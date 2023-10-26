import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class PantryApi {
  static token;

  static async request(endpoint, data = {}, method) {
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
    console.log(data);
    let res = await this.request("users/login", data, "post");
    console.log(res);
    return res.token;
  }

  // creates a new user
  static async signup(data) {
    let res = await this.request("users/register", data, "post");
    return res.body;
  }

  // edits an existing user
  static async editUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  // creates a new food item
  static async addFood(data) {
    let res = await this.request("food", data, "post");
    return res.food;
  }

  // creates a new client
  static async addClient(data) {
    let res = await this.request("clients", data, "post");
    return res.client;
  }

  // edits an existing client's data
  static async editClient(clientId, data) {
    let res = await this.request(`clients/${clientId}`, data, "patch");
    return res.client;
  }

  // creates a new order and adds it to the client data
  static async addOrder(clientId) {
    let res = await this.request(
      `clients/${clientId}/orders`,
      clientId,
      "post"
    );
    return res.order;
  }

  // for an orderID adds food items to the existing order#
  static async addOrderItems(orderId, foodId, data) {
    let res = await this.request(
      `orders/${orderId}/food/${foodId}`,
      data,
      "post"
    );
    return res.orderItem;
  }

  // for an existing orderID edits food items in the order
  static async editOrderItems(orderId, foodId, data) {
    let res = await this.request(
      `orders/${orderId}/food/${foodId}`,
      data,
      "patch"
    );
    return res.orderItem;
  }

  // updates the inventory amounts for a specific foodId
  static async updateInv(foodId, inventory) {
    let res = await this.request(`food/${foodId}`, { inventory }, "patch");
    return res.food;
  }

  // creates a new purchaseID
  static async addPurchase(data) {
    let res = await this.request("purchases", data, "post");
    return res.purchase;
  }

  // for an existing purchaseID, adds food items to the purchase
  static async addPurchaseItems(purchaseId, foodId, data) {
    let res = await this.request(
      `purchases/${purchaseId}/food/${foodId}`,
      data,
      "post"
    );
    return res.purchaseItem;
  }

  // GET REQUESTS*********************************************

  // gets current user information based on username
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`, "get");
    return res.user;
  }

  // lists current food items in food table
  static async getFood() {
    let res = await this.request(`food`, "get");
    return res.food;
  }

  // lists all purchases in purchase table
  static async getPurchases() {
    let res = await this.request(`purchases`, "get");
    return res.purchases;
  }

  // gets purchase details based on purchaseID
  static async getPurchaseDetails(purchaseId) {
    let res = await this.request(`purchases/${purchaseId}`, "get");
    return res.purchase;
  }

  // gets all client informtation from the client table
  // if client lastName is given filters based on that criteria
  static async getClients(lastName) {
    let res = await this.request(`clients`, { lastName }, "get");
    return res.clients;
  }

  // get client information for an existing client based on clientId
  static async getClient(clientId) {
    let res = await this.request(`clients/${clientId}`, "get");
    return res.client;
  }

  // gets all order from the orders table
  static async getAllOrders() {
    let res = await this.request(`orders`, "get");
    return res.orders;
  }

  // gets an existing order detail based on orderId
  static async getOrder(orderId) {
    let res = await this.request(`orders/${orderId}`, "get");
    return res.order;
  }

  // ***********************DELETE******************************

  // removes a user from the user table
  static async removeUser(username) {
    let res = await this.request(
      `users/${username}`,
      { Authorization: `Bearer ${PantryApi.token}` },
      "delete"
    );

    return res.body;
  }

  // removes an order from the order table
  static async removeOrder(orderId) {
    let res = await this.request(
      `orders/${orderId}`,
      { Authorization: `Bearer ${PantryApi.token}` },
      "delete"
    );

    return res.body;
  }

  // removes a purchase from the purchase table
  static async removePurchase(purchaseId) {
    let res = await this.request(
      `purchases/${purchaseId}`,
      { Authorization: `Bearer ${PantryApi.token}` },
      "delete"
    );

    return res.body;
  }

  // removes a client from the client table
  static async removeClient(clientId) {
    let res = await this.request(
      `clients/${clientId}`,
      { Authorization: `Bearer ${PantryApi.token}` },
      "delete"
    );
    return res.body;
  }

  // removes a food item from an existing order
  static async removeOrderItem(orderId, foodId) {
    console.log(orderId, foodId);
    let res = await this.request(
      `orders/${orderId}/food/${foodId}`,
      { Authorization: `Bearer ${PantryApi.token}` },
      "delete"
    );

    return res.data;
  }

  // removes a food item from an existing purchase
  static async removePurchaseItem(purchaseId, foodId) {
    let res = await this.request(
      `purchases/${purchaseId}/food/${foodId}`,
      { Authorization: `Bearer ${PantryApi.token}` },
      "delete"
    );

    return res;
  }
}

export default PantryApi;
