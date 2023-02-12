import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Homepage2 from "./Homepage2";

export default function Homepage1() {
    const navigate = useNavigate();
    const [dataP, setDataP] = useState(null);
    const [dataP2, setDataP2] = useState(null);
    const [dataP3, setDataP3] = useState(null);
    const [state, setState] = useState(false);
    const [search, setSearch] = useState("")

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
    const advance = () => {
        setState(!state)
    }
    const handleClick = (e) => {
        navigate(`/list/name=${search}`)
    }
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    if (!state) {
        return (
            <>
                <h1>Homepage</h1>
                <label >Input field</label><br />
                <input type="text" onChange={(e) => handleChange(e)} /> <button onClick={(e) => handleClick(e)} >Search</button><br />
                <Link to='/home' onClick={() => advance()}>Advanced filter ^</Link>

                <div className="coins-page">
                    <div>
                        <h2>Bullion coins</h2>
                        <Link className="showall" to='/listtype/Bullion coins'>show all </Link><br />
                        <img src={dataP} alt="coinimage" ></img>
                        {/* <p>{dataC === null ? 'Loading...' : dataC}</p> */}
                    </div>
                    <div>
                        <h2>Exclusive coins</h2>
                        <Link className="showall" to='/listtype/Exclusive coins'>show all </Link><br />
                        <img src={dataP2} alt="coinimage" ></img>
                    </div>
                    <div>
                        <h2>Commemorative coins</h2>
                        <Link className="showall" to='/listtype/Commemorative coins'>show all </Link><br />
                        <img src={dataP3} alt="coinimage" />
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <Homepage2 />
        )
    }
}