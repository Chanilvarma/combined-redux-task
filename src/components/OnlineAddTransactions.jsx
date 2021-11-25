import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { maxDate } from "../helper/dates";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";
import useFirestore from "../hooks/useFirestore";

const OnlineAddTransaction = ({ handlecount }) => {
  const history = useHistory()
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("personal");
  const [amount, setAmount] = useState(0);
  const [image, setImage] = useState("");
  const [error, setError] = useState(null)
  const [amountError, setAmountError] = useState({});
  const offlineStorage = projectFirestore.collection("transactions");
  const storageRef = projectStorage.ref(
    "blobtransaction" + Math.floor(Date.now() / 1000)
  );
  const types = ["image/png", "image/jpeg"];

  const onImageUpload = (e) => {
    if (e.target.files.length > 0) {
      const selected = e.target.files[0];

      // setImage(base64);
      if (selected && types.includes(selected.type)) {

        setImage(selected);
        setError("");
      } else {
        setError("Please select an image file (png or jpg)");
        setImage();
      }
    }
  };

  const formValidation = () => {
    const Error = {};
    let isValidate = true;
    if (amount === 0) {
      Error.errorMesage = `Amount shouldn't be 0, You can add any positive or negitive values`
      isValidate = false;

    }
    setAmountError(Error)
    return isValidate;
  }


  const handleAddTransaction = (e) => {
    handlecount(amount)
    const isValidate = formValidation();
    isValidate && history.push("/history");
    e.preventDefault();
    if (image) {
      storageRef.put(image).then((snapshot) => {
        storageRef
          // .child(image.name)
          .getDownloadURL()
          .then(url => {
            offlineStorage.add({
              timestamp: timestamp(),
              text,
              name,
              amount: +amount,
              date,
              imageUrl: url,
            })
            setImage("");
            setAmount(0);
            setText("");
            setDate("");
          })
      },

        (error) => {
          console.log(error);
          alert(error.message);
        })
    }

    else if (!image) {
      offlineStorage.add({
        timestamp: timestamp(),
        text,
        name,
        amount: +amount,
        date,
      })
    }



  }

  return (
    <div className="add-transaction">
      <div className="row">
        <h3>Add new transaction(online)</h3>
        <form onSubmit={handleAddTransaction}>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              value={date}
              max={maxDate}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Select Date"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="category"
            >
              <option value="personal">Personal</option>
              <option value="travel">Travel</option>
              <option value="essential">Essential</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="amount">
              Amount <br />
              (negative - expense, positive - income)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              required
            />
            {Object.keys(amountError).map((key) => {
              return <div style={{ color: 'red' }}>{amountError[key]}</div>
            })}
          </div>
          <div className="form-control">
            <label htmlFor="amount">
              Picture
              <br />
            </label>
            <input type="file" onChange={onImageUpload} />
            {{ error } && <div style={{ color: 'red' }}>{error}</div>}
          </div>
          <div className="d-grid">
            <button
              type="submit"

              className="btn"
            >
              Add transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OnlineAddTransaction