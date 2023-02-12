import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

export default function Listofcoins() {
    const params = useParams();
    const [dataB, setDataB] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/list/${params.type}`)
            .then(res => res.json())
            .then(data => {
                setDataB(data)
            })
    }, []);

    return (
        <>
            <h1>List of the coins</h1>
            <Link to='/home'>Homepage</Link><span>-List of the coins</span><br />
            <label >Input field</label><br />
            <input type="text" /> <button>Search</button><br />
            <Link to='/search'>Advanced filter ^</Link>
            {dataB.map((item) => (
                <div className="coins-page2">
                    <img src={item.coinpic} alt="coinimage" ></img>
                    <div className="coinabout">
                        <h4>{item.coinname}</h4>
                        <p>{item.about}</p>
                    </div>
                </div>
            ))}
        </>
    )
}