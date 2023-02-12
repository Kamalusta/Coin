import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Homepage1() {
    const navigate = useNavigate();
    const [dataP, setDataP] = useState(null);
    const [dataP2, setDataP2] = useState(null);
    const [dataP3, setDataP3] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/home")
            .then(res => res.json())
            .then(data => {
                setDataP(data[0].coinpic)
                setDataP2(data[1].coinpic)
                setDataP3(data[2].coinpic)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <h1>Homepage</h1>
            <label htmlFor="">Input field</label><br />
            <input type="text" /> <button onClick={() => navigate('/list')}>Search</button><br />
            <Link to='/search'>Advanced filter ^</Link>
            <div className="coins-page">
                <div>
                    <h2>Bullion coins</h2>
                    <Link className="showall" to='/list/Bullion coins'>show all </Link><br />
                    <img src={dataP} alt="coinimage" ></img>
                    {/* <p>{dataC === null ? 'Loading...' : dataC}</p> */}
                </div>
                <div>
                    <h2>Exclusive coins</h2>
                    <Link className="showall" to='/list/Exclusive coins'>show all </Link><br />
                    <img src={dataP2} alt="coinimage" ></img>
                </div>
                <div>
                    <h2>Commemorative coins</h2>
                    <Link className="showall" to='/list/Commemorative coins'>show all </Link><br />
                    <img src={dataP3} alt="coinimage" />
                </div>
            </div>
        </>
    )
}