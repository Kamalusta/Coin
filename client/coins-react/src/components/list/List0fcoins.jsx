import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PaginatedItems from "../../PaginatedItems";
// import './styleList.css'

export default function Listofcoins() {
    const params = useParams();
    const navigate = useNavigate();
    const [dataB, setDataB] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/list/${params.category}?${params.query}`)
            .then(res => res.json())
            .then(data => {
                setDataB(data)
            })
    }, []);

    const choosen = (e) => {
        const name = e.target.innerText
        navigate(`/description/${name}/${params.query}/${params.category}`)
    }

    return (
        <>

            {/* <p className="header">List of the coins</p>
            <Link to='/' className="goBackHome">Homepage</Link><span className="goBackHome">-List of the coins</span><br />
            <div className="inputfield">
                <label >Input field</label><br />
                <input type="text" disabled="true" /> <button>Search</button><br />
            </div>

            <div className="listCoin">
                {dataB.map((item) => (
                    <div className="coins-page2" key={item.id}>
                        <img className="listImg" src={item.coinpic} alt="coinimage" ></img>
                        <div className="coinabout">
                            <h4 onClick={(e) => choosen(e)} >{item.coinname}</h4>
                            <p>{item.about}</p>
                        </div>
                    </div>
                ))}
            </div> */}
            <PaginatedItems itemsPerPage={4} data={dataB} params1={params.query} params2={params.category} />
        </>
    )
}