import React, { useContext, useState } from 'react'
import './userDashboard.css'
import Navbar from '../Navbar/Navbar'
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Drawer, Fade, Skeleton } from '@mui/material';
import { getsubcategory } from '../../service/Api';
import weddingpic from '../../Pics/WeddingPic.png'
import Select from 'react-select'
import { Box } from '@mui/system';
import { AccountContext } from '../../context/AccountProvider';

const UserDashboard = () => {
    const [open, setopen] = useState(false);
    const [selectdata, setselectdata] = useState('');
    const { Account } = useContext(AccountContext);
    const handleopen = async (data) => {

        setselectdata(data);
        setopen(true);
    }
    const handleclose = () => {
        setopen(false);
    }
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, maxWidth: '30vw', width: '30vw', marginTop: '50px', overflowX: 'hidden' }}
            role="presentation"
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                <img
                    style={{ marginTop: '2vh', marginBottom: '3vh', borderRadius: '20px', height: '60vh', width: '30vw ', objectFit: 'scale-down' }}
                    src={selectdata.image}

                />

                <div style={{ marginBottom: '3vh', fontWeight: 'bold', marginLeft: '1vw' }}>Contact details</div>
                <div style={{ marginBottom: '2vh',marginLeft: '1vw' }} >Email: <span style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline' }}>{selectdata.email}</span></div>
                <div style={{ marginBottom: '2vh',marginLeft: '1vw' }}>Phone number : <span style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline' }}>{selectdata.phone}</span></div>
                <div style={{marginBottom: '2vh', marginLeft: '1vw', }} >Description: <span style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline', overflowX: 'scroll' }}>{selectdata.description ? selectdata.description : "NA"}</span></div>
                <div style={{ marginBottom: '2vh',marginLeft: '1vw' }} >Salary: <span style={{ cursor: 'pointer', color: 'grey', textDecoration: 'underline' }}>{selectdata.salary ? selectdata.salary : "NA"}</span></div>

            </div>
        </Box>
    );

    const [filterdata, setfilterdata] = useState([]);
    const [count, setcount] = useState(0);
    const [change, setchange] = useState(true);
    const [age, setage] = useState(1);
    const [gender, setgender] = useState('gender');
    const [religion, setreligion] = useState('religion');
    const agemap = [

        { value: '25', label: 'under 25' },
        { value: '30', label: 'under 30' },
        { value: '35', label: 'under 35' },
        { value: '40', label: 'under 40' },
        { value: '50', label: 'under 50' },

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
        const allItems = async () => {
            const localdata = localStorage.getItem('matrimonialLoginToken');
            const token = JSON.parse(localdata);
            const data = await getsubcategory(age === 1 ? 1 : age.value, gender === 'gender' ? gender : gender.value,
                religion === 'religion' ? religion : religion.value, token);

            setfilterdata(data);


        }



        allItems();



    }, []);



    const postdata = async () => {
        setfilterdata(-1);
        const localdata = localStorage.getItem('matrimonialLoginToken');
        const token = JSON.parse(localdata);
        const data = await getsubcategory(age === 1 ? 1 : age.value, gender === 'gender' ? gender : gender.value,
            religion === 'religion' ? religion : religion.value, token);
        setTimeout(() => {
            setfilterdata(data);
        }, 2000);
    }
    const clearAllFilters = async () => {
        setage(1);
        setreligion('religion');
        setgender('gender')
        setcount(count + 1)
    }
    return (
        <>
            <Navbar />
            <div>
                {['left'].map((anchor) => (
                    <>


                        <Drawer
                            sx={{ zIndex: '1' }}

                            open={open}
                            anchor={anchor}
                            onClose={handleclose}
                        >
                            {list(anchor)}
                        </Drawer>
                    </>
                ))}
            </div>
            <div style={{ display: 'flex', height: '90vh', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50vw' }}>
                    <div className="wrapper">

                        <ul className="dynamic-txts">
                            <li><span>Dream it. </span></li>
                            <li><span>Believe it.</span></li>
                            <li><span>Make it happen.</span></li>


                        </ul>

                    </div>
                </div>
                <div style={{ widht: '50vw', backgroundPosition: 'center' }}>
                    <img style={{ height: '90vh' }} src={weddingpic}></img>

                </div>
            </div>
            <div className='Main_Div_Home'>
                <div className='Accordian_home'>


                    <Select
                        maxMenuHeight={'40vh'}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                width: '20vw',
                                height: '8vh',
                                borderRadius: 'none'
                            }),
                        }}
                        placeholder="Age"
                        defaultValue={age}
                        onChange={setage}
                        options={agemap}
                    />
                    <Select
                        maxMenuHeight={'40vh'}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                width: '20vw',
                                height: '8vh',
                                borderRadius: 'none'
                            }),
                        }}
                        placeholder="Gender"
                        defaultValue={gender}
                        onChange={setgender}
                        options={gendermap}
                    />
                    <Select
                        maxMenuHeight={'60vh'}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                width: '20vw',
                                height: '8vh',
                                borderRadius: 'none'
                            }),
                        }}
                        placeholder="Religion"
                        defaultValue={religion}
                        onChange={setreligion}
                        options={religionmap}
                    />


                    <div className='Accordian_opt'>



                        <div> <Button variant="contained" color="success" style={{ height: '6vh' }} onClick={postdata} >Apply</Button></div>
                        <div> <Button variant="outlined" color="error" style={{ height: '6vh' }} onClick={clearAllFilters} >clear</Button></div>
                    </div>

                </div>
                <div className='Items_Div_Home' style={{ marginLeft: open && '14vw' }}>
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

                                        <Button size="small" onClick={() => handleopen(data)}>Contact</Button>
                                    </CardActions>

                                </Card>

                            }

                        </>
                    )}


                </div>
            </div>
        </>

    )
}

export default UserDashboard