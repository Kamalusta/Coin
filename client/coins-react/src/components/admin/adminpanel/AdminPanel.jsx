import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styleadminpanel.css';


export default function AdminPanel() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/home")
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <p className='header'>Admin panel</p>

            <div className="inputfield">
                <label >Input field</label><br />
                <input type="text" disabled="true" /> <button>Search</button><br />
            </div>
            {/* <Link to='/home'>Advanced filter ^</Link> */}
            <div className="adminlistCoin">
                {data.map((item) => (
                    <div className="coins-page2" key={item.id}>
                        <img className="listImg" src={item.coinpic} alt="coinimage" ></img>
                        <div className="coinabout">
                            <h4  >{item.coinname}</h4>
                            <p>{item.about}</p>
                        </div>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                ))}
            </div>

        </div>
    )
}