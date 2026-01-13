import { useState } from 'react'
import { Layout } from '../components'
import Chart from 'react-apexcharts'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { walletDonutOptions, candlestickOptions } from '../data/chartConfigs'

/**
 * MyWallet Page
 * Implementa carousel de cartões, detalhes da carteira e gráficos de visão geral
 */
function MyWallet() {
  const [activeTab, setActiveTab] = useState('Week')

  const walletCards = [
    { id: 1, type: 'bg-1', balance: '$48.200,00', number: '6219  8610  2888  8075', theme: 'dark' },
    { id: 2, type: 'bg-2', balance: '$48.200,00', number: '6219  8610  2888  8075', theme: 'dark' },
    { id: 3, type: 'bg-3', balance: '$48.200,00', number: '6219  8610  2888  8075', theme: 'dark' },
    { id: 4, type: 'bg-4', balance: '$48.200,00', number: '6219  8610  2888  8075', theme: 'light' },
  ]

  const activityData = [
    { title: 'ATM Cash withdrawal', time: '06:24:45 AM', amount: '- $201.50', status: 'Completed', color: 'text-Salmon' },
    { title: 'ATM Cash withdrawal', time: '06:24:45 AM', amount: '- $201.50', status: 'Completed', color: 'text-YellowGreen' }
  ]

  return (
    <Layout activePage="my-wallet" title="My Card">
      <div className="tf-container pb-20">
        <div className="row">
          <div className="col-12">
            <div className="mb-20 flex flex-wrap justify-between gap14 items-center">
              <h6>My Card</h6>
              <div className="flex items-center flex-wrap gap6">
                <a href="#" className="tf-button style-4 f12-bold">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99992 11.3335C8.18881 11.3335 8.34725 11.2695 8.47525 11.1415C8.60281 11.0139 8.66658 10.8557 8.66658 10.6668V8.66683H10.6833C10.8721 8.66683 11.0277 8.60283 11.1499 8.47483C11.2721 8.34727 11.3333 8.18905 11.3333 8.00016C11.3333 7.81127 11.2693 7.65283 11.1413 7.52483C11.0137 7.39727 10.8555 7.3335 10.6666 7.3335H8.66658V5.31683C8.66658 5.12794 8.60281 4.97238 8.47525 4.85016C8.34725 4.72794 8.18881 4.66683 7.99992 4.66683C7.81103 4.66683 7.65281 4.73061 7.52525 4.85816C7.39725 4.98616 7.33325 5.14461 7.33325 5.3335V7.3335H5.31659C5.1277 7.3335 4.97214 7.39727 4.84992 7.52483C4.7277 7.65283 4.66658 7.81127 4.66658 8.00016C4.66658 8.18905 4.73036 8.34727 4.85792 8.47483C4.98592 8.60283 5.14436 8.66683 5.33325 8.66683H7.33325V10.6835C7.33325 10.8724 7.39725 11.0279 7.52525 11.1502C7.65281 11.2724 7.81103 11.3335 7.99992 11.3335ZM7.99992 14.6668C7.0777 14.6668 6.21103 14.4917 5.39992 14.1415C4.58881 13.7917 3.88325 13.3168 3.28325 12.7168C2.68325 12.1168 2.20836 11.4113 1.85859 10.6002C1.50836 9.78905 1.33325 8.92238 1.33325 8.00016C1.33325 7.07794 1.50836 6.21127 1.85859 5.40016C2.20836 4.58905 2.68325 3.8835 3.28325 3.2835C3.88325 2.6835 4.58881 2.20838 5.39992 1.85816C6.21103 1.50838 7.0777 1.3335 7.99992 1.3335C8.92214 1.3335 9.78881 1.50838 10.5999 1.85816C11.411 2.20838 12.1166 2.6835 12.7166 3.2835C13.3166 3.8835 13.7915 4.58905 14.1413 5.40016C14.4915 6.21127 14.6666 7.07794 14.6666 8.00016C14.6666 8.92238 14.4915 9.78905 14.1413 10.6002C13.7915 11.4113 13.3166 12.1168 12.7166 12.7168C12.1166 13.3168 11.411 13.7917 10.5999 14.1415C9.78881 14.4917 8.92214 14.6668 7.99992 14.6668ZM7.99992 13.3335C9.4777 13.3335 10.7361 12.8142 11.7753 11.7755C12.8139 10.7364 13.3333 9.47794 13.3333 8.00016C13.3333 6.52238 12.8139 5.26394 11.7753 4.22483C10.7361 3.18616 9.4777 2.66683 7.99992 2.66683C6.52214 2.66683 5.26392 3.18616 4.22525 4.22483C3.18614 5.26394 2.66659 6.52238 2.66659 8.00016C2.66659 9.47794 3.18614 10.7364 4.22525 11.7755C5.26392 12.8142 6.52214 13.3335 7.99992 13.3335Z" fill="#161326"/>
                  </svg>
                  Add wallet
                </a>
              </div>
            </div>
            <div className="mb-32">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={24}
                slidesPerView={4}
                loop={true}
                autoplay={{ delay: 200, disableOnInteraction: false }}
                className="tf-sw-card"
                breakpoints={{
                  0: { slidesPerView: 1 },
                  500: { slidesPerView: 2 },
                  768: { slidesPerView: 4 }
                }}
              >
                {walletCards.map(card => (
                  <SwiperSlide key={card.id}>
                    <div className={`my-card-item ${card.type}`}>
                      <div className="number">
                        <div className={`f12-medium ${card.theme === 'light' ? 'text-GrayDark' : 'text-GrayDark'}`}>Main Wallet</div>
                        <div className={`label-01 ${card.theme === 'light' ? 'text-White' : ''}`}>{card.balance}</div>
                      </div>
                      <div className="bot">
                        <div className={`f12-medium ${card.theme === 'light' ? 'text-GrayDark' : ''}`}>{card.number}</div>
                      </div>
                      <div className="icon">
                        <svg width="35" height="22" viewBox="0 0 35 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <ellipse cx="10.9373" cy="11" rx="10.9373" ry="11" fill={card.theme === 'light' ? 'white' : '#161326'} fillOpacity={card.theme === 'light' ? '1' : '0.67'}/>
                          <ellipse cx="24.0627" cy="11" rx="10.9373" ry="11" fill={card.theme === 'light' ? 'white' : '#161326'} />
                        </svg>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            
            {/* Card Details & Monthly Limits */}
            <div className="wg-box card-details mb-32">
              <div className="title">
                <h6>Card Details</h6>
                <div className="d-flex gap8">
                  <a href="#" className="tf-button f12-bold">
                    <i className="icon icon-paper"></i>
                    Generate Number
                  </a>
                  <a href="#" className="tf-button f12-bold">
                    <i className="icon icon-edit"></i>
                    Edit
                  </a>
                </div>
              </div>
              <div className="content">
                <div className="left">
                  <ul>
                    <li>
                      <div className="f14-regular text-Black">Card name</div>
                      <div className="f14-bold text-Black">Main Wallet</div>
                    </li>
                    <li>
                      <div className="f14-regular text-Black">Valid Date</div>
                      <div className="f14-bold text-Black">08/26</div>
                    </li>
                    <li>
                      <div className="f14-regular text-Black">Card Number</div>
                      <div className="f14-bold text-Black">****  ****  2888  8075</div>
                    </li>
                    <li>
                      <div className="f14-regular text-Black">Bank Name</div>
                      <div className="f14-bold text-Black">XYZ Central Bank</div>
                    </li>
                    <li>
                      <div className="f14-regular text-Black">Card Holder</div>
                      <div className="f14-bold text-Black">Ferdous Sarker</div>
                    </li>
                    <li>
                      <div className="f14-regular text-Black">Theme</div>
                      <div className="f14-bold text-Black">
                        <div className="flex gap12">
                          <div className="box-item bg-YellowGreen">
                            <i className="icon-check f12-bold"></i>
                          </div>
                          <div className="box-item bg-Orchid"></div>
                          <div className="box-item bg-LightSkyBlue"></div>
                          <div className="box-item bg-Black"></div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="center">
                  <div className="label-02 title">Monthly Limits</div>
                  <ul>
                    <li>
                      <div className="f12-bold mb-4">Main Limits</div>
                      <div className="flex justify-between mb-6">
                        <div className="f12-medium text-Gray">$10,000</div>
                        <div className="f12-bold text-Black">66%</div>
                      </div>
                      <div className="tf-progress-bar">
                        <span style={{ width: '66%' }}></span>
                      </div>
                    </li>
                    <li>
                      <div className="f12-bold mb-4">Seconds</div>
                      <div className="flex justify-between mb-6">
                        <div className="f12-medium text-Gray">$500</div>
                        <div className="f12-bold text-Black">31%</div>
                      </div>
                      <div className="tf-progress-bar type-Orchid">
                        <span style={{ width: '31%' }}></span>
                      </div>
                    </li>
                    <li>
                      <div className="f12-bold mb-4">Others</div>
                      <div className="flex justify-between mb-6">
                        <div className="f12-medium text-Gray">$100</div>
                        <div className="f12-bold text-Black">7%</div>
                      </div>
                      <div className="tf-progress-bar type-LightSkyBlue">
                        <span style={{ width: '7%' }}></span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="right">
                  <div className="wrap-donut" style={{ minHeight: '200px' }}>
                    {walletDonutOptions && walletDonutOptions.options && (
                       <Chart 
                       options={walletDonutOptions.options} 
                       series={walletDonutOptions.series} 
                       type="donut" 
                       height={180} 
                     />
                    )}
                  </div>
                  <ul>
                    <li>
                      <div className="item">
                        <div className="block-legend">
                          <div className="dot bg-LightSkyBlue"></div>
                          <div className="f14-regular text-Gray">Grocery</div>
                        </div>
                        <div className="f14-bold text-Black">56%</div>
                      </div>
                      <div className="item">
                        <div className="block-legend">
                          <div className="dot bg-Khaki"></div>
                          <div className="f14-regular text-Gray">Shopping</div>
                        </div>
                        <div className="f14-bold text-Black">15%</div>
                      </div>
                    </li>
                    <li>
                      <div className="item">
                        <div className="block-legend">
                          <div className="dot bg-LightSkyBlue"></div>
                          <div className="f14-regular text-Gray">Health</div>
                        </div>
                        <div className="f14-bold text-Black">56%</div>
                      </div>
                      <div className="item">
                        <div className="block-legend">
                          <div className="dot bg-Orchid"></div>
                          <div className="f14-regular text-Gray">Rent</div>
                        </div>
                        <div className="f14-bold text-Black">15%</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Balance & Activity Row */}
        <div className="row">
          <div className="col-lg-6 mb-32">
            <div className="flex justify-between items-center mb-16">
              <div>
                <h6 className="mb-4">Overview Balance</h6>
                <div className="f14-regular text-Gray">Avg. income</div>
              </div>
              <div className="tf-select">
                <select className="">
                  <option defaultValue>Weekly (2023)</option>
                  <option>Bit Coin</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between items-center mb-24">
              <div className="flex gap10 items-center">
                <div className="f12-medium">Last Week</div>
                <div className="f12-bold text-YellowGreen">$563,443</div>
              </div>
              <div className="flex gap10 items-center">
                <div className="label-01">$557, 235.31</div>
                <div className="f12-bold text-YellowGreen">+7%</div>
              </div>
            </div>
            <div className="wrap">
              {candlestickOptions && candlestickOptions.options && (
                 <Chart
                   options={candlestickOptions.options} 
                   series={candlestickOptions.series} 
                   type="candlestick"
                   height={350}
                 />
              )}
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="wg-box type-1 bg-Gainsboro widget-tabs style-1 shadow-none">
              <div className="title">
                <h6>Wallet Activity</h6>
                <ul className="widget-menu-tab mb-0">
                  {['Week', 'Month', 'Year'].map(tab => (
                    <li 
                      key={tab} 
                      className={`item-title f12-medium ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      <span className="inner">{tab}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="widget-content-tab">
                  <div className="widget-content-inner active">
                    <div className="f14-regular text-Gray mb-12">Today</div>
                    <ul className="list-wallet-activity">
                      {activityData.map((item, index) => (
                        <li key={index}>
                          <div className={`wallet-activity-item ${index === activityData.length - 1 ? 'pb-0' : ''}`}>
                            <div className="icon">
                              <img src="/images/item/cash.png" alt="" onError={(e) => {e.target.src = '/images/item/coin-1.png'}} />
                            </div>
                            <div className="content">
                              <div className="mb-2">
                                <a href="#" className="f14-bold">{item.title}</a>
                              </div>
                              <div className="f12-medium text-Gray">{item.time}</div>
                            </div>
                            <div className="price f14-bold">{item.amount}</div>
                            <div className={`status f12-bold ${item.color}`}>{item.status}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="f14-regular text-Gray mb-12">24 August</div>
                    <ul className="list-wallet-activity mb-27">
                       {/* Repeat random item needed? Use same map */}
                       <li>
                          <div className="wallet-activity-item pb-0">
                            <div className="icon">
                              <img src="/images/item/cash.png" alt="" onError={(e) => {e.target.src = '/images/item/coin-1.png'}} />
                            </div>
                            <div className="content">
                              <a href="" className="f14-bold mb-2">ATM Cash withdrawal</a>
                              <div className="f12-medium text-Gray">06:24:45 AM</div>
                            </div>
                            <div className="price f14-bold">- $201.50</div>
                            <div className="status f12-bold text-Salmon">Completed</div>
                          </div>
                      </li>
                    </ul>
                    <a href="#" className="tf-button f12-bold w-100">
                      View All
                      <i className="icon icon-send"></i>
                    </a>
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

export default MyWallet
