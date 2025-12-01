import './Login.css'
import PrimaryLogoLight from '../../assets/Logo/Logo_Primary_Dark.png'
import { FaUser, FaLock } from 'react-icons/fa';

export default function Login() {
    return (
        <div className='LoginSection'>
          <div className='LoginForm'>
            <img src={PrimaryLogoLight} alt="Primary Logo" className='LoginLogo' />
              <div className='LoginInputGroup'>
                <div className='LoginInput'>
                  <FaUser className='LoginIcon' />
                  <input type="text" placeholder='username' className='LoginInputTextfield' />
                </div>
                <div className='LoginInput'>
                  <FaLock className='LoginIcon' />
                  <input type="password" placeholder='******' className='LoginInputTextfield'/>
                </div>
                <a href="#" className='p1 txt-color-primary'>lupa password</a>
            </div>
            <div className='AlignCenter'>
            <button className='button-primary'>Masuk</button>
            <p className='p1'>belum punya akun? <a href="/register" className='p1 txt-color-primary'>buat akun</a></p>
            </div>
          </div>
        </div>
      );
}