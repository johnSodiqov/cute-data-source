import React, { useEffect, useState, } from 'react';
import Userdata from './Userdata';
import "./Cards.css"
import { BsTelegram, BsInstagram, BsFacebook } from "react-icons/bs"
import { useLocation,useNavigate } from 'react-router-dom';

const Cards = () => {
  const [massiv, setmassiv] = useState([]);
  const [img, setimg] = useState('');
  const [name, setname] = useState('');
  const [job, setJob] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [jobs] = useState([
    "Game Developer", "Software Engineer", "Art Designer", "Web Developer", "Frontend Developer",
    "Backend Developer", "AI Engineer" ,"Project Manager"]);

  const [newID, setnewID] = useState();
  const location = useLocation()
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false);
  const [val, setVal] = useState('');

  useEffect(() => {
    setIsAdmin(location.state)
    run()
  },[location.state])

  function run() {
    Userdata.getuser()
      .then(res => {
        setmassiv(res);
      })
  }

  function deleteUser(id) {
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
      job: job,
      description: description,
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
      name: (name.length > 0) ? name : newID.name,
      image: (img.length > 0) ? img : newID.img,
      job: (job.length > 0) ? job : newID.job,
      description: (description.length > 0) ? description : newID.description
    }

    Userdata.editUser(newUser, newID.id)
      .then(res => {
        run()
      })

  }

  const search = massiv.filter(name => {
    return name.name.toLowerCase().includes(val.toLowerCase())
  })

  return (
    <div>

      <nav className="navbar  mb-3">
        <div className="container-fluid row">
          <a href='/' className="navbar-brand col-12 col-md-3">Cute.data</a>
          <form className="d-flex col-10 col-md-6 my-3">
            <input className="form-control me-2 navbar-search" type="search" placeholder="Search" aria-label="Search" onChange={(val) => setVal(val.target.value)} />
          </form>
          <button className='btn col-2' onClick={()=>{navigate("/login")}}>Log Out</button>
        </div>
      </nav>
      <div className="container-fluid">

        <div className="container h-auto">
          <div className='row gx-0 m-0 p-0'>

            <div>
              {
                (isAdmin) ? <div className="row my-5 mx-auto">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
                    Add
                  </button>
                </div> : " "
              }
            </div>

            <div className="modal_window">

              <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="col-12"><input type="text" className='form-control my-1' onInput={(i) => setimg(i.target.value)} placeholder='Enter the images URL' /></div>
                      <div className="col-12"><input type="text" className='form-control my-1' onInput={(i) => setname(i.target.value)} placeholder='Enter the name' /></div>
                      <div className="form-floating">
                        <textarea className="form-control h-100 my-2" placeholder="Please tell us about yourself..." id="floatingTextarea2" onChange={(val) => setDescription(val.target.value)}></textarea>
                        <label htmlFor="floatingTextarea2">Please tell us about yourself...</label>
                      </div>
                      <div className="col-1">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          Job
                        </button>

                        <ul className="dropdown-menu">
                          {
                            jobs.map((item, index) => {
                              return (
                                <li key={index}><p className="dropdown-item" role='button' href="qwer" onClick={() => setJob(item)}>{item}</p></li>
                              )
                            })
                          }

                        </ul>

                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" onClick={() => editUser()} data-bs-dismiss="modal">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Add User</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="col-12  my-3"><input type="text" className='form-control' onInput={(i) => setimg(i.target.value)} placeholder='Enter the images URL ' /></div>
                      <div className="col-12  my-3"><input type="text" className='form-control' onInput={(i) => setname(i.target.value)} placeholder='Enter the name' /></div>
                      <div className="form-floating">
                        <textarea className="form-control h-50 my-2" placeholder="Please tell us about yourself..." id="floatingTextarea2" onChange={(val) => setDescription(val.target.value)}></textarea>
                        <label htmlFor="floatingTextarea2">Please tell us about yourself...</label>
                      </div>
                      <div className="col-4 col-md-1 mx-md-0 mx-3">
                        <button type="button" className="btn px-4 px-md-3 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          Job
                        </button>
                        <ul className="dropdown-menu">
                        {
                            jobs.map((item, index) => {
                              return (
                                <li key={index}><p className="dropdown-item" role='button' href="qwer" onClick={() => setJob(item)}>{item}</p></li>
                              )
                            })
                          }
                        </ul>
                      </div>

                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" onClick={send} data-bs-dismiss="modal">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="user row p-0 m-0">
              {search.map((data, index) => {
                return (
                  <div key={index} className='col-12 col-md-6'>
                    <div className="user-card row ">
                      <div className="user-img col-5 col-md-5 col-xs-5">
                        <img src={data.image} alt={data.name} />
                      </div>
                      <div className="user-info col-7 col-md-7 col-xs-5">
                        <h2 className='text-dark text-start w-100'>{data.name}</h2>
                        <h5 className='text-dark text-start w-100'>{data.job}</h5>
                        <p className='text-dark text-start w-100'>{data.description}</p>
                        {
                          (isAdmin) ?
                            <div className='w-100'><button className='btn w-25 mx-3 mt-md-2 m-0 ' onClick={() => deleteUser(data.id)}>Delete</button>
                              <button type="button" className="btn w-25 mx-3 mt-md-2 mt-0 " data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => getID(data)}>Edit</button></div> : " "
                        }
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
    </div>
  );
}

export default Cards;
