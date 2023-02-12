import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './styleHome.css'



export default function Home() {
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
                //setDataP(data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const advance = () => {
        setState(!state)
    }
    const handleClick = (e) => {
        navigate(`/list/withname/name=${search}`)
    }

    const params = useParams();


    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOption1, setSelectedOption1] = useState("");
    const [selectedOption2, setSelectedOption2] = useState("");
    const [priceFrom, setPriceFrom] = useState(0)
    const [priceTo, setPriceTo] = useState(10000)
    const [yearFrom, setYearFrom] = useState(0)
    const [yearTo, setYearTo] = useState(10000)
    // const [search, setSearch] = useState("")

    const handleChange = event => {
        setSelectedOption(event.target.value)
    };
    const handleChange1 = event => {
        setSelectedOption1(event.target.value)
    };
    const handleChange2 = event => {
        setSelectedOption2(event.target.value)
    }
    const handlePriceFrom = event => {
        setPriceFrom(event.target.value)
    }
    const handlePriceTo = event => {
        setPriceTo(event.target.value)
    }
    const handleYearFrom = event => {
        setYearFrom(event.target.value)
    }
    const handleYearTo = event => {
        setYearTo(event.target.value)
    }

    const handleSubmit = (e) => {
        navigate(`/list/search/country=${selectedOption}&metal=${selectedOption1}&quality=${selectedOption2}&priceF=${priceFrom}&priceT=${priceTo}&yearF=${yearFrom}&yearT=${yearTo}`);
    }
    const searChange = (e) => {
        setSearch(e.target.value)
    }
    const goAdminLogin = () => {
        navigate('/admin')
    }

    if (!state) {
        return (
            <>
                <div className="admin-button"><h1>Homepage</h1> <button onClick={() => goAdminLogin()}>admin</button></div>
                <label >Input field</label><br />
                <input type="text" onChange={(e) => searChange(e)} /> <button onClick={(e) => handleClick(e)} >Search</button><br />
                <Link to='/home' onClick={() => advance()}>Advanced filter ^</Link>

                <div className="coins-page">
                    <div>
                        <h2>Bullion coins</h2>
                        <Link className="showall" to='/list/group/category=Bullion coins'>show all {'>'}</Link><br />
                        <img src={dataP} alt="coinimage" ></img>
                        {/* <p>{dataC === null ? 'Loading...' : dataC}</p> */}
                    </div>
                    <div>
                        <h2>Exclusive coins</h2>
                        <Link className="showall" to='/list/group/category=Exclusive coins'>show all {'>'}</Link><br />
                        <img src={dataP2} alt="coinimage" ></img>
                    </div>
                    <div>
                        <h2>Commemorative coins</h2>
                        <Link className="showall" to='/list/group/category=Commemorative coins'>show all {'>'}</Link><br />
                        <img src={dataP3} alt="coinimage" />
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <form onSubmit={() => handleSubmit()}>
                    <h1>Homepage</h1>
                    <label >Input field</label><br />
                    <input type="text" disabled="true" onChange={(e) => searChange(e)} /> <button type="submit" >Search</button><br />
                    <Link to='/home' onClick={() => advance()}>Advanced filter</Link>
                    <div className="homepage2">
                        <div>
                            <label>Issuing country</label><br />
                            <select value={selectedOption} onChange={handleChange}>
                                {/* {data.map((item) => (
                                <option value={item.coincountry}>{item.coincountry}</option>
                            ))} */}
                                <option value="">Chose option</option>
                                <option value="CANADA">Canada</option>
                                <option value="India">India</option>
                                <option value="The Republic of Vietnam">The Republic of Vietnam</option>
                            </select><br />

                            <label>Metal</label><br />
                            <select value={selectedOption1} onChange={handleChange1}>
                                {/* {data.map((item) => (
                                <option value={item.composition}>{item.composition}</option>
                            ))} */}
                                <option value="">Chose option</option>
                                <option value="nickel">nickel</option>
                                <option value="steel">steel</option>
                                <option value="gold">gold</option>
                            </select><br />

                            <label>Quality of the coin</label><br />
                            <select value={selectedOption2} onChange={handleChange2}>
                                {/* {data.map((item) => (
                                <option value={item.quality}>{item.quality}</option>
                            ))} */}
                                <option value="">Chose option</option>
                                <option value="BU">BU</option>
                            </select>

                        </div>
                        <div className="searcher">
                            <label>Price</label><br />
                            <span>from</span><input type="number" onChange={handlePriceFrom}></input> <span>to</span><input type="number" onChange={handlePriceTo}></input><br />

                            <label>Year of issue</label><br />
                            <span>from</span><input type="number" onChange={handleYearFrom}></input> <span>to</span><input type="number" onChange={handleYearTo}></input>
                        </div>

                    </div>
                </form>
            </>
        )
    }
}
