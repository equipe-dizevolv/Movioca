import { useState, useEffect, useCallback } from 'react'

/**
 * Hook para controle do menu lateral (sidebar)
 * Replica a funcionalidade do main.js: menuleft()
 */
export function useMenuLeft() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsCollapsed(prev => !prev)
    // CSS uses .layout-wrap.full-width, managed by Layout component
    // Persistir preferência
    localStorage.setItem('menuCollapsed', (!isCollapsed).toString())
  }, [isCollapsed])

  useEffect(() => {
    // Restaurar preferência salva
    const saved = localStorage.getItem('menuCollapsed')
    if (saved === 'true') {
      setIsCollapsed(true)
    }
  }, [])

  return { isCollapsed, toggleMenu }
}

/**
 * Hook para sistema de tabs
 * Replica a funcionalidade do main.js: tabs()
 */
export function useTabs(defaultTab = 0) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const changeTab = useCallback((index) => {
    setActiveTab(index)
  }, [])

  return { activeTab, changeTab }
}

/**
 * Hook para mostrar/esconder senha
 * Replica a funcionalidade do main.js: showpass()
 */
export function useShowPassword() {
  const [showPassword, setShowPassword] = useState({})

  const togglePasswordVisibility = useCallback((fieldId) => {
    setShowPassword(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId]
    }))
  }, [])

  return { showPassword, togglePasswordVisibility }
}

/**
 * Hook para controle de dropdowns
 * Replica a funcionalidade do Bootstrap dropdowns
 */
export function useDropdown() {
  const [openDropdown, setOpenDropdown] = useState(null)

  const toggleDropdown = useCallback((id) => {
    setOpenDropdown(prev => prev === id ? null : id)
  }, [])

  const closeDropdown = useCallback(() => {
    setOpenDropdown(null)
  }, [])

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        closeDropdown()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [closeDropdown])

  return { openDropdown, toggleDropdown, closeDropdown }
}

/**
 * Hook para checkboxes (selecionar todos)
 * Replica a funcionalidade do main.js: fullcheckbox()
 */
export function useCheckboxes(initialItems = []) {
  const [checkedItems, setCheckedItems] = useState(() => {
    const initial = {}
    initialItems.forEach((item, index) => {
      initial[index] = item.checked || false
    })
    return initial
  })

  const [selectAll, setSelectAll] = useState(false)

  const toggleItem = useCallback((index) => {
    setCheckedItems(prev => {
      const newState = { ...prev, [index]: !prev[index] }
      // Verificar se todos estão selecionados
      const allChecked = Object.values(newState).every(v => v)
      setSelectAll(allChecked)
      return newState
    })
  }, [])

  const toggleAll = useCallback(() => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    setCheckedItems(prev => {
      const newState = {}
      Object.keys(prev).forEach(key => {
        newState[key] = newSelectAll
      })
      return newState
    })
  }, [selectAll])

  return { checkedItems, selectAll, toggleItem, toggleAll }
}

/**
 * Hook para animação de contador
 * Replica a funcionalidade do main.js: counter()
 */
export function useCounter(targetValue, duration = 2000, delay = 0) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  const startCounter = useCallback(() => {
    if (hasStarted) return
    setHasStarted(true)

    const startTime = Date.now()
    const endTime = startTime + duration

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const currentValue = Math.floor(targetValue * progress)
      
      setCount(currentValue)

      if (now < endTime) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(targetValue)
      }
    }

    setTimeout(() => {
      requestAnimationFrame(updateCount)
    }, delay)
  }, [targetValue, duration, delay, hasStarted])

  return { count, startCounter, hasStarted }
}

/**
 * Hook para preloader
 * Replica a funcionalidade do main.js: preloader()
 */
export function usePreloader(timeout = 2000) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, timeout)

    return () => clearTimeout(timer)
  }, [timeout])

  return { isLoading }
}

/**
 * Hook para box de busca
 * Replica a funcionalidade do main.js: box_search()
 */
export function useSearchBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSearch = useCallback(() => {
    setIsOpen(prev => !prev)
    if (!isOpen) {
      setSearchQuery('')
    }
  }, [isOpen])

  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setSearchQuery('')
  }, [])

  return { isOpen, searchQuery, setSearchQuery, toggleSearch, closeSearch }
}

/**
 * Hook para seleção de cores do tema
 * Replica a funcionalidade do main.js: select_colors_theme()
 */
export function useThemeColors() {
  const [activeColor, setActiveColor] = useState('color-1')

  const changeColor = useCallback((colorClass) => {
    // Remove todas as classes de cor
    document.body.classList.remove('color-1', 'color-2', 'color-3', 'color-4', 'color-5')
    // Adiciona a nova classe
    document.body.classList.add(colorClass)
    setActiveColor(colorClass)
    localStorage.setItem('themeColor', colorClass)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('themeColor')
    if (saved) {
      changeColor(saved)
    }
  }, [changeColor])

  return { activeColor, changeColor }
}

/**
 * Hook para configurações do tema
 * Replica a funcionalidade do theme-settings.js
 */
export function useThemeSettings() {
  const [menuStyle, setMenuStyle] = useState('style-2') // default, style-2
  const [layoutWidth, setLayoutWidth] = useState('full') // full, box
  const [menuPosition, setMenuPosition] = useState('static') // static, fixed

  const applyMenuStyle = useCallback((style) => {
    document.body.classList.remove('default', 'style-2')
    document.body.classList.add(style)
    setMenuStyle(style)
    localStorage.setItem('menuStyle', style)
  }, [])

  const applyLayoutWidth = useCallback((width) => {
    document.body.classList.remove('full', 'box')
    document.body.classList.add(width)
    setLayoutWidth(width)
    localStorage.setItem('layoutWidth', width)
  }, [])

  const applyMenuPosition = useCallback((position) => {
    const menuLeft = document.querySelector('.menu-left')
    if (menuLeft) {
      menuLeft.classList.remove('static', 'fixed')
      menuLeft.classList.add(position)
    }
    setMenuPosition(position)
    localStorage.setItem('menuPosition', position)
  }, [])

  useEffect(() => {
    // Restaurar configurações salvas
    const savedStyle = localStorage.getItem('menuStyle')
    const savedWidth = localStorage.getItem('layoutWidth')
    const savedPosition = localStorage.getItem('menuPosition')

    if (savedStyle) applyMenuStyle(savedStyle)
    if (savedWidth) applyLayoutWidth(savedWidth)
    if (savedPosition) applyMenuPosition(savedPosition)
  }, [applyMenuStyle, applyLayoutWidth, applyMenuPosition])

  return {
    menuStyle, applyMenuStyle,
    layoutWidth, applyLayoutWidth,
    menuPosition, applyMenuPosition
  }
}

/**
 * Hook para submenu colapsável
 * Replica a funcionalidade do main.js: collapse_menu()
 */
export function useCollapseMenu() {
  const [openMenus, setOpenMenus] = useState({})

  const toggleSubmenu = useCallback((menuId) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }))
  }, [])

  return { openMenus, toggleSubmenu }
}

/**
 * Hook para seleção de imagens/variantes
 * Replica a funcionalidade do main.js: selectImages() e variant_picker()
 */
export function useVariantPicker(variants = []) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null)

  const selectVariant = useCallback((variant) => {
    setSelectedVariant(variant)
  }, [])

  return { selectedVariant, selectVariant }
}

/**
 * Hook para controle de modal
 */
export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  const openModal = useCallback((content = null) => {
    setModalContent(content)
    setIsOpen(true)
    document.body.classList.add('modal-open')
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setModalContent(null)
    document.body.classList.remove('modal-open')
  }, [])

  return { isOpen, modalContent, openModal, closeModal }
}

/**
 * Hook para dark mode
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(false)

  const toggleDarkMode = useCallback(() => {
    setIsDark(prev => {
      const newValue = !prev
      document.body.classList.toggle('dark-mode', newValue)
      localStorage.setItem('darkMode', newValue.toString())
      return newValue
    })
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved === 'true') {
      setIsDark(true)
      document.body.classList.add('dark-mode')
    }
  }, [])

  return { isDark, toggleDarkMode }
}
