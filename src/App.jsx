import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import AddTransaction from "./components/AddTransaction";
import OnlineAddTransaction from "./components/OnlineAddTransactions";
import TransactionList from "./components/TransactionList";
import HangmanHomePage from "./hangman/HangmanHomePage";
import Main from "./components/Main";
import { base64StringToBlob } from "blob-util";
// import { GlobalProvider } from "./context/GlobalState";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../src/firebase/config";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const offlineStorage = projectFirestore.collection("transactions");
const storageRef = projectStorage.ref(
  "blobtransaction" + Math.floor(Date.now() / 1000)
);
const App = () => {
  const [count, setCount] = useState(0)
  let temp;
  const handlecount = (amount) => {
    temp = count + +amount;
    setCount(temp)
  }

  const UploadData = (transaction, blob) => {
    storageRef.put(blob).then(
      (snapshot) => {
        storageRef
          // .child(image.name)
          .getDownloadURL()
          .then((url) => {
            offlineStorage.add({
              timestamp: timestamp(),
              text: transaction.text,
              name: transaction.name,
              amount: transaction.amount,
              date: transaction.date,
              imageUrl: url,
            });
          });
      },
      (error) => {
        console.log(error);
        alert(error.message);
      }
    );
  };
  const handleConnectionChange = async (event) => {
    const localData = JSON.parse(localStorage.getItem("newState"));
    console.log(localData);
    console.log(localData.transactions.transactions[0])
    if (event.type === "online") {
      console.log("You are now back online.");
      // console.log(transactions.length);
      for (var index = 0; index < localData.transactions.transactions.length; index++) {

        const trimmedBaseString = localData.transactions.transactions[index].image
          .split(",")
          .pop();
        var blob = base64StringToBlob(trimmedBaseString, "image/jpeg");
        console.log(blob);
        UploadData(localData.transactions[index], blob);
      }
      // localStorage.removeItem("state");
    }

    // console.log(new Date(event.timeStamp));
  };
  window.removeEventListener("online", handleConnectionChange);
  window.addEventListener("online", handleConnectionChange);
  const connected = navigator.onLine;
  return (

    <Router>
      <Header count={count} />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Main} />
          {connected && (
            <Route
              path="/transaction"
              exact
            >
              <OnlineAddTransaction handlecount={handlecount} />
            </Route>
          )}
          {!connected && (
            <Route
              path="/transaction"
              exact
              component={AddTransaction}
            />
          )}

          <Route path="/hangman" exact>
            {
              count >= 1000 && connected ? <HangmanHomePage /> : <Main />
            }

          </Route>
          <Route path="/history" exact component={TransactionList} />
        </Switch>
      </div>
    </Router>

  );
};

export default App;
