import React from 'react';
import NavbarOne from "./separate/NavbarOne";
import {AiOutlineArrowRight} from "react-icons/ai"
export default function PostNewAddFinal(props) {
  return (
    <div>
      <NavbarOne
        setTheme={props.setTheme}
        theme={props.theme}
      />

 

       <div className="container mt-5 pt-5">
<div className='card'>
<div className="card-body">
<div >
    <label for="floatingTextarea">Remarks (optional)</label>
  <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
 
</div>
 <div className=" mt-3">
 <label for="floatingTextarea">Auto replay (optional)</label>
  <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>

</div>

<select className="form-select mt-3" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>

<div className="row">
    <div className="col-lg-6">
    <div className=" mt-4">
 <label for="floatingTextarea">CounterParty Condition</label>


</div>
<div className="form-check mt-3">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label className="form-check-label" for="flexCheckDefault">
    Complete KYC
  </label>
</div>
<div className="row">
    <div className="col-lg-6">

    <div className="form-check mt-3">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label className="form-check-label" for="flexCheckDefault">
    Registered 
  </label>
</div>
    </div>
    <div className="col-lg-6">
    <div className="mb-2">
  
    <input type="number" className="form-control"/>
    <label className="form-label"><small className='text-muted'>days ago</small></label>
  </div>
    </div>
</div>
<div className="row">
    <div className="col-lg-6">

    <div className="form-check mt-3">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label className="form-check-label" for="flexCheckDefault">
    Holding more than
  </label>
</div>
    </div>
    <div className="col-lg-6">
    <div className="mb-2">
  
    <input type="number" className="form-control"/>
    <label className="form-label"><small className='text-muted'>USDT</small></label>
  </div>
    </div>
    <div className="col-lg-12">
  <div className='d-flex'>
  <div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label className="form-check-label" for="flexRadioDefault1">
    Online right now
  </label>
</div>
<div className="form-check ms-4">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
  <label className="form-check-label" for="flexRadioDefault2">
    Offline manually later
  </label>
</div>
  </div>
    </div>

</div>
    </div>
</div>
</div>
</div>

    </div>
    </div>
  )
}
