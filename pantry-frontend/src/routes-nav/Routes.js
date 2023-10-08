import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Dashboard from "../homepage/Dashboard";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import FoodList from "../food/FoodList";
import NewFoodForm from "../food/NewFoodForm";
import ClientList from "../clients/ClientList";
import NewClientForm from "../clients/NewClientForm";
import EditClientForm from "../clients/EditClientForm";
import ClientDetails from "../clients/ClientDetails";
import NewOrderForm from "../orders/NewOrderForm";
import OrderList from "../orders/OrderList";
import OrderDetails from "../orders/OrderDetails";
import PurchaseList from "../purchases/PurchaseList";
import NewPurchaseForm from "../purchases/NewPurchaseForm";
import PurchaseDetails from "../purchases/PurchaseDetails";
import ProtectedRoute from "./ProtectedRoutes";
import EditUserForm from "../auth/EditUserForm";

function Routes({ login, signup, food, updateInv, addNewFood, editUser }) {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <LoginForm login={login} />
        </Route>

        <ProtectedRoute exact path="/home">
          <Dashboard food={food} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/signup">
          <SignupForm signup={signup} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/users/:username/edit">
          <EditUserForm editUser={editUser} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/food">
          <FoodList food={food} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/food/new">
          <NewFoodForm addNewFood={addNewFood} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/clients">
          <ClientList />
        </ProtectedRoute>

        <ProtectedRoute exact path="/clients/new">
          <NewClientForm />
        </ProtectedRoute>

        <ProtectedRoute exact path="/clients/:clientId">
          <ClientDetails />
        </ProtectedRoute>

        <ProtectedRoute exact path="/clients/:clientId/edit">
          <EditClientForm />
        </ProtectedRoute>

        <ProtectedRoute exact path="/clients/:clientId/orders/:orderId/new">
          <NewOrderForm updateInv={updateInv} food={food} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/orders">
          <OrderList />
        </ProtectedRoute>

        <ProtectedRoute exact path="/orders/new">
          <OrderList food={food} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/orders/:orderId">
          <OrderDetails updateInv={updateInv} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/purchases">
          <PurchaseList />
        </ProtectedRoute>

        <ProtectedRoute exact path="/purchases/new">
          <NewPurchaseForm updateInv={updateInv} food={food} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/purchases/:purchaseId">
          <PurchaseDetails updateInv={updateInv} />
        </ProtectedRoute>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}
export default Routes;
