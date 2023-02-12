import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function Homepage2() {
    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState([]);

    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOption1, setSelectedOption1] = useState("");
    const [selectedOption2, setSelectedOption2] = useState("");
    const handleChange = event => {
        setSelectedOption(event.target.value)
    };
    const handleChange1 = event => {
        setSelectedOption1(event.target.value)
    };
    const handleChange2 = event => {
        setSelectedOption2(event.target.value)
    }
    useEffect(() => {
        fetch("http://localhost:3001/home")
            .then(res => res.json())
            .then(data => {
                setData(data)
            })


    }, []);

    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get('query'))


    return (
        <>
            <h1>Homepage</h1>
            <label >Input field</label><br />
            <input type="text" /> <button onClick={() => navigate(`/list/${selectedOption}`)}>Search</button><br />
            <Link to='/home'>Advanced filter</Link>
            <div className="homepage2">
                <div>

                    <label>Issuing country</label><br />
                    <select value={selectedOption} onChange={handleChange}>
                        {data.map((item) => (
                            <option value={item.coincountry}>{item.coincountry}</option>
                        ))}
                    </select><br />

                    <label>Metal</label><br />
                    <select value={selectedOption1} onChange={handleChange1}>
                        {data.map((item) => (
                            <option value={item.composition}>{item.composition}</option>
                        ))}
                    </select><br />

                    <label>Quality of the coin</label><br />
                    <select value={selectedOption2} onChange={handleChange2}>
                        {data.map((item) => (
                            <option value={item.quality}>{item.quality}</option>
                        ))}
                    </select>

                </div>
                <div>
                    <label>Price</label><br />
                    <span>from</span><input type="text"></input> <span>to</span><input type="text"></input><br />

                    <label>Year of issue</label><br />
                    <span>from</span><input type="text"></input> <span>to</span><input type="text"></input>
                </div>
            </div>
        </>
    )
}