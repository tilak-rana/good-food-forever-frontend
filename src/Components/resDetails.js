import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Carousel from "./resimgcarousel";
import RestaurantInfo from "./restaurantInfo";
import MenuItem from "./MenuItem";
import CartSummary from "./CartSummary";
import PaymentCard from "./PaymentCard";
import axios from "axios";
import queryString from "query-string";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "8px",
  },
};

const Details = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [menuModal, setMenuModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [resId, setResId] = useState(undefined);
  const [menuItems, setMenuItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contactNumber: "",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  useEffect(() => {
    const qs = queryString.parse(window.location.search);
    const { restaurant } = qs;

    axios
      .get(`http://0.0.0.0:5500/restaurants/${restaurant}`)
      .then((res) => {
        setRestaurants(res.data.restaurant);
        setResId(restaurant);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleModal = (state, value) => {
    if (state === "menuModal" && value === true) {
      axios
        .get(`http://0.0.0.0:5500/menu/${resId}`)
        .then((res) => {
          const items = res.data.menuitems
            ? res.data.menuitems.map((item) => ({
                ...item,
                qty: 0,
              }))
            : [];
          setMenuItems(items);
        })
        .catch((err) => {
          console.error("API Error:", err);
        });
    }

    if (state === "menuModal") {
      setMenuModal(value);
    } else if (state === "formModal") {
      setFormModal(value);
    } else if (state === "paymentModal") {
      setPaymentModal(value);
    }
  };

  const handleAddItem = (index) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index].qty += 1;
    setMenuItems(updatedMenuItems);
    updateSubtotal(updatedMenuItems);
  };

  const handleSubtractItem = (index) => {
    const updatedMenuItems = [...menuItems];
    if (updatedMenuItems[index].qty > 0) {
      updatedMenuItems[index].qty -= 1;
      setMenuItems(updatedMenuItems);
      updateSubtotal(updatedMenuItems);
    }
  };

  const updateSubtotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);
    setSubtotal(total);
  };

  const handlePayment = () => {
    handleModal("menuModal", false);
    handleModal("formModal", true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { formData, resId, subtotal, selectedPaymentMethod } = {
      formData,
      resId,
      subtotal,
      selectedPaymentMethod,
    };

    axios
      .post("http://0.0.0.0:5500/orders", {
        ...formData,
        resId,
        subtotal,
        paymentMethod: selectedPaymentMethod,
      })
      .then((response) => {
        console.log("Order submitted successfully:", response.data);
        handleModal("formModal", false);
        handleModal("paymentModal", true);
        setFormData({
          name: "",
          email: "",
          address: "",
          contactNumber: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
      });
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div>
      <Carousel />
      {restaurants.length > 0 &&
        restaurants.map((item) => <RestaurantInfo data={item} key={item.id} />)}
      <button
        className="btn btn-danger w-100 mt-3"
        onClick={() => handleModal("menuModal", true)}
      >
        Place Online Order
      </button>

      <Modal
        isOpen={menuModal}
        onRequestClose={() => handleModal("menuModal", false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <button
          onClick={() => handleModal("menuModal", false)}
          className="close-modal-btn"
        >
          X
        </button>
        <div>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              index={index}
              onAdd={handleAddItem}
              onSubtract={handleSubtractItem}
            />
          ))}
          <CartSummary subtotal={subtotal} onPayNow={handlePayment} />
        </div>
      </Modal>

      <Modal
        isOpen={formModal}
        onRequestClose={() => handleModal("formModal", false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <button
          onClick={() => handleModal("formModal", false)}
          className="close-modal-btn"
        >
          X
        </button>
        <div>
          <h2>Order Details</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Name:</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Enter your Name"
                required
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                className="form-control"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                placeholder="Enter your Address"
                required
              />
            </div>
            <div>
              <label>Contact Number:</label>
              <input
                className="form-control"
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleFormChange}
                placeholder="Enter your Contact Number"
                required
              />
            </div>
            <button className="btn btn-success mt-3" type="submit">
              Submit Order
            </button>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={paymentModal}
        onRequestClose={() => handleModal("paymentModal", false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <button
          onClick={() => handleModal("paymentModal", false)}
          className="close-modal-btn"
        >
          X
        </button>
        <PaymentCard onPaymentMethodSelect={handlePaymentMethodSelect} />
      </Modal>
    </div>
  );
};

export default Details;
