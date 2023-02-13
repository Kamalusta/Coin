import { useState } from "react";
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import './styleDes.css'

export default function Description() {
    const params = useParams();
    const [dataC, setDataC] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/list/withname?name=${params.name}`)
            .then(res => res.json())
            .then(data => {
                setDataC(data)
            })
    }, []);
    return (
        <div className="card-page">
            {dataC.map((item) => (
                <div className="card" key={item.id}>
                    <div className="card-img">
                        <img src={item.coinpic} alt="uz" /><br />
                        <img src={item.coinpic2} alt="arxa" />
                    </div>
                    <div className="about">
                        <div >
                            <h2>{item.coinname}</h2>
                            <p>{item.about}</p>
                            <p>{item.about2}</p>
                            <table>
                                <tbody>
                                    <tr><td>Issuing Country</td><td>{item.coincountry}</td></tr>
                                    <tr><td>Composition</td><td>{item.composition}</td></tr>
                                    <tr><td>Quality</td><td>{item.quality}</td></tr>
                                    <tr><td>Denomination</td><td>{item.denomination}</td></tr>
                                    <tr><td>Year</td><td>{item.coinyear}</td></tr>
                                    <tr><td>Weight</td><td>{item.weight}</td></tr>
                                    <tr><td>Price</td><td>{item.price}+ $</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <Link to={`/list/${params.category}/${params.backlist}`}>Back to the list</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}