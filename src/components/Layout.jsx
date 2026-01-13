import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Preloader from './Preloader'
import { useMenuLeft, usePreloader } from '../hooks/useInteractions'

/**
 * Layout Component - Layout principal do dashboard
 * Usado por todas as páginas internas que têm sidebar e header
 */
function Layout({ children, activePage = 'dashboard', title = 'Dashboard' }) {
  const { isCollapsed, toggleMenu } = useMenuLeft()
  const { isLoading } = usePreloader(1500)

  // Efeito para remover classe de loading após preloader
  useEffect(() => {
    if (!isLoading) {
      document.querySelector('.layout-wrap')?.classList.add('loader-off')
    }
  }, [isLoading])

  return (
    <div id="wrapper">
      <div id="page" className="">
        <div className={`layout-wrap ${isLoading ? '' : 'loader-off'} ${isCollapsed ? 'full-width' : ''}`}>
          <Preloader isVisible={isLoading} />
          <Sidebar activePage={activePage} onToggleCollapse={toggleMenu} />
          <div className="section-content-right">
            <Header title={title} onToggleSidebar={toggleMenu} />
            <div className="main-content">
              <div className="main-content-inner">
                <div className="main-content-wrap">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
