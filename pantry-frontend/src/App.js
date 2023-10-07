import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./auth/UserContext";
import NavBar from "./routes-nav/NavBar";
import Routes from "./routes-nav/Routes";
import PantryApi from "./pantryApi";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState("");
  const [food, setFood] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [newFood, setNewFood] = useState([]);

  // upon loading call API to get the current user
  useEffect(() => {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getUser() {
      try {
        let user = await PantryApi.getCurrentUser(currentUser.username);
        setCurrentUser(user);
      } catch (err) {
        setCurrentUser(null);
      }
    }
    getUser();
  }, [token]);

  // upon loading, call API to get a list of all food
  useEffect(() => {
    async function getFood() {
      let food = await PantryApi.getFood();
      setFood(food);
    }
    getFood();
  }, [token, inventory, newFood]);

  console.log(food);

  async function updateInv(foodId, quantNum) {
    try {
      let update = await PantryApi.updateInv(foodId, quantNum);
      setInventory(update);
      return update;
    } catch (err) {
      return err;
    }
  }

  async function addNewFood(data) {
    try {
      let food = await PantryApi.addFood(data);
      setNewFood(food);
      return { success: true };
    } catch (err) {
      return { success: false, err };
    }
  }

  // function to handle login and set and save token to local storage
  async function login(data) {
    try {
      let token = await PantryApi.login(data);
      PantryApi.token = token;
      setCurrentUser({ username: data.username });
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("login failed", err);
      return { success: false, err };
    }
  }

  // function to handle user logout. Clear token from storage
  function logout() {
    setToken("");
    setCurrentUser(null);
  }

  // function to handle new user signup
  async function signup(data) {
    try {
      let token = await PantryApi.signup(data);
      setCurrentUser({ username: data.username });
      setToken(token);
      return { success: true };
    } catch (err) {
      return { success: false, err };
    }
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser }}>
        <div className="App">
          {currentUser ? <NavBar logout={logout} /> : ""}
          <Routes
            updateInv={updateInv}
            food={food}
            addNewFood={addNewFood}
            login={login}
            signup={signup}
          />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
