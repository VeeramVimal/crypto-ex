// import package
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Modal, Button } from "react-bootstrap";

// import helper
import { toast } from "../../../core/lib/toastAlert";

const initialForm = {
  price: "",
  leverage: "",
  amount: "",
  type: "buy",
  orderType: "market",
  pair: "",
  action: "close",
  method: "isolated",
  toCurrency: "",
};

const PositionCloseModal = forwardRef((props, ref) => {
  const { userId, socketConnection } = props;

  // state
  const [isShow, setIsShow] = useState(false);
  const [pairDetails, setPairDetails] = useState();
  const [orderData, setOrderData] = useState(initialForm);
  const [loader, setLoader] = useState(false);

  // function
  const handleClose = () => {
    setIsShow(false);
    setOrderData(initialForm);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setOrderData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitTrade = (e) => {
    e.preventDefault();

    if (!userId) {
      toast({ type: "error", message: "Please login to continue" });
      return false;
    }

    if (orderData.orderType === "limit" && (!orderData.price || orderData.price == "")) {
      toast({ type: "error", message: "Please enter the price value" });
      return false;
    }
    
    let data = {};
    data.amount = parseFloat(orderData.amount);
    data.pair = orderData.pair;
    data.orderType = orderData.orderType;
    data.type = orderData.type;
    data.leverage = orderData.leverage;
    data.userId = userId;
    data.action = orderData.action;
    data.method = orderData.methodl;
    data.price = parseFloat(orderData.price);
    
    setIsShow(false);
    setLoader(true);
    socketConnection.emit("createOrderUSDTPerpetual", data);
    return false;
  };

  const loadSocket = () => {
    if (userId) {
      socketConnection.on("createRespUSDTPerpetualPosClose", function (data) {
        if (userId == data.userId) {
          if (data.status) {
            setLoader(false);
            handleClose();
            toast({ type: "success", message: data.message });
          } else {
            toast({ type: "error", message: data.message });
          }
        }
      });
    }
  };

  useEffect(() => {
    loadSocket();
  }, []);

  useImperativeHandle(ref, () => ({
    show: (data) => {
      setIsShow(true);
      setOrderData((prev) => {
        return {
          ...prev,
          leverage: data.leverage,
          amount: data.amount,
          pair: data.pair,
          type: data.type,
          orderType: data.orderType,
        };
      });
      setPairDetails(data.pairDetails);
    },
  }));

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {orderData.orderType == "market" ? "Market" : "Limit"} Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orderData.orderType == "market" && (
          <div>Are you sure to close market</div>
        )}

        {orderData.orderType == "limit" && (
          <div>
            <p className="trade-text-6 mt-3">
              Price (
              {pairDetails &&
                pairDetails.toCurrency &&
                pairDetails.toCurrency.currencySymbol}
              )
            </p>
            <div className="input-group mb-3">
              <input
                type="number"
                onChange={handleChange}
                name="price"
                id="price"
                value={orderData.price}
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <span className="input-group-text" id="basic-addon1">
                {pairDetails &&
                  pairDetails.toCurrency &&
                  pairDetails.toCurrency.currencySymbol}
              </span>
            </div>
          </div>
        )}

        <div>
          <Button onClick={handleClose}>Cancel</Button>
          &nbsp;
          <Button onClick={submitTrade}>Confirm</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default PositionCloseModal;
