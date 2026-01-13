import { useState, useRef, useEffect } from 'react'

/**
 * ImageSelect Component
 * Replica o comportamento do bootstrap-select com suporte a imagens
 */
function ImageSelect({ options, onChange, defaultSelected, className = "" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(defaultSelected || options[0])
  const dropdownRef = useRef(null)

  // Fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (option) => {
    setSelected(option)
    setIsOpen(false)
    if (onChange) onChange(option)
  }

  // Combine default classes with passed className
  const defaultClasses = "dropdown bootstrap-select image-select center w-100"
  // If className is passed, valid classes will be appended or used if we want to replace, 
  // but to keep it simple and safe for existing usages, I'll append.
  // However, the user might want completely different classes in some cases.
  // The 'image-select' class is required for the functionality/styling usually.
  
  // Note: The HTML in exchange.html has "image-select center style-white type-2 image-w-20"
  // It does NOT have "dropdown bootstrap-select w-100" explicitly in the <select> tag class,
  // BUT the JS `selectpicker()` turns it into a div with those classes. 
  // Since we are simulating the RESULT of selectpicker, we should keep the dropdown logic.
  
  return (
    <div className={`dropdown bootstrap-select ${className ? className : 'image-select center w-100'}`} ref={dropdownRef}>
      <button 
        type="button" 
        className={`btn dropdown-toggle btn-light ${isOpen ? 'show' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        title={selected.label}
      >
        <div className="filter-option">
          <div className="filter-option-inner">
            <div className="filter-option-inner-inner">
              {selected.img && <img src={selected.img} alt="" />} {selected.label}
            </div>
          </div>
        </div>
      </button>
      <div 
        className={`dropdown-menu ${isOpen ? 'show' : ''}`} 
        style={{ 
          maxHeight: '433.6px', 
          overflow: 'hidden', 
          minHeight: '0px',
          position: 'absolute',
          transform: 'translate3d(0px, 40px, 0px)',
          top: '0px',
          left: '0px',
          willChange: 'transform'
        }}
      >
        <div className="inner show" style={{ maxHeight: '417.6px', overflowY: 'auto', minHeight: '0px' }}>
          <ul className="dropdown-menu inner show">
            {options.map((option, index) => (
              <li key={index} className={option.value === selected.value ? 'selected active' : ''}>
                <a 
                  role="option" 
                  className={`dropdown-item ${option.value === selected.value ? 'selected active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleSelect(option); }}
                  aria-selected={option.value === selected.value}
                >
                  <span className="text">
                    {option.img && <img src={option.img} alt="" />} {option.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ImageSelect
