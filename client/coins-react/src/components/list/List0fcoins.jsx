import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PaginatedItems from "./PaginatedItems";

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

    // const choosen = (e) => {
    //     const name = e.target.innerText
    //     navigate(`/description/${name}/${params.query}/${params.category}`)
    // }

    return (
        <div >
            <PaginatedItems itemsPerPage={4} data={dataB} params1={params.query} params2={params.category} />
        </div>
    )
}