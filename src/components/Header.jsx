import { Link } from 'react-router-dom'
import { messages, notifications, users } from '../data/mockData'

/**
 * Header Component - Cabeçalho do dashboard
 * Replica exatamente a estrutura HTML original
 */
function Header({ title = 'Dashboard', onToggleSidebar }) {
  return (
    <div className="header-dashboard">
      <div className="wrap">
        <div className="header-left">
          <div className="button-show-hide" onClick={onToggleSidebar} style={{ cursor: 'pointer' }}>
            <i className="icon-menu"></i>
          </div>
          <h6>{title}</h6>
          <form className="form-search flex-grow">
            <fieldset className="name">
              <input 
                type="text" 
                placeholder="Type to search …" 
                className="show-search style-1" 
                name="name" 
                tabIndex="2" 
                defaultValue="" 
                aria-required="true" 
                required 
              />
            </fieldset>
            <div className="button-submit">
              <button className="" type="submit"><i className="icon-search-normal1"></i></button>
            </div>
          </form>
        </div>
        <div className="header-grid">
          <div className="header-btn">
            {/* Message Dropdown */}
            <div className="popup-wrap message type-header">
              <div className="dropdown">
                <button 
                  className="btn btn-secondary dropdown-toggle" 
                  type="button" 
                  id="dropdownMenuButton2" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <span className="header-item">
                    <i className="icon-sms"></i>
                  </span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end has-content" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <h6>Message</h6>
                  </li>
                  {messages.map(msg => (
                    <li key={msg.id}>
                      <div className={`message-item w-full wg-user ${msg.unread ? 'active' : ''}`}>
                        <div className="image">
                          <img src={msg.avatar} alt="" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <a href="#" className="body-title name">{msg.name}</a>
                            <div className="time">{msg.time}</div>
                          </div>
                          <div className="text-tiny desc">{msg.message}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                  <li>
                    <Link to="/message" className="tf-button style-1 f12-bold w-100">
                      View All
                      <i className="icon icon-send"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Notifications Dropdown */}
            <div className="popup-wrap noti type-header">
              <div className="dropdown">
                <button 
                  className="btn btn-secondary dropdown-toggle" 
                  type="button" 
                  id="dropdownMenuButton1" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <span className="header-item">
                    <i className="icon-notification1"></i>
                  </span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end has-content" aria-labelledby="dropdownMenuButton2">
                  <li>
                    <h6>Notifications</h6>
                  </li>
                  {notifications.map(notif => (
                    <li key={notif.id}>
                      <div className={`notifications-item ${notif.itemClass}`}>
                        <div className="image">
                          <i className={notif.icon}></i>
                        </div>
                        <div>
                          <div className="body-title-2">
                            {notif.title}
                            {notif.orderId && <span> {notif.orderId}</span>}
                          </div>
                          <div className="text-tiny">{notif.description}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                  <li>
                    <Link to="/notifications" className="tf-button style-1 f12-bold w-100">
                      View All
                      <i className="icon icon-send"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="line1"></div>
          
          {/* User Dropdown */}
          <div className="popup-wrap user type-header">
            <div className="dropdown">
              <button 
                className="btn btn-secondary dropdown-toggle" 
                type="button" 
                id="dropdownMenuButton3" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <span className="header-user wg-user">
                  <span className="image">
                    <img src={users.currentUser.avatar} alt="" />
                  </span>
                  <span className="content flex flex-column">
                    <span className="label-02 text-Black name">{users.currentUser.name}</span>
                    <span className="f14-regular text-Gray">{users.currentUser.role}</span>
                  </span>
                </span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end has-content" aria-labelledby="dropdownMenuButton3">
                <li>
                  <Link to="/account" className="user-item">
                    <div className="body-title-2">Account</div>
                  </Link>
                </li>
                <li>
                  <a href="#" className="user-item">
                    <div className="body-title-2">Inbox</div>
                    <div className="number">27</div>
                  </a>
                </li>
                <li>
                  <Link to="/transaction" className="user-item">
                    <div className="body-title-2">Transaction</div>
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="user-item">
                    <div className="body-title-2">Setting</div>
                  </Link>
                </li>
                <li>
                  <Link to="/crypto" className="user-item">
                    <div className="body-title-2">Crypto</div>
                  </Link>
                </li>
                <li>
                  <Link to="/sign-in" className="user-item">
                    <div className="body-title-2">Log out</div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
