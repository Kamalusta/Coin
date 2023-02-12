import { useNavigate } from 'react-router-dom';
import './styleadmin.css';

export default function AdminLogin() {
    const navigate = useNavigate()
    const adminPanel = () => {
        navigate('/adminpanel')
    }
    return (
        <div>
            <p className='header'>Admin panel</p>
            <div className="login">

                <div className='input'>
                    <label htmlFor="">Login</label><br />
                    <input type="text" /><br />
                    <label htmlFor="">Pasword</label><br />
                    <input type="text" /><br />
                </div>
                <div className='panel-button'>
                    <button onClick={() => adminPanel()}>Login</button>
                </div>
            </div>
        </div>
    )

}