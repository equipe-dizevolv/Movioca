import { Link, useLocation } from 'react-router-dom'
import { useCollapseMenu } from '../hooks/useInteractions'

/**
 * Sidebar Component - Menu lateral do dashboard
 * Replica exatamente a estrutura HTML original com interatividades
 */
function Sidebar({ activePage = 'dashboard', onToggleCollapse }) {
  const location = useLocation()
  const { openMenus, toggleSubmenu } = useCollapseMenu()
  
  // Determine active states based on current route
  const isWalletActive = ['/my-wallet', '/account'].includes(location.pathname)
  
  // Controle de submenu wallet - começa aberto se página ativa pertence a ele
  const isWalletMenuOpen = openMenus['wallet'] !== undefined ? openMenus['wallet'] : isWalletActive
  
  // SVG icon for Transaction menu item
  const TransactionIcon = ({ isActive }) => (
    <svg 
      className="" 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {isActive ? (
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M6.10866 2.16699H13.8912C16.7253 2.16699 18.3253 3.77449 18.3337 6.60866V14.392C18.3337 17.2253 16.7253 18.8337 13.8912 18.8337H6.10866C3.27449 18.8337 1.66699 17.2253 1.66699 14.392V6.60866C1.66699 3.77449 3.27449 2.16699 6.10866 2.16699ZM10.0412 15.3837C10.4003 15.3837 10.6995 15.117 10.7328 14.7587V6.26699C10.7662 6.00866 10.642 5.74949 10.417 5.60866C10.1828 5.46699 9.89949 5.46699 9.67533 5.60866C9.44949 5.74949 9.32533 6.00866 9.34949 6.26699V14.7587C9.39199 15.117 9.69116 15.3837 10.0412 15.3837ZM13.8753 15.3837C14.2253 15.3837 14.5245 15.117 14.567 14.7587V12.0253C14.5912 11.7578 14.467 11.5087 14.2412 11.367C14.017 11.2253 13.7337 11.2253 13.5003 11.367C13.2745 11.5087 13.1503 11.7578 13.1837 12.0253V14.7587C13.217 15.117 13.5162 15.3837 13.8753 15.3837ZM6.84949 14.7587C6.81616 15.117 6.51699 15.3837 6.15783 15.3837C5.79949 15.3837 5.49949 15.117 5.46699 14.7587V9.00033C5.44199 8.74116 5.56616 8.48366 5.79199 8.34199C6.01616 8.20033 6.30033 8.20033 6.52533 8.34199C6.74949 8.48366 6.87533 8.74116 6.84949 9.00033V14.7587Z" 
          fill="#F8F8F8"
        />
      ) : (
        <>
          <path d="M6.1428 8.50146V14.2182" stroke="#A4A4A9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.0317 5.76562V14.2179" stroke="#A4A4A9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.8572 11.522V14.2178" stroke="#A4A4A9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M13.9047 1.6665H6.0952C3.37297 1.6665 1.66663 3.59324 1.66663 6.3208V13.6789C1.66663 16.4064 3.36504 18.3332 6.0952 18.3332H13.9047C16.6349 18.3332 18.3333 16.4064 18.3333 13.6789V6.3208C18.3333 3.59324 16.6349 1.6665 13.9047 1.6665Z" stroke="#A4A4A9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </>
      )}
    </svg>
  )

  // Handler para toggle do menu lateral (collapse)
  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse()
    }
    document.body.classList.toggle('collapsed')
  }

  // Handler para clique em item com submenu
  const handleSubmenuClick = (e, menuId) => {
    e.preventDefault()
    toggleSubmenu(menuId)
  }

  return (
    <div className="section-menu-left">
      <div className="box-logo">
        <Link to="/" id="site-logo-inner">
          <img 
            className="" 
            id="logo_header" 
            alt="" 
            src="/images/logo/logo.svg" 
            data-light="/images/logo/logo.svg" 
            data-dark="/images/logo/logo-dark.svg" 
          />
        </Link>
        <div className="button-show-hide" onClick={handleToggleCollapse}>
          <i className="icon-back"></i>
        </div>
      </div>
      <div className="section-menu-left-wrap">
        <div className="center">
          <div className="center-item">
            <div className="center-heading f14-regular text-Gray menu-heading mb-12">Navigation</div>
          </div>
          <div className="center-item">
            <ul className="">
              {/* Dashboard */}
              <li className="menu-item">
                <Link 
                  to="/" 
                  className={`menu-item-button ${activePage === 'dashboard' ? 'active' : ''}`}
                >
                  <div className="icon">
                    <i className="icon-category"></i>
                  </div>
                  <div className="text">Dashboard</div>
                </Link>
              </li>
              
              {/* My Wallet - with submenu */}
              <li className={`menu-item has-children ${isWalletActive ? 'active' : ''} ${isWalletMenuOpen ? 'current' : ''}`}>
                <a 
                  href="#" 
                  className={`menu-item-button ${isWalletActive ? 'active' : ''}`}
                  onClick={(e) => handleSubmenuClick(e, 'wallet')}
                >
                  <div className="icon">
                    <i className="icon-wallet1"></i>
                  </div>
                  <div className="text">My Wallet</div>
                </a>
                <ul className="sub-menu" style={{ display: isWalletMenuOpen ? 'block' : 'none' }}>
                  <li className={`sub-menu-item ${activePage === 'my-wallet' ? 'active' : ''}`}>
                    <Link to="/my-wallet" className="">
                      <div className="text">My Wallet</div>
                    </Link>
                  </li>
                  <li className={`sub-menu-item ${activePage === 'account' ? 'active' : ''}`}>
                    <Link to="/account" className="">
                      <div className="text">Account</div>
                    </Link>
                  </li>
                </ul>
              </li>
              
              {/* Transaction */}
              <li className="menu-item">
                <Link 
                  to="/transaction" 
                  className={`menu-item-button ${activePage === 'transaction' ? 'active' : ''}`}
                >
                  <div className="icon">
                    <TransactionIcon isActive={activePage === 'transaction'} />
                  </div>
                  <div className="text">Transaction</div>
                </Link>
              </li>
              
              {/* Crypto */}
              <li className="menu-item">
                <Link 
                  to="/crypto" 
                  className={`menu-item-button ${activePage === 'crypto' ? 'active' : ''}`}
                >
                  <div className="icon">
                    <i className="icon-dash1"></i>
                  </div>
                  <div className="text">Crypto</div>
                </Link>
              </li>
              
              {/* Exchange */}
              <li className="menu-item">
                <Link 
                  to="/exchange" 
                  className={`menu-item-button ${activePage === 'exchange' ? 'active' : ''}`}
                >
                  <div className="icon">
                    <i className="icon-arrow-swap"></i>
                  </div>
                  <div className="text">Exchange</div>
                </Link>
              </li>
              
              {/* Settings */}
              <li className="menu-item">
                <Link 
                  to="/settings" 
                  className={`menu-item-button ${activePage === 'settings' ? 'active' : ''}`}
                >
                  <div className="icon">
                    <i className="icon-setting1"></i>
                  </div>
                  <div className="text">Settings</div>
                </Link>
              </li>
              
              {/* Component */}
              <li className="menu-item">
                <Link 
                  to="/component" 
                  className={`menu-item-button ${activePage === 'component' ? 'active' : ''}`}
                >
                  <div className="icon">
                    <i className="icon-search-normal"></i>
                  </div>
                  <div className="text">Component</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <div className="image">
            <img src="/images/item/bot.png" alt="" />
          </div>
          <div className="content">
            <p className="f12-regular text-White">For more features</p>
            <p className="f12-bold text-White">Upgrade to Pro</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
