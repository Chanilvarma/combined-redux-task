/* eslint-disable no-loop-func */
import React, { useState, useContext, useRef } from "react";
// import { GlobalContext } from "../context/GlobalState";
// import { useHistory } from "react-router-dom";
import { maxDate } from "../helper/dates";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CustomToast from '../hangman/components/CustomToast'
import { useDispatch } from "react-redux";
import { addTransaction } from '../redux/action'


toast.configure()
const message = `Your Transaction is add.
Please Connect to internet to see your transation history`

const AddTransaction = () => {

  // const history = useHistory();
  const input = useRef();
  const dispatch = useDispatch()
  // const { addTransaction } = useContext(GlobalContext);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [name, setCategory] = useState("personal");
  const [amount, setAmount] = useState(0);
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [amountError, setAmountError] = useState({});
  const types = ["image/png", "image/jpeg"];

  // let transactionStore = transactions
  // console.log(transactionStore)
  const convertBase64 = (selected) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selected);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
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
  const onImageUpload = async (e) => {
    if (e.target.files.length > 0) {
      const selected = e.target.files[0];

      // setImage(base64);
      if (selected && types.includes(selected.type)) {
        const base64 = await convertBase64(selected);
        setImage(base64);
        setError("");
      } else {
        setImage(null);
        setError("Please select an image file (png or jpg)");
      }
    }
  };


  //Adding New transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();
    const isValidate = formValidation()

    const newTranscation = {
      id: Math.floor(Math.random() * 1000000),
      text,
      name,
      amount: +amount,
      date,
      image,
    };
    dispatch(addTransaction(newTranscation))
    setAmount(0);
    setText("");
    setDate("");
    if (isValidate) {
      return (
        toast.info(
          <CustomToast message={message} />, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 6000
        })
      )
    }


  };


  return (
    <div className="add-transaction">
      <div className="row">
        <h3>Add new transaction(offline)</h3>
        <form onSubmit={handleAddTransaction}>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input
              type="text"
              ref={input}
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
              onChange={(e) => setCategory(e.target.value)}
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
            <label htmlFor="amount"> Picture</label>
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

  );
};

export default AddTransaction;
