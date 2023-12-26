import React from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { closeModal } from '../store/modalSlice';
import './modal.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modal = () => {
  const dispatch = useDispatch();
   const {isOpen,data}=useSelector((state) => state.modal);
  if (!isOpen) return null;
  //const dataObject = JSON.parse(data);

  console.log("inside modal "+data);
  return (
    <>   
     <div className={`modal-backDrop ${isOpen ?'modal-show':'modal-hide'}`}>
    <div className="modal-container w-25">
      <div className="modal-content d-flex flex-column">
      
        <p className="lead text-dark m-5">{data&&JSON.parse(data)["statusMsg"]}</p>
        <button className="btn btn-danger w-25 mx-auto" onClick={()=>(dispatch(closeModal()))}>
          Close
        </button>
        </div>
        
       
       
    </div>
    </div>
    </>

  );
};

export default Modal;