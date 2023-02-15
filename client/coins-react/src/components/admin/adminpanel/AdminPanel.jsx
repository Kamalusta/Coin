import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styleadminpanel.css';



export default function AdminPanel() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const handleMouseDown = (e) => {
        e.target.classList.add('active');
    };
    const handleMouseUp = (e) => {
        e.target.classList.remove('active');

    };
    const handleDelete = (e) => {
        fetch(`http://localhost:3001/delete/${e.target.id}`, {
            method: 'DELETE',
        })
        window.location.reload()
    }
    const handleEdit = (e) => {
        navigate(`/inputcoin/${e.target.id}`)

    }

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
                <input type="text" disabled={true} /> <button>Search</button><br />
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
                        <button className='button'
                            id={item.id}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onClick={handleEdit}>Edit</button>
                        <button className='button'
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp} id={item.id} onClick={(e) => handleDelete(e)}>Delete</button>
                    </div>
                ))}
                <div className='add-link'>
                    <div className='addcoin'>+</div>
                    <Link to={'/inputcoin'}>Add a new coin</Link>
                </div>

            </div>

        </div>
    )
}