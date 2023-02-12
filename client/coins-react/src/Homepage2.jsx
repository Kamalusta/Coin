import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Homepage1 from "./Homepage1";

export default function Homepage2() {
    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState([]);
    const [state, setState] = useState(true);

    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOption1, setSelectedOption1] = useState("");
    const [selectedOption2, setSelectedOption2] = useState("");
    const [priceFrom, setPriceFrom] = useState(0)
    const [priceTo, setPriceTo] = useState(10000)
    const [yearFrom, setYearFrom] = useState(0)
    const [yearTo, setYearTo] = useState(10000)
    const [search, setSearch] = useState("")

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
    useEffect(() => {
        fetch("http://localhost:3001/home")
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, []);

    // const [searchParams, setSearchParams] = useSearchParams();
    // console.log(searchParams.get('query'))
    const advance = () => {
        setState(!state)
    }

    const handleSubmit = (e) => {
        // e.preventDefault();
        // if (!search)
        //     navigate(`/list/name=${search}`)
        // else
        navigate(`/list/country=${selectedOption}&metal=${selectedOption1}&quality=${selectedOption2}&priceF=${priceFrom}&priceT=${priceTo}&yearF=${yearFrom}&yearT=${yearTo}`);
    }
    const searChange = (e) => {
        setSearch(e.target.value)
    }
    if (state) {
        return (
            <>
                <form onSubmit={() => handleSubmit()}>
                    <h1>Homepage</h1>
                    <label >Input field</label><br />
                    <input type="text" onChange={(e) => searChange(e)} />
                    <button type="submit" >Search</button><br />
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
                                <option value="The Republic of Vietnam ">The Republic of Vietnam</option>
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
                        <div>
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
    else {
        return (<Homepage1 />)

    }
}