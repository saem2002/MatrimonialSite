import React, { createContext, useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { finduser } from '../service/Api';



export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
    const navigate=useNavigate();
    const [Account, setAccount] = useState({name:"",email:"",password:"",age:"",religion:"",gender:"",image:"",contact:"",salary:"",description:"",block:0});
    const[statechanged,setstatechanged]=useState(0);
    useEffect(() => {
        const userloggedIn = async(req,res)=>
        {
          const localdata = localStorage.getItem('matrimonialLoginToken');
          const localdata2 = localStorage.getItem('Matrimonialinfoadded');
          
          const token = JSON.parse(localdata);
          const userinfo = JSON.parse(localdata2);
          console.log(token)
          console.log(userinfo)
          if(token===null || !token )
          {
            navigate('/login');
          }
          else if(userinfo==null || !userinfo)
          {
            navigate('/')
            
          }else
          {
            // navigate('/userDashboard')
          }
          const checkisPresent = await finduser(token);
          if(checkisPresent)
          {
            if(checkisPresent.block==1)
            {
              navigate('/block')
            }
            setAccount(checkisPresent);
          }
        }
        userloggedIn();
    }, [statechanged]);
    return (
        <div>
            <AccountContext.Provider value={{ Account, setAccount ,statechanged,setstatechanged}}>
                {children}
            </AccountContext.Provider>
        </div>
    )
}

export default AccountProvider
