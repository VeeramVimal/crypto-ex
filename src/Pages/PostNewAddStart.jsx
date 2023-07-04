import React from 'react'
import NavbarOne from "./separate/NavbarOne";
import {AiOutlineArrowRight} from "react-icons/ai"

export default function PostNewAddStart() {
  return (
    <div>
       <NavbarOne/>

       <div className="container mt-5 pt-5">
       <div className="card">
        <div className="card-body">
        <div className="row">
            <div className="col-lg-6 mx-auto css-tab-col">
            <ul className="nav nav-pills mb-4 d-flex justify-content-center" id="pills-tab" role="tablist">
  <li className="nav-item tab-css" role="presentation">
    <button className="btn  btnfont nav-link px-0 mx-2 px-1 active " id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">I want to buy</button>
  </li>
  <li className="nav-item tab-css" role="presentation">
    <button className="btn  btnfont nav-link px-0 mx-2 px-1 " id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">I want to sell</button>
  </li>
</ul>
<div className="tab-content" id="pills-tabContent">
  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">

    <div className="row align-items-center">
        <div className="col-lg-12">
      <div className="d-flex justify-content-between flex-column flex-lg-row align-items-center">
    <div>
    <label className='form-label'>asset</label>
    <select className="form-select w-100" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
    </div>
    <div >
<h4><AiOutlineArrowRight/></h4>
    </div>
    <div>
    <label className='form-label'>With cash</label>
    <select className="form-select w-100" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
    </div>
      </div>
        </div>
        <div className="col-lg-4 mt-5">
            <h6>Your price</h6>
            <h1>$20.05</h1>
        </div>
        <div className="col-lg-4 mt-5">
            <h6>Lowest Order price</h6>
            <h1>$20.05</h1>
        </div>
        <div className="col-lg-12 mt-5">
        <h4>Price type</h4>
        <div className='d-flex'>
  <div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label className="form-check-label" for="flexRadioDefault1">
    Fixed
  </label>
</div>
<div className="form-check ms-5">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
  <label className="form-check-label" for="flexRadioDefault2">
   Floating
  </label>
</div>
  </div>
  <div className="col-lg-6 mt-5">
  <div className="card">
  <div className="card-body">
 <div className="d-flex">
 <button className='btn btn-next'>+</button>
    <div className='w-100'><center><h3>81.35</h3></center></div>
    <button className='btn btn-next'>-</button>
 </div>
  </div>
</div>
  </div>
        </div>
    </div>
  </div>
  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">

  <div className="row align-items-center">
        <div className="col-lg-12">
      <div className="d-flex justify-content-between flex-column flex-lg-row align-items-center">
    <div>
    <label className='form-label'>asset</label>
    <select className="form-select w-100" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
    </div>
    <div >
<h4><AiOutlineArrowRight/></h4>
    </div>
    <div>
    <label className='form-label'>With cash</label>
    <select className="form-select w-100" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
    </div>
      </div>
        </div>
        <div className="col-lg-4 mt-5">
            <h6>Your price</h6>
            <h1>$20.05</h1>
        </div>
        <div className="col-lg-4 mt-5">
            <h6>Lowest Order price</h6>
            <h1>$20.05</h1>
        </div>
        <div className="col-lg-12 mt-5">
        <h4>Price type</h4>
        <div className='d-flex'>
  <div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label className="form-check-label" for="flexRadioDefault1">
    Fixed
  </label>
</div>
<div className="form-check ms-5">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
  <label className="form-check-label" for="flexRadioDefault2">
   Floating
  </label>
</div>
  </div>
  <div className="col-lg-6 mt-5">
  <div className="card">
  <div className="card-body">
 <div className="d-flex">
 <button className='btn btn-next'>+</button>
    <div className='w-100'><center><h3>81.35</h3></center></div>
    <button className='btn btn-next'>-</button>
 </div>
  </div>
</div>
  </div>
        </div>
    </div>
  </div>
</div>
            </div>
            <div className="col-lg-12">

            </div>
        </div>
        </div>
       </div>
       </div>

      


    </div>
  )
}
