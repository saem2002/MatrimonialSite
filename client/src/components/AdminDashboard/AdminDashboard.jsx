import { Button, Card, CardActionArea, CardActions, CardContent, Paper, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../context/AccountProvider';
import { blockthisuser, getsubcategory, getUsers, noofusers } from '../../service/Api';
import './AdminDashboard.css'
import AnimatedNumber from "animated-number-react";
const AdminDashboard = ({notify}) => {
    const [totalusers, settotalusers] = useState('');
    useEffect(() => {
        const findnoofusers = async () => {
            const data = await noofusers();
            settotalusers(data)
        }
        findnoofusers();
    }, []);
    const [statechanged, setstatechanged] = useState(0);
    const [filterdata, setfilterdata] = useState([]);
    const { Account } = useContext(AccountContext);

    useEffect(() => {
        const allItems = async () => {

            const data = await getUsers();

            setfilterdata(data);


        }



        allItems();



    }, [statechanged]);
    const blockUser = async (email,block) => {
        
        const res = await blockthisuser(email);
        if(res)
        {
            if(block==1) notify(`${email} unblocked`)
            else  notify(`${email} blocked`)
        }
        setstatechanged(statechanged+1);
    }
    const formatValue = (value) => value.toFixed(1);
    return (
        <>

            <div id="wrapper">
                <div class="content-area">
                    <div class="container-fluid">

                        <div class="main">
                            <div style={{ textAlign: 'center', fontWeight: '800', fontSize: 'large', paddingTop: '5vh' }}>AdminDashboard</div>
                            <Box
                                sx={{
                                    marginTop: '15vh',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    color: 'white',
                                    justifyContent: 'space-evenly',
                                    '& > :not(style)': {

                                        width: 100,
                                        height: 50,
                                    },
                                }}
                            >


                                <div style={{ width: '33%', fontSize: 'larger' }} ><AnimatedNumber
                                    duration={3000}
                                    value={totalusers.totalusers}
                                    formatValue={formatValue}
                                /></div>
                                <div style={{ width: '33%', fontSize: 'larger' }}><AnimatedNumber
                                    duration={3000}
                                    value={totalusers.maleusers}
                                    formatValue={formatValue}
                                /></div>
                                <div style={{ width: '33%', fontSize: 'larger' }}><AnimatedNumber
                                    duration={3000}
                                    value={totalusers.femaleusers}
                                    formatValue={formatValue}
                                /></div>
                            </Box>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    marginBottom: '15vh',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-evenly',

                                }}
                            >
                                <div style={{ width: '33%' }}>No. of users </div>
                                <div style={{ width: '33%' }}> No. of male users  </div>
                                <div style={{ width: '33%' }}> No. of female users  </div>


                            </Box>
                            <div className='Items_Div_Home1' style={{}}>
                                {filterdata === -1 &&
                                    <>
                                        <Skeleton sx={{ boxShadow: '0px 0px black, -0.7em 0 .3em grey', marginBottom: '1vh' }} variant="rectangular" width={250} height={300} />
                                        <Skeleton sx={{ boxShadow: '0px 0px black, -0.7em 0 .3em grey', marginBottom: '1vh' }} variant="rectangular" width={250} height={300} />
                                        <Skeleton sx={{ boxShadow: '0px 0px black, -0.7em 0 .3em grey', marginBottom: '1vh' }} variant="rectangular" width={250} height={300} />
                                        <Skeleton sx={{ boxShadow: '0px 0px black, -0.7em 0 .3em grey', marginBottom: '1vh' }} variant="rectangular" width={250} height={300} />
                                        <Skeleton sx={{ boxShadow: '0px 0px black, -0.7em 0 .3em grey', marginBottom: '1vh' }} variant="rectangular" width={250} height={300} />
                                        <Skeleton sx={{ boxShadow: '0px 0px black, -0.7em 0 .3em grey', marginBottom: '1vh' }} variant="rectangular" width={250} height={300} />
                                    </>}
                                {filterdata.length === 0 && "No items are added yet"}
                                {filterdata && filterdata.length > 0 && filterdata.map((data, index) =>
                                    <>
                                        {Account.email !== data.email &&


                                            <Card sx={{ maxHeight: 370, maxWidth: 250, minWidth: 250, width: '100%', borderRadius: '0px', marginBottom: '2vh' }}>
                                                <Box style={{ backgroundColor: 'black' }}>
                                                    <img
                                                        style={{ height: '200px', width: '250px', objectFit: 'scale-down' }}
                                                        src={data.image}

                                                    />
                                                </Box>
                                                <CardContent>
                                                    <div>
                                                        <div className='Font_card_details'><span className='Span_card'>Name:</span>  {data.name}</div>
                                                        <div className='Font_card_details'><span className='Span_card'>Age:</span>  {data.age}</div>
                                                        <div className='Font_card_details'><span className='Span_card'>Religion:</span>  {data.religion}</div>

                                                    </div>
                                                </CardContent>
                                                <CardActions>
                                                    {data.block === 1 ? <Button onClick={() => blockUser(data.email,1)}>Unblock</Button>:
                                                       <Button onClick={() => blockUser(data.email,0)}>Block this user</Button> }

                                                </CardActions>


                                            </Card>

                                        }

                                    </>
                                )}
                            </div>


                        </div>
                    </div>
                </div>
            </div>



        </>

    )
}

export default AdminDashboard