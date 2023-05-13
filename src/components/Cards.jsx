import React, { useEffect, useState } from 'react';
import Userdata from './Userdata';
import "./Cards.css"
import { BsTelegram, BsInstagram, BsFacebook } from "react-icons/bs"

const Cards = () => {
  const [massiv, setmassiv] = useState([]);
  const [img, setimg] = useState('');
  const [name, setname] = useState('');
  const [newID, setnewID] = useState(0);
  const [job, setJob] = useState(" ");
  useEffect(() => {
    run()
  }, [])

  function run() {
    Userdata.getuser()
      .then(res => {
        console.log(res);
        setmassiv(res);
      })
  }

  function del(id) {
    Userdata.deluser(id)
      .then(res => {
        console.log(res);
        run();
      })
  }
  function send() {
    let all = {
      name: name,
      image: img,
      job: job
    }
    Userdata.postuser(all)
      .then(res => {
        console.log(res);
        run();
      })
  }

  function getID(id) {
    setnewID(id);
  }

  function editUser() {
    let newUser = {
      name: name,
      image: img,
      job: job
    }
    Userdata.editUser(newUser, newID)
      .then(res => {
        console.log(res);
      })

    run()
  }
  return (
    <div className="container-fluid">
      <div className="container">
        <div className='row gx-0 m-0 p-0'>

          <div className="row my-5 mx-auto">
            <div className="col-12 col-lg-5 my-md-0 my-3"><input type="text" className='form-control' onInput={(i) => setimg(i.target.value)} placeholder='Enter the images URL ' /></div>
            <div className="col-12 col-md-5 my-md-0 my-3"><input type="text" className='form-control' onInput={(i) => setname(i.target.value)} placeholder='Enter the name' /></div>
            <div className="col-4 col-md-1 mx-md-0 mx-3">
              <button type="button" className="btn px-4 px-md-3 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Job
              </button>
              <ul className="dropdown-menu">
                <li><p className="dropdown-item" href="qwer" onClick={() => setJob("Web Developer")}>Web Developer</p></li>
                <li><p className="dropdown-item" href="qwer" onClick={() => setJob("Software Engineer")}>Software Engineer</p></li>
                <li><p className="dropdown-item" href="qwer" onClick={() => setJob("Game Developer")}>Game Developer</p></li>
              </ul>
            </div>
            <div className="col-4 col-md-1 mx-lg-0 mx-3"><button onClick={send} className='btn px-4 px-md-3'>Save</button></div>
          </div>

          <div className="modal_window">
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body row">
                    <div className="col-12"><input type="text" className='form-control my-3' onInput={(i) => setimg(i.target.value)} placeholder='Enter the images URL' /></div>
                    <div className="col-12"><input type="text" className='form-control my-3' onInput={(i) => setname(i.target.value)} placeholder='Enter the name' /></div>
                    <div className="col-1">
                      <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Job
                      </button>
                      <ul className="dropdown-menu">
                        <li><p className="dropdown-item" href="qwer" onClick={() => setJob("Web Developer")}>Web Developer</p></li>
                        <li><p className="dropdown-item" href="qwer" onClick={() => setJob("Software Engineer")}>Software Engineer</p></li>
                        <li><p className="dropdown-item" href="qwer" onClick={() => setJob("Game Developer")}>Game Developer</p></li>
                      </ul>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={() => editUser()}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="user row p-0 m-0">
            {massiv.map((data, index) => {
              return (
                <div key={index} className='col-12 col-md-6'>
                  <div className="user-card row ">
                    <div className="user-img col-12 col-md-5 col-xs-5">
                      <img src={data.image} alt={data.name} />
                    </div>
                    <div className="user-info col-12 col-md-7 col-xs-5">
                      <h2 className='text-dark text-start w-100'>{data.name}</h2>
                      <h5 className='text-dark text-start w-100'>{data.job}</h5>
                      <p className='text-dark text-start w-100'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae vel nulla aut reiciendis impedit, harum </p>
                      <button className='btn w-25 mx-3 mt-md-2 m-0 ' onClick={() => del(data.id)}>Delete</button>
                      <button type="button" className="btn w-25 mx-3 mt-md-2 mt-0 " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getID(data.id)}>Edit</button>
                    </div>
                  </div>
                </div>
              )
            })
            }
          </div>



        </div>
      </div>
      <footer className='row'>
        <h1 className='col-12 fs-3 text-center my-2'>Developed by <span>John Sodiqov</span></h1>
        <div className="social-box text-center  my-2 col-12">
          <a href="https://t.me/John_Sodiqov" target='_blank' rel='noreferrer' className='social-link text-dark mx-3'>
            <BsTelegram className='fs-1' />
          </a>
          <a href="https://www.instagram.com/john.sodiqov/" target='_blank' rel='noreferrer' className='social-link text-dark mx-3'>
            <BsInstagram className='fs-1' />
          </a>
          <a href="https://www.facebook.com/john.sodiqov" target='_blank' rel='noreferrer' className='social-link text-dark mx-3'>
            <BsFacebook className='fs-1' />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Cards;
