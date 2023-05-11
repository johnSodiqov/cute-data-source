import React, { useEffect, useState } from 'react';
import Userdata from './Userdata';

const Cards = () => {
  const [massiv, setmassiv] = useState([]);
  const [img, setimg] = useState('');
  const [name, setname] = useState('');
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
  function send(){
    let all ={
      name:name,
      avatar:img
    }
    Userdata.postuser(all)
    .then(res =>{
      console.log(res);
      run();
    })
  }
  return (
    <div className='row gx-0'>
      <div className="col-4"><input type="text" onInput={(i)=>setimg(i.target.value)}  placeholder='img' /></div>
      <div className="col-4"><input type="text" onInput={(i)=>setname(i.target.value)}  placeholder='text' /></div>
      <div className="col-4"><button onClick={send} className='btn btn-primary'>send</button></div>
      {
        massiv.map((data, index) => {
          return (
            <div className='col-3'>
              <div key={index} className="card">
                <img src={data.avatar} alt="sss" />
                <h4>{data.name}</h4>
                <button onClick={() => del(data.id)}>delet</button>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default Cards;
