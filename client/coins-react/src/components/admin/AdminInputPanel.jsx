import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './styleinput.css';


export default function AdminInputPanel() {
    const navigate = useNavigate();
    const params = useParams()
    const [inputstate, setInputstate] = useState({ id: "", coinname: "", category: "", coinyear: "", price: "", coincountry: "", composition: "", about: "", about2: "", quality: "", weight: "", coinpic: "", coinpic2: "", denomination: "rthg", deleted: "1" })

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3001/inputcoin", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(inputstate)
        })
        navigate('/adminpanel');
    }
    const handleChange = event => {
        setInputstate({ ...inputstate, [event.target.id]: event.target.value })
    }

    useEffect(() => {
        params.id && fetch(`http://localhost:3001/editcoin/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setInputstate({ id: data[0].id, coinname: data[0].coinname, category: data[0].category, coinyear: data[0].coinyear, price: data[0].price, coincountry: data[0].coincountry, composition: data[0].composition, about: data[0].about, about2: data[0].about2, quality: data[0].quality, weight: data[0].weight, coinpic: data[0].coinpic, coinpic2: data[0].coinpic2 })
            })

    }, [])
    return (
        <div className='inputpanel'>
            <p className='header'>Admin panel</p>
            <form className='input-form' action="" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="">Coin name</label><br />
                    <input value={inputstate.coinname} id='coinname' type="text" onChange={handleChange} required /><br />

                    <label htmlFor="">Face value</label><br />
                    <input value={inputstate.category} id='category' type="text" onChange={handleChange} /><br />

                    <label htmlFor="">Year of issue</label><br />
                    <input value={inputstate.coinyear} id='coinyear' type="text" onChange={handleChange} /><br />

                    <label htmlFor="">Price</label><br />
                    <input value={inputstate.price} id='price' type="text" onChange={handleChange} required /><br />

                    <label htmlFor="">Country</label><br />
                    <input value={inputstate.coincountry} id='coincountry' type="text" onChange={handleChange} required /><br />

                    <label htmlFor="">Metal</label><br />
                    <input value={inputstate.composition} id='composition' type="text" onChange={handleChange} /><br />
                </div>
                <div>
                    <label htmlFor="">Short description</label><br />
                    <input value={inputstate.about} id='about' className='description' type="text" onChange={handleChange} required /><br />

                    <label htmlFor="">Long description</label><br />
                    <input value={inputstate.about2} id='about2' className='description' type="text" onChange={handleChange} /><br />

                    <label htmlFor="">Quality of the coin</label><br />
                    <input value={inputstate.quality} id='quality' type="text" onChange={handleChange} /><br />

                    <label htmlFor="">Weight</label><br />
                    <input value={inputstate.weight} id='weight' type="text" onChange={handleChange} /><br />
                </div>
                <div className='input-button'>
                    <div>
                        <label htmlFor="">Link to obverse image</label><br />
                        <input value={inputstate.coinpic} id='coinpic' type="text" onChange={handleChange} /><br />

                        <label htmlFor="">Link to reverse image</label><br />
                        <input value={inputstate.coinpic2} id='coinpic2' type="text" onChange={handleChange} /><br />
                    </div>
                    <div>
                        <button type='submit'>Save</button>
                        <button className='button' onClick={() => { navigate('/adminpanel') }}>Cancel</button>
                    </div>

                </div>
            </form>

        </div>
    )
}