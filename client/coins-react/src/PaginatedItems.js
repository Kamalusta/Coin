import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import './styleList.css'


function Items({ currentItems, params1, params2 }) {
    const navigate = useNavigate();
    const choosen = (e) => {
        const name = e.target.innerText
        navigate(`/description/${name}/${params1}/${params2}`)
    }
    return (
        <>
            <p className="header">List of the coins</p>
            <Link to='/' className="goBackHome">Homepage</Link><span className="goBackHome">-List of the coins</span><br />
            <div className="inputfield">
                <label >Input field</label><br />
                <input type="text" disabled="true" /> <button>Search</button><br />
            </div>
            <div className="listCoin">
                {currentItems && currentItems.map((item) => (
                    <div className="coins-page2" key={item.id}>
                        <img className="listImg" src={item.coinpic} alt="coinimage" ></img>
                        <div className="coinabout">
                            <h4 onClick={(e) => choosen(e)} >{item.coinname}</h4>
                            <p>{item.about}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default function PaginatedItems({ itemsPerPage, data, params1, params2 }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % data.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} params1={params1} params2={params2} />
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    );
}