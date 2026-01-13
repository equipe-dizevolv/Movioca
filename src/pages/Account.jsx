import { useState } from 'react'
import { Layout } from '../components'
import Chart from 'react-apexcharts'
import { smallChartOptions, lineChartTwolineOptions } from '../data/chartConfigs'

/**
 * Account Page
 * Exibe perfil do usuário, holdings de cartões e gráfico de atividade
 */
function Account() {
  const [activeTab, setActiveTab] = useState('Week')

  const cardHoldings = [
    {
      id: 1,
      coin: 'Bit Coin',
      balance: '$48.200,00',
      change: '+4%',
      changeType: 'positive',
      buyPrice: '$563,443',
      sellPrice: '$563,443',
      theme: 'bg-YellowGreen',
      isDarkItems: false,
      chartConfig: smallChartOptions.chart4
    },
    {
      id: 2,
      coin: 'Dash Coin',
      balance: '$48.200,00',
      change: '+4%',
      changeType: 'positive',
      buyPrice: '$563,443',
      sellPrice: '$563,443',
      theme: 'bg-blue-1',
      isDarkItems: false,
      chartConfig: smallChartOptions.chart2
    },
    {
      id: 3,
      coin: 'Wave',
      balance: '$48.200,00',
      change: '+4%',
      changeType: 'positive',
      buyPrice: '$563,443',
      sellPrice: '$563,443',
      theme: 'bg-pink-1',
      isDarkItems: false,
      chartConfig: smallChartOptions.chart3
    },
    {
      id: 4,
      coin: 'Peer Coin',
      balance: '$48.200,00',
      change: '+4%',
      changeType: 'positive',
      buyPrice: '$563,443',
      sellPrice: '$563,443',
      theme: 'bg-Black',
      isDarkItems: true,
      chartConfig: smallChartOptions.chart1 
    }
  ]

  const activityData = [
    { title: 'ATM Cash withdrawal', time: '06:24:45 AM', amount: '- $201.50', status: 'Completed', color: 'text-Salmon' },
    { title: 'ATM Cash withdrawal', time: '06:24:45 AM', amount: '- $201.50', status: 'Completed', color: 'text-YellowGreen' }
  ]

  return (
    <Layout activePage="account" title="Account">
      <div className="tf-container pb-20">
        <div className="row">
          {/* Left Column: Profile */}
          <div className="col-lg-4">
            <div className="wg-profile">
              <div className="dropdown default">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="icon-more text-White"></span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a href="/my-wallet">My Wallet</a></li>
                  <li><a href="/settings">Setting</a></li>
                </ul>
              </div>
              <div className="image-bg">
                <img src="/images/item/bg-profile.png" alt="" />
              </div>
              <div className="content">
                <div className="avatar">
                  <img src="/images/avatar/user-2.png" alt="" />
                </div>
                <h6 className="name mb-2">
                  <a href="#">Jonathan Smith</a>
                </h6>
                <div className="join-time f12-medium text-Gray">Join on <span className="text-Black time">24March, 20120</span></div>
                <div className="connect">
                  <div className="f12-medium text-Gray">Connect with</div>
                  <ul className="tf-social">
                    <li><a href="#"><i className="icon-calling"></i></a></li>
                    <li><a href="#"><i className="icon-message-text"></i></a></li>
                    <li><a href="#"><i className="icon-facebook"></i></a></li>
                  </ul>
                </div>
              </div>
              <a href="#" className="tf-button f12-bold w-100 bg-Gainsboro">
                <i className="icon icon-edit"></i>
                Edit Profile
              </a>
            </div>
          </div>

          {/* Right Column: Card Holding */}
          <div className="col-lg-8">
            <div className="flex justify-between items-center mb-24 mt-24">
              <h6 className="">Card Holding</h6>
              <div className="dropdown default">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="icon-more"></span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a href="#">This Week</a></li>
                  <li><a href="#">This Day</a></li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap24 flex-md-row flex-column mb-16 row-gap-0">
              <div className="w-100">
                {cardHoldings.slice(0, 2).map(item => (
                  <div key={item.id} className={`wg-card style-1 ${item.theme} mb-16`}>
                    <div className="flex items-center gap8">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="12" fill="white"/>
                        <circle cx="20" cy="20" r="8" fill="black" />
                      </svg>
                      <div className={`f12-bold ${item.isDarkItems ? 'text-White' : ''}`}>{item.coin}</div>
                    </div>
                    <div className="content">
                      <div className="flex gap2 align-items-end flex-wrap">
                        <h6 className={`mb-0 ${item.isDarkItems ? 'text-White' : ''}`}>{item.balance}</h6>
                        <div className={`f12-medium ${item.isDarkItems ? 'text-White' : ''}`}>{item.change} <span className="text-GrayDark">This Week</span></div>
                      </div>
                      <div className="chart-small">
                        {item.chartConfig && (
                           <Chart 
                             options={item.chartConfig.options} 
                             series={item.chartConfig.series} 
                             type="area" 
                             height={55} 
                             width={120}
                           />
                        )}
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="infor-number">
                        <div className="flex gap4 f12-medium">
                          <span className="text-GrayDark">Buy</span>
                          <span className={`${item.isDarkItems ? 'text-White' : ''}`}>{item.buyPrice}</span>
                        </div>
                        <div className="flex gap8 f12-medium">
                          <span className="text-GrayDark">Sell</span>
                          <span className={`${item.isDarkItems ? 'text-White' : ''}`}>{item.sellPrice}</span>
                        </div>
                      </div>
                      <a href="#" className={`tf-btn-default f12-bold ${item.isDarkItems ? 'style-white' : 'style-1'}`}>
                        Details
                        <i className="icon-send1"></i>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-100">
                {cardHoldings.slice(2, 4).map(item => (
                  <div key={item.id} className={`wg-card style-1 ${item.theme} mb-16`}>
                    <div className="flex items-center gap8">
                       <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="12" fill="white"/>
                        <circle cx="20" cy="20" r="8" fill="black" />
                      </svg>
                      <div className={`f12-bold ${item.isDarkItems ? 'text-White' : ''}`}>{item.coin}</div>
                    </div>
                    <div className="content">
                      <div className="flex gap2 align-items-end flex-wrap">
                        <h6 className={`mb-0 ${item.isDarkItems ? 'text-White' : ''}`}>{item.balance}</h6>
                        <div className={`f12-medium ${item.isDarkItems ? 'text-White' : ''}`}>{item.change} <span className="text-GrayDark">This Week</span></div>
                      </div>
                      <div className="chart-small">
                          {item.chartConfig && (
                           <Chart 
                             options={item.chartConfig.options} 
                             series={item.chartConfig.series} 
                             type="area" 
                             height={55} 
                             width={120}
                           />
                        )}
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="infor-number">
                         <div className="flex gap4 f12-medium">
                          <span className="text-GrayDark">Buy</span>
                          <span className={`${item.isDarkItems ? 'text-White' : ''}`}>{item.buyPrice}</span>
                        </div>
                        <div className="flex gap8 f12-medium">
                          <span className="text-GrayDark">Sell</span>
                          <span className={`${item.isDarkItems ? 'text-White' : ''}`}>{item.sellPrice}</span>
                        </div>
                      </div>
                      <a href="#" className={`tf-btn-default f12-bold ${item.isDarkItems ? 'style-white' : ''}`}>
                        Details
                        <i className="icon-send1"></i>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Activity & Graph */}
        <div className="row">
          <div className="col-lg-6">
            <div className="wg-box type-1 bg-Gainsboro widget-tabs style-1 shadow-none mb-32">
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
                    {/* Repeated section for demo */}
                    <div className="f14-regular text-Gray mb-12">24 August</div>
                    <ul className="list-wallet-activity mb-27">
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
          
          <div className="col-lg-6">
            <div className="wg-box shadow-none pt-32 pr-32">
              <div className="title">
                <h6>Current Graph</h6>
                <div className="dropdown default">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="icon-more"></span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><a href="#">This Week</a></li>
                    <li><a href="#">This Day</a></li>
                  </ul>
                </div>
              </div>
              <div className="line-chart">
                 {lineChartTwolineOptions && lineChartTwolineOptions.options && (
                   <Chart 
                     options={lineChartTwolineOptions.options} 
                     series={lineChartTwolineOptions.series} 
                     type="line" 
                     height={350} 
                   />
                 )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default Account
