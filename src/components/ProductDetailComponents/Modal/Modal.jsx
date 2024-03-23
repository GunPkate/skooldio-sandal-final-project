import React, { useState } from "react";

const Modal = () => {
  const [confirmItem, setConfirmItem] = useState(null);
  return (
    <div>
      {confirmItem && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-title">Are you sure?</div>
            <p>Try to confirm</p>
            {/* <p>
              To delete {confirmItem.title} note, click the submit button below
            </p> */}
            <div className="modal-actions">
              <button
                onClick={() => {
                  //add logic
                }}
              >
                View Cart
              </button>
              <button onClick={() => setConfirmItem(null)}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
