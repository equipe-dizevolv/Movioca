import { Link } from 'react-router-dom'
import { useShowPassword } from '../hooks/useInteractions'

/**
 * SignIn Page - Página de login
 * Conversão fiel da página sign-in.html original
 */
function SignIn() {
  const { showPassword, togglePasswordVisibility } = useShowPassword()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Redirecionar para dashboard
    window.location.href = '/'
  }

  return (
    <div id="wrapper">
      <div id="page" className="">
        <div className="sign-in-wrap">
          <div className="sign-in-box">
            <div className="left">
              <div className="content">
                <h3 className="heading">
                  Hello Kampbail 
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_779_1111)">
                      <mask id="mask0_779_1111" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                        <path d="M0.5 0.500002H24.5V24.5H0.5V0.500002Z" fill="white"/>
                      </mask>
                      <g mask="url(#mask0_779_1111)">
                        <path d="M23.5939 17.3019V8.8583C23.5939 7.75196 22.6971 6.85505 21.5907 6.85505C20.4843 6.85505 19.5874 7.75196 19.5874 8.8583V10.931L14.1596 5.50318C13.4815 4.82504 12.382 4.82504 11.7038 5.50318C11.0256 6.18137 11.0256 7.28082 11.7038 7.95901L10.464 6.71931C9.7859 6.04117 8.6864 6.04117 8.00821 6.71931C7.33007 7.39745 7.33007 8.49695 8.00821 9.17509L8.72596 9.89284C8.04782 9.2147 6.94832 9.2147 6.27013 9.89284C5.59199 10.571 5.59199 11.6705 6.27013 12.3487L8.04135 14.1199C7.36316 13.4417 6.26366 13.4417 5.58552 14.1199H5.58547C4.90738 14.798 4.90738 15.8976 5.58547 16.5757L11.0532 22.0434C13.8599 24.8501 18.4107 24.8501 21.2174 22.0434L21.9219 21.3389C23.0366 20.2242 23.5939 18.7632 23.5939 17.3022V17.3019Z" fill="#ECFF79"/>
                        <path d="M8.29643 14.375L8.04138 14.12L7.40998 13.717C6.79512 13.4926 6.07887 13.6266 5.58556 14.12C4.90742 14.7981 4.90737 15.8976 5.58551 16.5758C5.58551 16.5758 7.75981 18.75 8.96192 19.9521C7.86326 18.0498 7.64215 15.6896 8.29643 14.375Z" fill="#ECFF79"/>
                        <path d="M6.27008 12.3489L7.22103 13.2998C7.05055 12.772 6.63411 10.6516 7.36799 9.38977C6.96786 9.41963 6.57603 9.58707 6.27008 9.89302C5.59194 10.5712 5.59194 11.6707 6.27008 12.3489Z" fill="#ECFF79"/>
                        <path d="M23.5939 9.40393V8.8583C23.5939 7.75196 22.697 6.8551 21.5907 6.8551C20.4843 6.8551 19.5874 7.75196 19.5874 8.8583V10.931L14.1596 5.50318C13.4815 4.82504 12.382 4.82504 11.7038 5.50318V5.50322C11.0256 6.18136 11.0256 7.28086 11.7038 7.959L10.464 6.7193C9.7859 6.04116 8.6864 6.04116 8.00821 6.7193C7.33007 7.39744 7.33007 8.49694 8.00821 9.17513L8.72596 9.89283C8.04782 9.21469 6.94832 9.21469 6.27013 9.89288C5.59199 10.571 5.59199 11.6705 6.27013 12.3487L8.04135 14.1199C7.36316 13.4417 6.26366 13.4417 5.58552 14.1199H5.58547C4.90738 14.7981 4.90738 15.8976 5.58547 16.5757L10.6509 21.6411" stroke="#161326" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.9202 22.7841C14.7303 24.8235 18.6841 24.5766 21.2173 22.0433L21.9217 21.3389C23.0364 20.2242 23.5938 18.7632 23.5938 17.3022V17.3019V11.0796" stroke="#161326" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.7036 7.95878L15.0691 11.3242" stroke="#161326" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.72583 9.89287L12.6528 13.8198" stroke="#161326" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.04126 14.1199L10.6318 16.7104" stroke="#161326" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.2498 3.32038C16.3754 3.55072 17.2688 4.41833 17.5368 5.52979" stroke="#161326" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.4443 0.851379C17.7084 1.31469 19.5056 3.0598 20.0445 5.29541" stroke="#161326" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.875 18.0499C4.10534 19.1755 4.97295 20.069 6.08441 20.3369" stroke="#161326" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1.40625 18.2446C1.86952 20.5087 3.61462 22.3059 5.85028 22.8447" stroke="#161326" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17.8508 17.9233C17.1709 16.3547 17.284 14.5248 18.1901 13.043" stroke="#161326" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_779_1111">
                        <rect width="24" height="24" fill="white" transform="translate(0.5 0.5)"/>
                      </clipPath>
                    </defs>
                  </svg>
                </h3>
                <div className="sub f12-regular text-GrayDark">Welcome again to our website</div>
                <div className="sign-in-inner">
                  <h4>Sign In Here</h4>
                  <form className="form-login flex flex-column gap24" acceptCharset="utf-8" onSubmit={handleSubmit}>
                    <fieldset className="email">
                      <div className="f14-regular mb-6">Email here</div>
                      <input className="flex-grow" type="email" placeholder="Enter your email address" name="email" tabIndex="0" defaultValue="keplamdusa@gmail.com" aria-required="true" required />
                    </fieldset>
                    <fieldset className="password">
                      <div className="f14-regular mb-6">Password here</div>
                      <input 
                        className="password-input" 
                        type={showPassword['signin-password'] ? 'text' : 'password'} 
                        placeholder="Enter your password" 
                        name="password" 
                        tabIndex="0" 
                        defaultValue="12345" 
                        aria-required="true" 
                        required 
                      />
                      <span 
                        className="show-pass" 
                        onClick={() => togglePasswordVisibility('signin-password')}
                        style={{ cursor: 'pointer' }}
                      >
                        <i className={`icon-view view ${showPassword['signin-password'] ? '' : 'active'}`}></i>
                        <i className={`icon-hide hide ${showPassword['signin-password'] ? 'active' : ''}`}></i>
                      </span>
                    </fieldset>
                    <div className="tf-cart-checkbox">
                      <div className="tf-checkbox-wrapp">
                        <input className="checkbox-item" type="checkbox" name="transaction_checkbox" defaultChecked />
                        <div>
                          <i className="icon-check"></i>
                        </div>
                      </div>
                      <div className="f14-regular">
                        By proceeding, you agree to the 
                        <a href="#" className="f14-bold"> Terms and Conditions</a>
                      </div>
                    </div>
                    <button className="tf-button style-1 label-01 w-100" type="submit">Sign In</button>
                  </form>
                  <div>
                    <div className="f14-regular mb-6">Google sign in</div>
                    <Link to="/" className="f14-regular btn-signin-with">
                      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_779_1269)">
                          <path d="M23.5938 10.4136L13.8044 10.4131C13.3721 10.4131 13.0217 10.7634 13.0217 11.1957V14.323C13.0217 14.7552 13.3721 15.1056 13.8044 15.1056H19.3171C18.7135 16.6722 17.5868 17.9842 16.1493 18.8178L18.5 22.887C22.2707 20.7062 24.5 16.8799 24.5 12.5965C24.5 11.9866 24.455 11.5506 24.3651 11.0597C24.2968 10.6867 23.9729 10.4136 23.5938 10.4136Z" fill="#167EE6"/>
                          <path d="M12.5 19.8042C9.80218 19.8042 7.44699 18.3302 6.18207 16.1489L2.11304 18.4943C4.18374 22.0831 8.06283 24.4998 12.5 24.4998C14.6768 24.4998 16.7307 23.9138 18.5 22.8924V22.8868L16.1494 18.8176C15.0742 19.4412 13.8299 19.8042 12.5 19.8042Z" fill="#2BC155"/>
                          <path d="M18.5 22.8927V22.8871L16.1494 18.8179C15.0741 19.4414 13.83 19.8044 12.5 19.8044V24.5001C14.6767 24.5001 16.7308 23.914 18.5 22.8927Z" fill="#2BC155"/>
                          <path d="M5.19566 12.4998C5.19566 11.17 5.55856 9.92589 6.18205 8.85071L2.11302 6.50537C1.08603 8.26914 0.5 10.3175 0.5 12.4998C0.5 14.6821 1.08603 16.7304 2.11302 18.4942L6.18205 16.1489C5.55856 15.0737 5.19566 13.8296 5.19566 12.4998Z" fill="#FFD500"/>
                          <path d="M12.5 5.19566C14.2593 5.19566 15.8753 5.82078 17.1375 6.86061C17.4488 7.11711 17.9014 7.09859 18.1867 6.81336L20.4024 4.59758C20.7261 4.27395 20.703 3.74422 20.3573 3.44431C18.2425 1.60967 15.491 0.5 12.5 0.5C8.06283 0.5 4.18374 2.91673 2.11304 6.50558L6.18207 8.85092C7.44699 6.66969 9.80218 5.19566 12.5 5.19566Z" fill="#FF4B26"/>
                          <path d="M17.1374 6.86061C17.4488 7.11711 17.9015 7.09859 18.1866 6.81336L20.4024 4.59758C20.726 4.27395 20.7029 3.74422 20.3573 3.44431C18.2425 1.60963 15.491 0.5 12.5 0.5V5.19566C14.2592 5.19566 15.8752 5.82078 17.1374 6.86061Z" fill="#D93F21"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_779_1269">
                            <rect width="24" height="24" fill="white" transform="translate(0.5 0.5)"/>
                          </clipPath>
                        </defs>
                      </svg>
                      Sign in with Google
                    </Link>
                  </div>
                  <div className="f14-regular">
                    Don't have an account? 
                    <Link to="/sign-up" className="f14-bold"> Sign Up</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <img src="/images/item/bg-sign-in.jpg" alt="" />
              <div className="text">
                <img src="/images/item/sign-in.png" alt="" />
                <h3 className="mb-24 text-White">Buy & sell Each Digital <br />Cryptocurrency</h3>
                <div className="f14-regular text-White">
                  Easily Buy bitcoin and other cryptocurrencies using <br />
                  wide range of payment option. Discover exclusive <br />
                  digital collection of us.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
