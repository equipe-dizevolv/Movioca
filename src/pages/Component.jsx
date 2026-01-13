import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../components'
import { useShowPassword } from '../hooks/useInteractions'
import user1 from '../assets/images/avatar/user-1.png'
import user2 from '../assets/images/avatar/user-2.png'
import user3 from '../assets/images/avatar/user-3.png'
import user4 from '../assets/images/avatar/user-4.png'
import dashcoin from '../assets/images/item/dashcoin.svg'
import bitcoin from '../assets/images/item/bitcoin.svg'

function Component() {
  const { showPassword, togglePasswordVisibility } = useShowPassword()

  // Icons list from the HTML
  const icons = [
    'icon-send1', 'icon-sms', 'icon-check', 'icon-back', 'icon-next', 'icon-view', 'icon-menu',
    'icon-swap-horizontal', 'icon-bitcoin-btc', 'icon-calling', 'icon-category', 'icon-close-square',
    'icon-dash', 'icon-ethereum', 'icon-facebook', 'icon-litecoinltc', 'icon-message-text',
    'icon-notification', 'icon-search-normal', 'icon-setting', 'icon-tick-square', 'icon-wallet',
    'icon-arrow-down', 'icon-arrow-left', 'icon-arrow-right', 'icon-arrow-swap', 'icon-arrow-up',
    'icon-category1', 'icon-dash1', 'icon-document', 'icon-edit', 'icon-hide', 'icon-google',
    'icon-gps', 'icon-login', 'icon-message-text1', 'icon-minus', 'icon-more', 'icon-mouse-square',
    'icon-notification1', 'icon-paper', 'icon-person', 'icon-receive-square', 'icon-search-normal1',
    'icon-send', 'icon-setting1', 'icon-setting-5', 'icon-sms-tracking', 'icon-sort', 'icon-wallet1',
    'icon-add', 'icon-two-arrow', 'icon-mastercard'
  ]

  return (
    <Layout activePage="component" title="Component">
      <div className="tf-container">
        
        {/* Iconography Section */}
        <div className="mb-40">
          <h4 className="mb-24">Iconography</h4>
          <div className="flex flex-wrap row-gap-16 gap36 items-center f-20">
            {icons.map((icon, index) => (
              <span key={index} className={icon}></span>
            ))}
          </div>
        </div>

        {/* Component Section */}
        <div className="mb-40">
          <h4 className="mb-24">Component</h4>
          <div className="grid-3-col">
            
            {/* Search Form */}
            <form className="form-search">
              <fieldset className="name">
                <input type="text" placeholder="Type to search …" className="show-search style-1" name="name" tabIndex="2" required />
              </fieldset>
              <div className="button-submit">
                <button type="submit"><i className="icon-search-normal1"></i></button>
              </div>
            </form>

            <div className="flex gap24 justify-center">
               {/* Dropdown Demonstrations - simplified for visual components */}
               <div className="popup-wrap message type-header" style={{ display: 'block', position: 'static', opacity: 1, visibility: 'visible' }}>
                  <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button">
                          <span className="header-item f14-regular text-Black">
                              <i className="icon-sms"></i>
                          </span>
                      </button>
                  </div>
               </div>
               
               <div className="popup-wrap noti type-header" style={{ display: 'block', position: 'static', opacity: 1, visibility: 'visible' }}>
                  <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button">
                          <span className="header-item f14-regular text-Black">
                              <i className="icon-notification1"></i>
                          </span>
                      </button>
                  </div>
               </div>
            </div>

            <div>
                <div className="popup-wrap user type-header justify-content-start" style={{ display: 'block', position: 'static', opacity: 1, visibility: 'visible' }}>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button">
                            <span className="header-user wg-user">
                                <span className="image">
                                    <img src={user1} alt="user" />
                                </span>
                                <span className="content flex flex-column">
                                    <span className="label-02 text-Black name">Jonathan</span>
                                    <span className="f14-regular text-Gray">Admin</span>
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="dropdown default text-end">
                <button className="btn btn-secondary dropdown-toggle" type="button">
                   <span className="icon-more"></span>
                </button>
            </div>

            <select className="image-select center w-100" defaultValue="Dash Coin">
                <option data-thumbnail={dashcoin}>Dash Coin</option>
                <option data-thumbnail={bitcoin}>Bit Coin</option>
            </select>

            <div className="tf-select">
                <select className="w-100" defaultValue="Weekly (2023)">
                    <option>Weekly (2023)</option>
                    <option>Bit Coin</option>
                </select>
            </div>

            {/* Widget Tabs 1 */}
            <div className="widget-tabs">
                <ul className="widget-menu-tab mb-0">
                    <li className="item-title f12-medium active">
                        <span className="inner">Week</span>
                    </li>
                    <li className="item-title f12-medium">
                        <span className="inner">Month</span>
                    </li>
                    <li className="item-title f12-medium">
                        <span className="inner">Year</span>
                    </li>
                </ul>
            </div>

            {/* Widget Tabs 2 */}
            <div className="widget-tabs style-1">
                <ul className="widget-menu-tab mb-0">
                    <li className="item-title f12-medium active">
                        <span className="inner">Week</span>
                    </li>
                    <li className="item-title f12-medium">
                        <span className="inner">Month</span>
                    </li>
                    <li className="item-title f12-medium">
                        <span className="inner">Year</span>
                    </li>
                </ul>
            </div>

            {/* Buttons */}
            <div>
                <a href="#" className="tf-button f12-bold w-100">
                    View All <i className="icon icon-send"></i>
                </a>
            </div>
            <div>
                <a href="#" className="tf-button style-1 f12-bold w-100">
                    View All <i className="icon icon-send"></i>
                </a>
            </div>
            <div>
                <a href="#" className="tf-button style-default f12-bold w-100">
                    View All <i className="icon icon-send"></i>
                </a>
            </div>
            <div>
                <a href="#" className="tf-button style-2 f12-bold w-100">
                    View All <i className="icon icon-send"></i>
                </a>
            </div>
            <div>
                <a href="#" className="tf-button style-3 f12-bold w-100">
                    View All <i className="icon icon-send"></i>
                </a>
            </div>
            <div>
                <a href="#" className="tf-button style-4 f12-bold w-100">
                    View All <i className="icon icon-send"></i>
                </a>
            </div>

            {/* Checkboxes Rank */}
            <div className="tf-cart-checkbox">
                <div className="tf-checkbox-wrapp">
                    <input className="checkbox-item" type="checkbox" name="transaction_checkbox" />
                    <div><i className="icon-check"></i></div>
                </div>
                <div className="f12-medium text-break" data-title="Rank : ">#1</div>
            </div>
            <div className="tf-cart-checkbox">
                <div className="tf-checkbox-wrapp">
                    <input className="checkbox-item" type="checkbox" name="transaction_checkbox2" defaultChecked />
                    <div><i className="icon-check"></i></div>
                </div>
                <div className="f12-medium text-break" data-title="Rank : ">#1</div>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap8">
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                    <path d="M5.49424 1.17906L1.39781 6.53594C1.14622 6.86495 1.38082 7.33967 1.795 7.33967L9.98785 7.33967C10.402 7.33967 10.6366 6.86495 10.385 6.53594L6.2886 1.17906C6.08848 0.917356 5.69437 0.917356 5.49424 1.17906Z" fill="#2BC155"></path>
                </svg>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M5.28896 6.82094L9.38539 1.46406C9.63698 1.13505 9.40239 0.660332 8.98821 0.660332L0.795353 0.660334C0.381175 0.660334 0.146582 1.13505 0.398173 1.46406L4.4946 6.82094C4.69473 7.08264 5.08884 7.08264 5.28896 6.82094Z" fill="#FD7972"></path>
                </svg>
            </div>

            {/* Simple Checkboxes */}
            <div className="flex items-center gap8">
                <input className="tf-check flex-shrink-0" type="checkbox" defaultChecked />
                <input className="tf-check flex-shrink-0" type="checkbox" />
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap8">
                <div className="box-status bg-YellowGreen">
                    <i className="icon icon-check"></i>
                    <span className="font-poppins">COMPLETED</span> 
                </div>
                <div className="box-status bg-LightGray">
                    <span className="font-poppins">PENDING</span> 
                </div>
                <div className="box-status bg-LightGray type-red">
                    <span className="font-poppins">CANCELED</span> 
                </div>
            </div>

            {/* Verification Items */}
            <div className="flex gap6 items-center">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path d="M13.492 2.1665H6.50866C3.47533 2.1665 1.66699 3.97484 1.66699 7.00817V13.9832C1.66699 17.0248 3.47533 18.8332 6.50866 18.8332H13.4837C16.517 18.8332 18.3253 17.0248 18.3253 13.9915V7.00817C18.3337 3.97484 16.5253 2.1665 13.492 2.1665ZM12.8003 12.4165C13.042 12.6582 13.042 13.0582 12.8003 13.2998C12.6753 13.4248 12.517 13.4832 12.3587 13.4832C12.2003 13.4832 12.042 13.4248 11.917 13.2998L10.0003 11.3832L8.08366 13.2998C7.95866 13.4248 7.80033 13.4832 7.64199 13.4832C7.48366 13.4832 7.32533 13.4248 7.20033 13.2998C6.95866 13.0582 6.95866 12.6582 7.20033 12.4165L9.11699 10.4998L7.20033 8.58317C6.95866 8.3415 6.95866 7.9415 7.20033 7.69984C7.44199 7.45817 7.84199 7.45817 8.08366 7.69984L10.0003 9.6165L11.917 7.69984C12.1587 7.45817 12.5587 7.45817 12.8003 7.69984C13.042 7.9415 13.042 8.3415 12.8003 8.58317L10.8837 10.4998L12.8003 12.4165Z" fill="#FD7972"></path>
                </svg>
                <div className="f14-regular">Identify Verification</div>
            </div>
            <div className="flex gap6 items-center">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path d="M13.492 2.1665H6.50866C3.47533 2.1665 1.66699 3.97484 1.66699 7.00817V13.9832C1.66699 17.0248 3.47533 18.8332 6.50866 18.8332H13.4837C16.517 18.8332 18.3253 17.0248 18.3253 13.9915V7.00817C18.3337 3.97484 16.5253 2.1665 13.492 2.1665ZM13.9837 8.58317L9.25866 13.3082C9.14199 13.4248 8.98366 13.4915 8.81699 13.4915C8.65033 13.4915 8.49199 13.4248 8.37533 13.3082L6.01699 10.9498C5.77533 10.7082 5.77533 10.3082 6.01699 10.0665C6.25866 9.82484 6.65866 9.82484 6.90033 10.0665L8.81699 11.9832L13.1003 7.69984C13.342 7.45817 13.742 7.45817 13.9837 7.69984C14.2253 7.9415 14.2253 8.33317 13.9837 8.58317Z" fill="#2BC155"></path>
                </svg>
                <div className="f14-regular">Enable Anti-phising Code</div>
            </div>

            {/* Inputs */}
            <div>
                <input className="flex-grow bg-Gainsboro" type="text" placeholder="Enter your name" name="name" />
            </div>
            <div>
                <input className="flex-grow bg-Gainsboro" type="text" placeholder="Enter your name" name="name" defaultValue="Jonatham Smith" />
            </div>
            <div>
                <input className="flex-grow bg-Gainsboro" type="email" placeholder="Enter your email address" name="email" />
            </div>
            <div>
                <input className="flex-grow bg-Gainsboro" type="email" placeholder="Enter your email address" name="email" defaultValue="keplamdusa@gmail.com" />
            </div>
            
            <fieldset className="password">
                <input className="password-input bg-Gainsboro" type={showPassword ? "text" : "password"} placeholder="Enter your password" name="password" />
                <span className="show-pass" onClick={togglePasswordVisibility}>
                    {showPassword ? <i className="icon-hide hide"></i> : <i className="icon-view view"></i>}
                </span>
            </fieldset>

            <fieldset className="password">
                <input className="password-input bg-Gainsboro" type={showPassword ? "text" : "password"} placeholder="Enter your password" name="password" defaultValue="12345" />
                <span className="show-pass" onClick={togglePasswordVisibility}>
                    {showPassword ? <i className="icon-hide hide"></i> : <i className="icon-view view"></i>}
                </span>
            </fieldset>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Component
