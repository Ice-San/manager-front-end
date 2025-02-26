import { Link } from 'react-router';

import '../../styles/index.css';
import '../../styles/media-querys.css';

import { IconsContainer } from '../../../../assets/components/img-container';

type authTypes = {
    isSignIn: boolean
};

export const Auth = ({isSignIn}: authTypes) => {
    function signUpCode() {
        if(!isSignIn) {
            return (
                <>
                    <div className="label">
                        <IconsContainer imgSize="icons-size" imgUrl="email-icon" />
                        <p>Email</p>
                    </div>
                    <input className='inputs' type="email" placeholder='userTest@gmail.com' />

                    <div className="label">
                        <IconsContainer imgSize="icons-size" imgUrl="username-icon" />
                        <p>Username</p>
                    </div>
                    <input className='inputs' type="text" placeholder='rainbow350' />

                    <div className="label">
                        <IconsContainer imgSize="icons-size" imgUrl="password-icon" />
                        <p>Password</p>
                    </div>
                    <input className='inputs' type="password" placeholder='****' />

                    <div className="label">
                        <IconsContainer imgSize="icons-size" imgUrl="password-icon" />
                        <p>Confirm Password</p>
                    </div>
                    <input className='inputs' type="password" placeholder='****' />

                    <div className="submit-btn">
                        <input type="submit" value="Sign Up" />
                        <p>Have a account? <Link to="/signin">SignIn!</Link></p>
                    </div>
                </>
            );
        }

        if(isSignIn) {
            return (
                <>
                    <div className="label">
                        <IconsContainer imgSize="icons-size" imgUrl="email-icon" />
                        <p>Email</p>
                    </div>
                    <input className='inputs' type="email" placeholder='userTest@gmail.com' />

                    <div className="label">
                        <IconsContainer imgSize="icons-size" imgUrl="password-icon" />
                        <p>Password</p>
                    </div>
                    <input className='inputs' type="password" placeholder='****' />

                    <div className="submit-btn">
                        <input type="submit" value="Sign In" />
                        <p>Don't have a account? <Link to="/signup">SignUp!</Link></p>
                    </div>
                </>
            );
        }
    }

    return (
        <div className="background">
            <div className="background-container divs-container">
                <div className="overlay">
                    <div className="auth-box">
                        <IconsContainer imgSize="logo-size" imgUrl="logo-img" />

                        <form action="">
                            {signUpCode()}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};