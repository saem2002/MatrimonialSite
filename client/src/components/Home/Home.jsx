import React, { useRef } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../context/AccountProvider';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import './Home.css'
import { useState } from 'react';
import { finduser, updateuser } from '../../service/Api';
import Select from 'react-select'
import form_image from '../../Pics/Form.png'
import { TextField } from '@mui/material';

const Home = ({ notify }) => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const videoEl = useRef(null);
  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);
  const { Account, setAccount, setstatechanged, statechanged } = useContext(AccountContext);

  const logout = () => {
    localStorage.removeItem('matrimonialLoginToken');
    localStorage.removeItem('Matrimonialinfoadded');
    setAccount('')
    navigate('/login')
  }
  const [open, setopen] = useState(false);
  let value
  const handlechange = (e) => {
    value = e.target.value;
    setcontact(value);
  }
  const handlechange2 = (e) => {
    value = e.target.value;
    setsalary(value);
  }
  const handlechange3 = (e) => {
    value = e.target.value;
    setdescription(value);
  }
  const handleopen = () => {
    setopen(true);
  }
  const handleclose = () => {
    setopen(false);
  }
  const [contact, setcontact] = useState('');
  const [age, setage] = useState('');
  const [gender, setgender] = useState('');
  const [religion, setreligion] = useState('');
  const [salary, setsalary] = useState('');
  const [description, setdescription] = useState('');
  const postDetails = async (e) => {

    e.preventDefault();

    const data = new FormData();
    data.append('image', images);
    data.append('phone', contact);
    data.append('salary', salary);
    data.append('description', description);
    data.append('age', age.value);
    data.append('gender', gender.value);
    data.append('religion', religion.value);

    const res = await updateuser(data, Account.email);
    if (res) {
      handleclose();
      localStorage.setItem('Matrimonialinfoadded', 'true')
      notify("Data updated successfully")
      setstatechanged(statechanged + 1)

    }

  }


  const agemap = [
    { value: '20', label: '20' },
    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
    { value: '26', label: '26' },
    { value: '27', label: '27' },
    { value: '28', label: '28' },
    { value: '29', label: '29' },
    { value: '30', label: '30' },
    { value: '31', label: '31' },
    { value: '32', label: '32' },
    { value: '33', label: '33' },
    { value: '34', label: '34' },
    { value: '35', label: '35' },
    { value: '36', label: '36' },
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },
    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' },
    { value: '45', label: '45' },
  ];
  const gendermap = [
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' },
    { value: 'others', label: 'others' },
  ];
  const religionmap = [
    { value: 'Hindu', label: 'Hindu' },
    { value: 'Muslim', label: 'Muslim' },
    { value: 'Christian', label: 'Christian' },
    { value: 'Sikh', label: 'Sikh' },
    { value: 'Parsi', label: 'Parsi' },
    { value: 'Jain', label: 'Jain' },
    { value: 'Buddhist', label: 'Buddhist' },
    { value: 'Jewish', label: 'Jewish' },
    { value: 'No Religion', label: 'No Religion' },
    { value: 'Spiritual', label: 'Spiritual' },
    { value: 'Other', label: 'Other' },

  ];

  useEffect(() => {
    const userloggedIn = async (req, res) => {
      const localdata = localStorage.getItem('matrimonialLoginToken');
      const localdata2 = localStorage.getItem('Matrimonialinfoadded');

      const token = JSON.parse(localdata);
      const userinfo = JSON.parse(localdata2);
      console.log(token)
      console.log(userinfo)
      if (token === null || !token) {
        navigate('/login');
      }
      else if (userinfo == null || !userinfo) {
        navigate('/')

      } else {
         navigate('/userDashboard')
      }
      const checkisPresent = await finduser(token);
      if (checkisPresent) {
        setAccount(checkisPresent);
      }
    }
    userloggedIn();
  }, [statechanged]);
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, height: '80vh', overflowX: 'hidden' }}
      role="presentation"
    >
      <form style={{ overflow: 'hidden' }} onSubmit={postDetails}>
        <div className='Form_item_div'>
          <div style={{ width: '40%' }}>
            <img src={form_image} style={{ height: '80vh' }}></img>
          </div>
          <div>
            <div className='Select_opt_home'>
              <Select
                maxMenuHeight={'25vh'}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: '12vw',
                  }),
                }}
                placeholder="Age"
                defaultValue={age}
                onChange={setage}
                options={agemap}
              />
              <Select
                maxMenuHeight={'25vh'}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: '12vw',


                  }),
                }}
                placeholder="Gender"
                defaultValue={gender}
                onChange={setgender}
                options={gendermap}
              />
              <Select
                maxMenuHeight={'25vh'}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: '12vw',
                  }),
                }}
                placeholder="Religion"
                defaultValue={religion}
                onChange={setreligion}
                options={religionmap}
              />


            </div>
            <div className='AddItem_textfields'>
              <TextField
                id="outlined-multiline-flexible"
                label="About you"
                multiline
                maxRows={4}
                value={description} onChange={handlechange3}
              /></div>
            <div className='AddItem_textfields'><TextField style={{ width: '20vw' }} id="standard-basic" name="salary" label="Salary(per month) in INR(If you are employed)" variant="standard" value={salary} onChange={handlechange2} /> </div>
            <div className='AddItem_textfields'><TextField name="Image" id="standard-basic" label="Your phone number" variant="standard" value={contact} onChange={handlechange} /> </div>
            <div style={{ marginBottom: '2vh', fontWeight: '600' }}>Choose you profile pic</div>
            <div className='AddItem_textfields'> <input name="Image" type="file" onChange={(e) => setImages(e.target.files[0])}></input></div>
            <div > <button type='submit' className='btn_submit' onClick={postDetails} >submit</button></div>
          </div>
        </div>

      </form>
    </Box>
  );


  return (
    <>


      <div style={{ backgroundColor: 'black' }}>
        <header className='navbar_home '>
          <div className='navbar__title navbar__item' onClick={() => navigate('/')}>Matrimonial site</div>
          <div className='navbar__item'>Hi {Account.name}</div>
          <div className='navbar__item'>About Us</div>
          <div className='navbar__item'>Contact</div>
          <div className='navbar__item'>Help</div>
          <div className='navbar__item' onClick={() => logout()}>Logout</div>
        </header>

        <div style={{ height: '80vh', marginTop: '-12vh' }}>
          <video
            style={{ maxWidth: "100%", width: "100%", margin: "0 auto" }}
            playsInline
            loop
            muted
            alt="All the devices"
            src="https://www.we2click.com/assets/videos/w2c-homepage-video.mp4?23"
            ref={videoEl}
          />
        </div>
        <div className='Video_heading'>
          <h2>No.1 Matrimony Site for Professionals & top Profiles in India </h2>
          
          <div class="button" id="button-7">
            <div id="dub-arrow"><img src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true" alt="" /></div>

            <div>
              {['bottom'].map((anchor) => (
                <>
                  <Button sx={{ color: '#BFC0C0' }} onClick={() => handleopen()}> <a  >Let's Begin</a></Button>

                  <Drawer
                    open={open}
                    anchor={anchor}

                    onClose={handleclose}
                  >
                    {list(anchor)}
                  </Drawer>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home