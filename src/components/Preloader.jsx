/**
 * Preloader Component - Tela de carregamento
 * Replica exatamente a estrutura HTML original
 */
function Preloader({ isVisible = true }) {
  if (!isVisible) return null
  
  return (
    <div id="preload" className="preload-container">
      <div className="preloading">
        <span></span>
      </div>
    </div>
  )
}

export default Preloader
