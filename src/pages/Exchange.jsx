import { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Layout, ImageSelect } from '../components'
import { candlestickOptions, candlestick3Options } from '../data/chartConfigs'
import user1 from '../assets/images/item/bitcoin-1.png'
import user2 from '../assets/images/item/dashcoin.png'

// SVGs para os botões de moedas
const Icons = {
  Bitcoin: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.98018 8.5H9.46685H6.35352V10.3867H7.22685H9.98018C10.6135 10.3867 11.1335 9.96 11.1335 9.44C11.1335 8.92 10.6135 8.5 9.98018 8.5Z" fill="#161326"/>
      <path d="M7.99967 1.3335C4.31967 1.3335 1.33301 4.32016 1.33301 8.00016C1.33301 11.6802 4.31967 14.6668 7.99967 14.6668C11.6797 14.6668 14.6663 11.6802 14.6663 8.00016C14.6663 4.32016 11.6797 1.3335 7.99967 1.3335ZM9.97967 11.3868H8.87967V12.3335C8.87967 12.6068 8.65301 12.8335 8.37967 12.8335C8.10634 12.8335 7.87967 12.6068 7.87967 12.3335V11.3868H7.22634H7.07301V12.3335C7.07301 12.6068 6.84634 12.8335 6.57301 12.8335C6.29967 12.8335 6.07301 12.6068 6.07301 12.3335V11.3868H5.85301H4.69967C4.42634 11.3868 4.19967 11.1602 4.19967 10.8868C4.19967 10.6135 4.42634 10.3868 4.69967 10.3868H5.35301V8.00016V5.6135H4.69967C4.42634 5.6135 4.19967 5.38683 4.19967 5.1135C4.19967 4.84016 4.42634 4.6135 4.69967 4.6135H5.85301H6.07301V3.66683C6.07301 3.3935 6.29967 3.16683 6.57301 3.16683C6.84634 3.16683 7.07301 3.3935 7.07301 3.66683V4.6135H7.22634H7.87967V3.66683C7.87967 3.3935 8.10634 3.16683 8.37967 3.16683C8.65301 3.16683 8.87967 3.3935 8.87967 3.66683V4.6135H9.46634C10.4997 4.6135 11.413 5.52016 11.413 6.56016C11.413 7.00683 11.253 7.4135 10.9997 7.74683C11.673 8.07349 12.133 8.7135 12.133 9.4535C12.133 10.5135 11.1663 11.3868 9.97967 11.3868Z" fill="currentColor"/>
      <path d="M10.4135 6.55311C10.4135 6.11311 10.0002 5.60645 9.46685 5.60645H7.22685H6.35352V7.49311H9.46685C9.98685 7.49978 10.4135 7.07311 10.4135 6.55311Z" fill="currentColor"/>
    </svg>
  ),
  Ethereum: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.60008 6.06675L7.78005 4.65341C7.92005 4.59341 8.08007 4.59341 8.2134 4.65341L11.3934 6.06675C11.6734 6.19341 11.9334 5.85341 11.7401 5.61341L8.40672 1.54008C8.18005 1.26008 7.80673 1.26008 7.58006 1.54008L4.24673 5.61341C4.06006 5.85341 4.32008 6.19341 4.60008 6.06675Z" fill="currentColor"/>
      <path d="M4.60004 9.93317L7.78669 11.3465C7.92669 11.4065 8.08671 11.4065 8.22004 11.3465L11.4067 9.93317C11.6867 9.80651 11.9467 10.1465 11.7534 10.3865L8.42003 14.4598C8.19336 14.7398 7.82004 14.7398 7.59337 14.4598L4.26004 10.3865C4.06004 10.1465 4.31338 9.80651 4.60004 9.93317Z" fill="currentColor"/>
      <path d="M7.85338 6.3265L5.10004 7.69984C4.85337 7.81984 4.85337 8.17317 5.10004 8.29317L7.85338 9.6665C7.94671 9.71317 8.06001 9.71317 8.15334 9.6665L10.9067 8.29317C11.1533 8.17317 11.1533 7.81984 10.9067 7.69984L8.15334 6.3265C8.05334 6.27984 7.94671 6.27984 7.85338 6.3265Z" fill="currentColor"/>
    </svg>
  ),
  Dash: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.74695 2.3335H10.667C13.3336 2.3335 14.667 4.00016 14.667 6.3335V8.00016C14.667 11.3335 12.667 13.6668 9.00029 13.6668H2.62695L3.33362 10.8335H8.29362C10.667 10.8335 11.8336 9.3335 11.8336 7.2935V7.16683C11.8336 6.00016 11.3336 5.16683 9.83362 5.16683H4.04029L4.74695 2.3335Z" fill="currentColor"/>
      <path d="M8.27334 6.81982H3.13334C2.41334 6.81982 1.78667 7.31316 1.60667 8.00649L1.44 8.68649C1.38 8.93316 1.56667 9.17316 1.82 9.17316H6.96C7.68 9.17316 8.30667 8.67982 8.48667 7.98649L8.65334 7.3065C8.72 7.05983 8.52667 6.81982 8.27334 6.81982Z" fill="currentColor"/>
    </svg>
  ),
  Litecoin: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0003 1.6665C5.40032 1.6665 1.66699 5.39984 1.66699 9.99984C1.66699 14.5998 5.40032 18.3332 10.0003 18.3332C14.6003 18.3332 18.3337 14.5998 18.3337 9.99984C18.3337 5.39984 14.6003 1.6665 10.0003 1.6665ZM13.1837 13.5998C13.1087 13.9998 12.767 14.2832 12.367 14.2832H7.75031C7.20031 14.2832 6.80032 13.7498 6.95032 13.2248L7.65032 10.7665L6.22533 11.0498C6.18366 11.0582 6.142 11.0582 6.10033 11.0582C5.80866 11.0582 5.55032 10.8498 5.49199 10.5582C5.42532 10.2165 5.64199 9.8915 5.98365 9.82484L8.04199 9.41651L9.13365 5.60817C9.18365 5.43317 9.35033 5.30817 9.53366 5.30817H10.667C11.217 5.30817 11.617 5.82483 11.4753 6.35817L10.8003 8.8665L12.4087 8.5415C12.742 8.47484 13.0753 8.6915 13.142 9.03317C13.2086 9.37483 12.992 9.69984 12.6503 9.7665L10.4336 10.2082L9.97533 11.9165H12.5003C13.017 11.9165 13.4087 12.3832 13.317 12.8998L13.1837 13.5998Z" fill="currentColor"/>
    </svg>
  )
}

function Exchange() {
  // Estado para a moeda ativa
  const [activeCoin, setActiveCoin] = useState('Bitcoin')
  
  // Estado para o Quick Trade
  const [tradeValues, setTradeValues] = useState({
    amount: 1,
    price: 45662.05,
    fee: 0.01 // 1%
  })

  // Cálculo automático do total
  const total = (tradeValues.amount * tradeValues.price * (1 + tradeValues.fee)).toFixed(2)
  const feeValue = (tradeValues.amount * tradeValues.price * tradeValues.fee).toFixed(2)

  const handleAmountChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setTradeValues(prev => ({ ...prev, amount: val }));
  }

  const handlePriceChange = (e) => {
    const val = parseFloat(e.target.value) || 0;
    setTradeValues(prev => ({ ...prev, price: val }));
  }

  return (
    <Layout activePage="exchange" title="Exchange">
      <div className="tf-container">
        
        {/* Header - Seleção de Moedas */}
        <div className="mb-32 flex flex-wrap justify-between gap14 items-center">
          <h6>Coin Details</h6>
          <div className="flex items-center flex-wrap">
            {Object.keys(Icons).map(coin => (
              <button 
                key={coin}
                onClick={() => setActiveCoin(coin)}
                className={`tf-button style-4 f12-bold ${activeCoin === coin ? 'active' : ''}`}
                style={{ gap: '6px', color: activeCoin === coin ? '#fff' : '#161326', backgroundColor: activeCoin === coin ? '#161326' : 'transparent', border: '1px solid #EBEBEB' }}
              >
                <span style={{ color: activeCoin === coin ? '#fff' : '#161326' }}>
                  {Icons[coin]}
                </span>
                {coin}
              </button>
            ))}
          </div>
        </div>

        <div className="row">
          
          {/* Coluna Principal - Gráfico */}
          <div className="col-lg-9">
            <div className="wg-box gap12 style-1 bg-Primary shadow-none mb-32 coin-chart-wrap">
              <div className="title">
                <div className="label-01 text-White">Coin chart</div>
                <div className="flex gap16 items-center flex-wrap">
                  <a href="#" className="tf-button style-default type-white f12-bold text-Orchid gap8">
                    <i className="icon icon-receive-square"></i>
                    Get Report
                  </a>
                  <div style={{ width: '200px' }}>
                     <ImageSelect
                        options={[
                          { value: 'usd', label: 'USD ($ US Dollar)' },
                          { value: 'vnd', label: 'VND (₫ VN Vietnam)' }
                        ]}
                        defaultSelected={{ value: 'usd', label: 'USD ($ US Dollar)' }}
                        className="image-select center style-white type-1"
                      />
                  </div>
                </div>
              </div>
              
              {/* Info da Moeda */}
              <div className="flex justify-between flex-wrap items-center gap16">
                <div className="coin-infor flex justify-between flex-wrap items-center gap21">
                  <div>
                    <div className="f12-medium text-Gray">Price</div>
                    <div className="f12-medium text-White coin-price">${tradeValues.price.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="f12-medium text-Gray">24h% change</div>
                    <div className="f12-medium text-YellowGreen coin-change">+ 1.64%</div>
                  </div>
                  <div>
                    <div className="f12-medium text-Gray">Volume (24h)</div>
                    <div className="f12-medium text-White coin-volume">$47.22B</div>
                  </div>
                  <div>
                    <div className="f12-medium text-Gray">Market Cap</div>
                    <div className="f12-medium text-White coin-market">$219.24B</div>
                  </div>
                </div>
                <div className="flex gap16 items-center flex-wrap">
                  <div className="block-legend">
                    <div className="dot w-10 bg-Orchid"></div>
                    <div className="f12-medium"> <span className="text-Gray">Buy</span> <span className="f12-bold text-White">$8,420.50</span></div>
                  </div>
                  <div className="block-legend">
                    <div className="dot w-10 bg-YellowGreen"></div>
                    <div className="f12-medium"> <span className="text-Gray">Sell</span> <span className="f12-bold text-White">$8,420.50</span></div>
                  </div>
                </div>
              </div>

              {/* Gráfico Candlestick */}
              <div id="candlestick-3" className="candlestick-chart">
                <ReactApexChart 
                  options={candlestick3Options.options} 
                  series={candlestick3Options.series} 
                  type="candlestick" 
                  height={350} 
                />
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="wg-box style-1 gap20 bg-Gainsboro shadow-none mb-32 box-about">
              <div className="title">
                <div className="label-01">About</div>
                <div className="dropdown default">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      <span className="icon-more"></span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><a href="javascript:void(0);">This Week</a></li>
                    <li><a href="javascript:void(0);">This Day</a></li>
                  </ul>
                </div>
              </div>
              <div className="about-wrap">
                <div className="icon text-center mb-16">
                   <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="64" height="64" rx="20" fill="#161326"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M41.1641 29.3126C41.5958 26.4308 39.4001 24.8812 36.4 23.8473L37.3734 19.9424L34.9975 19.3512L34.0488 23.1529C33.4376 22.9994 32.8105 22.8565 32.1844 22.7138L32.1844 22.7138L32.1445 22.7047L33.1001 18.8782L30.7242 18.2856L29.7508 22.1891L29.6469 22.1653C29.1656 22.0553 28.6921 21.947 28.2329 21.8316L28.2356 21.8192L24.9578 21.0011L24.3253 23.5393C24.3253 23.5393 26.0893 23.9435 26.0522 23.9682C27.0147 24.2089 27.1879 24.8455 27.159 25.3514L26.0508 29.7993C26.1168 29.8158 26.2021 29.8406 26.2983 29.8777L26.0467 29.8158L24.493 36.0471C24.3748 36.3385 24.0764 36.7771 23.4027 36.6108C23.4275 36.6451 21.6758 36.1804 21.6758 36.1804L20.4961 38.9L23.5897 39.6714C23.9219 39.7548 24.2505 39.8406 24.5756 39.9254L24.5757 39.9255C24.813 39.9874 25.0485 40.0489 25.2822 40.1086L24.2992 44.0574L26.6737 44.6486L27.6471 40.7438C28.2961 40.9184 28.9258 41.0807 29.5418 41.2347L28.5711 45.123L30.947 45.7142L31.93 41.7737C35.9834 42.5409 39.0302 42.2315 40.313 38.5659C41.347 35.6153 40.2622 33.9118 38.1296 32.8022C39.6833 32.4447 40.852 31.4231 41.1641 29.3126ZM35.7331 36.927C35.0609 39.635 30.8226 38.5155 28.8826 38.0031C28.7078 37.9569 28.5517 37.9157 28.4185 37.8826L29.7247 32.651C29.8871 32.6916 30.0857 32.7362 30.3107 32.7867C32.3173 33.2375 36.4242 34.1601 35.7331 36.927ZM30.7136 30.3582C32.3302 30.7898 35.8551 31.7309 36.4687 29.27C37.0964 26.753 33.6698 25.995 31.9961 25.6247C31.8074 25.583 31.641 25.5461 31.5052 25.5123L30.3228 30.2558C30.4348 30.2837 30.5663 30.3189 30.7136 30.3582Z" fill="white"/>
                  </svg>
                </div>
                <div className="head label-01 text-center">Digital Cash</div>
                <div className="sub f12-medium text-center text-GrayDark">Bitcoin</div>
                <div className="number-exchange f12-medium text-center">1 BITCOIN = {tradeValues.price} USD</div>
                <div className="desc f12-medium text-GrayDark mt-2">
                  Dash is an open source cryptocurrency. It is an altcoin that was forked from the Bitcoin protocol.
                </div>
                <a href="#" className="btn-read-more f12-bold mt-3 d-inline-block">
                  Read More
                  <i className="icon icon-send ms-2"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="wg-box mb-32 gap16">
              <div className="title">
                <div className="label-01">Sell Order</div>
                <div className="dropdown default">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="icon-more"></span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                      <li><a href="javascript:void(0);">This Week</a></li>
                      <li><a href="javascript:void(0);">This Day</a></li>
                  </ul>
                </div>
              </div>
              <table className="tab-sell-order w-100">
                <thead>
                  <tr>
                    <th className="f14-regular text-Gray text-start">Price</th>
                    <th className="f14-regular text-Gray text-start">Amount</th>
                    <th className="f14-regular text-Gray text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(6)].map((_, i) => (
                    <tr key={i}>
                      <td className="f14-regular">98.36</td>
                      <td className="f14-regular">0.25</td>
                      <td className="f14-regular text-end">$147.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a href="#" className="tf-button f12-bold w-100 mt-2">
                View All <i className="icon icon-send ms-2"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="wg-box mb-32 gap16 bg-YellowGreen">
              <div className="title">
                <div className="label-01">Buy Order</div>
                <div className="dropdown default">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="icon-more"></span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                      <li><a href="javascript:void(0);">This Week</a></li>
                      <li><a href="javascript:void(0);">This Day</a></li>
                  </ul>
                </div>
              </div>
              <table className="tab-sell-order w-100">
                <thead>
                  <tr>
                    <th className="f14-regular text-start">Price</th>
                    <th className="f14-regular text-start">Amount</th>
                    <th className="f14-regular text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(6)].map((_, i) => (
                    <tr key={i}>
                      <td className="f14-regular">98.36</td>
                      <td className="f14-regular">0.25</td>
                      <td className="f14-regular text-end">$147.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a href="#" className="tf-button style-1 f12-bold w-100 mt-2">
                View All <i className="icon icon-send ms-2"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="wg-box box-quick-trade mb-32">
              <div className="title">
                <div>
                  <div className="label-01 mb-2">Quick Trade</div>
                  <div className="f12-medium text-GrayDark">Realize trocas instantâneas</div>
                </div>
                <ImageSelect 
                  options={[
                      { label: '45,662.05 Dash', img: user1, value: 'dash' },
                      { label: '40,662.05 Btc', img: user2, value: 'btc' }
                  ]}
                  className="image-select center style-white type-2 image-w-20"
                />
              </div>
              
              <div className="quick-trade-wrap">
                <div className="quick-trade-list">
                  <div className="relative">
                    <div className="f12-medium text-Primary title">Amount</div>
                    <input 
                      type="number" 
                      className="quick-trade-input style-1" 
                      value={tradeValues.amount}
                      onChange={handleAmountChange}
                      placeholder=""
                    />
                  </div>
                  <div className="relative">
                    <div className="f12-medium text-Primary title">Price BPL</div>
                    <input 
                      type="number" 
                      className="quick-trade-input style-1" 
                      value={tradeValues.price}
                      onChange={handlePriceChange}
                      placeholder=""
                    />
                  </div>
                  <div className="relative">
                    <div className="f12-medium text-Primary title">Fee (1%)</div>
                    <input 
                      type="text" 
                      className="quick-trade-input style-1" 
                      value={feeValue} 
                      readOnly 
                      placeholder=""
                    />
                  </div>
                  <div className="relative">
                    <div className="f12-medium text-Primary title">Total BPL</div>
                    <input 
                      type="text" 
                      className="quick-trade-input style-1" 
                      value={total} 
                      readOnly 
                      placeholder=""
                    />
                  </div>
                </div>
                
                <div className="bottom-button">
                  <a href="#" className="btn-buy f12-bold w-100">
                    Buy <i className="icon icon-send"></i>
                  </a>
                  <a href="#" className="btn-sell f12-bold w-100">
                    Sell <i className="icon icon-send"></i>
                  </a>
                </div>
                
                <div className="tf-cart-checkbox style-3">
                  <div className="tf-checkbox-wrapp">
                    <input className="checkbox-item" type="checkbox" name="transaction_checkbox" />
                    <div><i className="icon-check"></i></div>
                  </div>
                  <div className="f12-medium text-GrayDark">
                    I have read and agree to Terms of Service
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Exchange
