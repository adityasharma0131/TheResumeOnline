import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Modal = ({ show, onClose, children }) => {
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  const handleClose = () => {
    navigate(-1);
    if (onClose) onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={handleClose}>
          <IoMdClose />
        </button>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
