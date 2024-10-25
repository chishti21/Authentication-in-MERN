import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const response = await axios.get('http://localhost:3001/protected', { withCredentials: true });
                console.log(response.data);
                setLoading(false); 
            } catch (err) {
                console.error(err);
                setError('You are not authorized. Please log in.');
                navigate('/'); 
            }
        };

        checkToken();
    }, [navigate]);


    const logout=()=>{
      axios.post('http://localhost:3001/logout',{},{withCredentials:true})
      .then((response)=>{
        navigate('/login')
      }).catch((err)=>{
        alert("logout error")
      })
    }
    return (
        <div>
            Home page
            <button onClick={logout}>Logout</button>
        </div>
    );
}