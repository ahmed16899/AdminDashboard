import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { environment } from '../../api';
import { useNavigate } from "react-router-dom";
import Chart from 'chart.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, PieChart, Pie, Cell } from 'recharts';
import CircularProgress from '@mui/material/CircularProgress';

const Dashboard = () => {
    const isAuth = useSelector(state => state.isAuth.isAuth)
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#8dd1e1', '#82ca9d', '#a4de6c'];
    const [checkLoader, setcheckLoader] = useState(true);

    useEffect(() => {
        if (!isAuth) {
            navigate('/auth/signin');
        }
        else {
            axios.get(`${environment.ApiUrl}/departmentsFrequency`).then((res) => {
                console.log(res.data)
                setDoctors((oldState) => {
                    return [...res.data.deptFrequency]
                })
            })
            axios.get(`${environment.ApiUrl}/doctorsFrequency`).then((res) => {
                console.log(res.data.doctorFrequency)
                setDepartments((oldState) => {
                    return [...res.data.doctorFrequency]
                })
                setcheckLoader(false)
            })
        }
    }, [isAuth])





    return (
        <>
            {checkLoader && <div className='d-flex justify-content-center'>
                <CircularProgress />
            </div>}

            {!checkLoader &&
                <><h2 className='text-center my-5'>Departments</h2>
                    <BarChart className=' mx-auto'
                        width={1000}
                        height={400}
                        data={doctors}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name">
                            <Label value="Department" offset={-10} position="insideBottomRight" />
                        </XAxis>
                        <YAxis>
                            <Label value="Frequency" angle={-90} position="insideLeft" />
                        </YAxis>

                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>

                    <h2 className='text-center my-5'>Doctors</h2>
                    <PieChart width={1000} height={400} className='mx-auto my-4'>
                        <Pie
                            data={departments}
                            cx={400}
                            cy={200}
                            labelLine={false}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {departments.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart></>
            }
        </>

    );
};

export default Dashboard;


