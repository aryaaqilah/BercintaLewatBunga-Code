import './Register.css'
import PrimaryLogoLight from '../../assets/Logo/Logo_Primary_Dark.png'
import { FaUser, FaLock } from 'react-icons/fa';

export default function Register() {
    return (
        <div className='RegisterSection'>
          <div className='RegisterForm'>
            <img src={PrimaryLogoLight} alt="Primary Logo" className='RegisterLogo' />
              <div className='RegisterInputGroup'>
                <div className='RegisterInput'>
                  <FaUser className='RegisterIcon' />
                  <input type="text" placeholder='username' className='RegisterInputTextfield' />
                </div>
                <div className='RegisterInput'>
                  <FaLock className='RegisterIcon' />
                  <input type="password" placeholder='******' className='RegisterInputTextfield'/>
                </div>
                <div className='RegisterInput'>
                  <FaLock className='RegisterIcon' />
                  <input type="password" placeholder='******' className='RegisterInputTextfield'/>
                </div>
            </div>
            <div className='AlignCenter'>
            <button className='button-primary'>Buat</button>
            <p className='p1'>sudah punya akun? <a href="/login" className='p1 txt-color-primary'>masuk ke akun saya</a></p>
            </div>
          </div>
        </div>
      );
}