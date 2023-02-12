import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../context/AccountProvider';

const Block = () => {
    const navigate = useNavigate();
    const { setstatechanged,statechanged,Account } = useContext(AccountContext);
    useEffect(() => {
        const changeupload=()=>
        {
            setstatechanged(statechanged+1);
        }
        changeupload();
    }, [statechanged]);
    return (
        <>
            <div>Your Id is blocked by Administrator</div>
            <div>You can get help by contact at <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>sa3463@gmail.com</span></div>
            {Account.block===0 && <div>your id is unblocked you can go <span onClick={()=>navigate('/')} style={{textDecoration: 'underline', cursor: 'pointer',color:'blue'}} >back</span> </div>}
        </>

    )
}

export default Block