import { useState } from 'react'
import { Layout } from '../components'
import { transactions } from '../data/mockData'
import { useCheckboxes } from '../hooks/useInteractions'
import user3 from '../assets/images/avatar/user-3.png'
import user4 from '../assets/images/avatar/user-4.png'
import coin1 from '../assets/images/item/coin-1.png'
import coin2 from '../assets/images/item/coin-2.png'
import coin3 from '../assets/images/item/coin-3.png'


function Transaction() {
  const { checkedItems, selectAll, toggleItem, toggleAll } = useCheckboxes(transactions)
  // State apenas para checkboxes visuais da UI (simulação)
  // Na versão real, usaria o hook useCheckboxes conectado aos dados reais

  // Status Classes helper
  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': 
        return (
          <div className="box-status bg-YellowGreen">
            <i className="icon icon-check"></i>
            <span className="font-poppins">COMPLETED</span> 
          </div>
        )
      case 'pending': 
        return (
          <div className="box-status bg-LightGray">
            <span className="font-poppins">PENDING</span> 
          </div>
        )
      case 'canceled': 
        return (
          <div className="box-status bg-LightGray type-red">
            <span className="font-poppins">CANCELED</span> 
          </div>
        )
      default: return null
    }
  }

  return (
    <Layout activePage="transaction" title="Transaction">
      <div className="tf-container">
        
        {/* Topbar Search & Actions */}
        <div className="topbar-search">
            <form className="form-search flex-grow">
                <fieldset className="name">
                    <input type="text" placeholder="Search" className="show-search style-1" name="name" tabIndex="2" aria-required="true" required />
                </fieldset>
                <div className="button-submit">
                    <button className="" type="submit"><i className="icon-search-normal1"></i></button>
                </div>
            </form>
            <div className="right">
                <a href="#" className="tf-button style-2 f12-bold d-md-flex d-none">
                    <i className="icon icon-receive-square"></i>
                    Get Report
                </a>
                <div className="dropdown default style-fill">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="icon icon-setting-5"></i>
                        Filter
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><a href="#">A - Z</a></li>
                        <li><a href="#">Z - A</a></li>
                    </ul>
                </div>
                <select className="image-select center d-md-flex d-none">
                    <option defaultValue>Newest</option>
                    <option>Lasted</option>
                </select>
                <div>
                    <div className="dropdown default">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           <span className="">
                               <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M12.2918 15.8333C12.2918 17.1 11.2668 18.125 10.0002 18.125C8.7335 18.125 7.7085 17.1 7.7085 15.8333C7.7085 14.5667 8.7335 13.5417 10.0002 13.5417C11.2668 13.5417 12.2918 14.5667 12.2918 15.8333ZM8.9585 15.8333C8.9585 16.4083 9.42516 16.875 10.0002 16.875C10.5752 16.875 11.0418 16.4083 11.0418 15.8333C11.0418 15.2583 10.5752 14.7917 10.0002 14.7917C9.42516 14.7917 8.9585 15.2583 8.9585 15.8333Z" fill="#161326"/>
                                   <path d="M12.2918 4.16683C12.2918 5.4335 11.2668 6.4585 10.0002 6.4585C8.7335 6.4585 7.7085 5.4335 7.7085 4.16683C7.7085 2.90016 8.7335 1.87516 10.0002 1.87516C11.2668 1.87516 12.2918 2.90016 12.2918 4.16683ZM8.9585 4.16683C8.9585 4.74183 9.42516 5.2085 10.0002 5.2085C10.5752 5.2085 11.0418 4.74183 11.0418 4.16683C11.0418 3.59183 10.5752 3.12516 10.0002 3.12516C9.42516 3.12516 8.9585 3.59183 8.9585 4.16683Z" fill="#161326"/>
                                   <path d="M12.2918 9.99984C12.2918 11.2665 11.2668 12.2915 10.0002 12.2915C8.7335 12.2915 7.7085 11.2665 7.7085 9.99984C7.7085 8.73317 8.7335 7.70817 10.0002 7.70817C11.2668 7.70817 12.2918 8.73317 12.2918 9.99984ZM8.9585 9.99984C8.9585 10.5748 9.42516 11.0415 10.0002 11.0415C10.5752 11.0415 11.0418 10.5748 11.0418 9.99984C11.0418 9.42484 10.5752 8.95817 10.0002 8.95817C9.42516 8.95817 8.9585 9.42484 8.9585 9.99984Z" fill="#161326"/>
                               </svg>
                           </span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><a href="#">This Week</a></li>
                            <li><a href="#">This Day</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* Table List Transaction */}
        <div className="table-list-transaction">
            {/* Table Head Custom Div */}
            <div className="list-transaction-head">
                <div>
                    <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="28.6282" height="19" rx="3.5" stroke="white"/>
                        <rect x="4.5" y="4.5" width="11" height="11" rx="3.5" stroke="white"/>
                        <path d="M23.2115 11.3205L25.0138 8.96357C25.2654 8.63456 25.0308 8.15984 24.6166 8.15984L21.012 8.15984C20.5978 8.15984 20.3632 8.63456 20.6148 8.96357L22.4171 11.3205C22.6173 11.5822 23.0114 11.5822 23.2115 11.3205Z" fill="white"/>
                    </svg>
                    <div className="f12-bold text-White">Transaction ID</div>
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.1618 3.9199C7.1618 4.03073 7.12095 4.14158 7.03345 4.22908C6.86428 4.39825 6.58429 4.39825 6.41512 4.22908L4.55428 2.36825L2.69345 4.22908C2.52428 4.39825 2.24428 4.39825 2.07512 4.22908C1.90595 4.05992 1.90595 3.77992 2.07512 3.61075L4.24514 1.44073C4.3268 1.35906 4.43762 1.31242 4.55428 1.31242C4.67095 1.31242 4.7818 1.35906 4.86347 1.44073L7.03345 3.61075C7.11512 3.69825 7.1618 3.80906 7.1618 3.9199Z" fill="white"/>
                        <path d="M4.9917 1.75L4.9917 12.25C4.9917 12.4892 4.79337 12.6875 4.5542 12.6875C4.31503 12.6875 4.1167 12.4892 4.1167 12.25L4.1167 1.75C4.1167 1.51083 4.31503 1.3125 4.5542 1.3125C4.79337 1.3125 4.9917 1.51083 4.9917 1.75Z" fill="white"/>
                        <path d="M13.3161 10.08C13.3161 10.1909 13.2752 10.3017 13.1877 10.3892L11.0177 12.5592C10.9361 12.6409 10.8252 12.6875 10.7086 12.6875C10.5919 12.6875 10.4811 12.6409 10.3994 12.5592L8.22941 10.3892C8.06025 10.22 8.06025 9.94 8.22941 9.77083C8.39858 9.60167 8.67858 9.60167 8.84775 9.77083L10.7086 11.6317L12.5694 9.77083C12.7385 9.60167 13.0186 9.60167 13.1877 9.77083C13.2752 9.8525 13.3161 9.96335 13.3161 10.08Z" fill="white"/>
                        <path d="M11.1401 1.75L11.1401 12.25C11.1401 12.4892 10.9418 12.6875 10.7026 12.6875C10.4635 12.6875 10.2651 12.4892 10.2651 12.25L10.2651 1.75C10.2651 1.51083 10.4635 1.3125 10.7026 1.3125C10.9418 1.3125 11.1401 1.51083 11.1401 1.75Z" fill="white"/>
                    </svg>
                </div>
                <div>
                    <div className="f12-bold text-White">Date</div>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.24038 5.32045L8.57191 0.963819C8.82351 0.634814 8.58891 0.160095 8.17473 0.160095L1.51167 0.160095C1.09749 0.160095 0.862898 0.634814 1.11449 0.96382L4.44602 5.32045C4.64614 5.58215 5.04026 5.58215 5.24038 5.32045Z" fill="white"/>
                    </svg>
                </div>
                <div>
                    <div className="f12-bold text-White">Form</div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M6.53338 3.9199C6.53338 4.03073 6.49253 4.14158 6.40503 4.22908C6.23587 4.39825 5.95587 4.39825 5.7867 4.22908L3.92587 2.36825L2.06503 4.22908C1.89586 4.39825 1.61587 4.39825 1.4467 4.22908C1.27753 4.05992 1.27753 3.77992 1.4467 3.61075L3.61672 1.44073C3.69838 1.35906 3.8092 1.31242 3.92587 1.31242C4.04253 1.31242 4.15338 1.35906 4.23505 1.44073L6.40503 3.61075C6.4867 3.69825 6.53338 3.80906 6.53338 3.9199Z" fill="white"/>
                         <path d="M4.36328 1.75L4.36328 12.25C4.36328 12.4892 4.16495 12.6875 3.92578 12.6875C3.68661 12.6875 3.48828 12.4892 3.48828 12.25L3.48828 1.75C3.48828 1.51083 3.68661 1.3125 3.92578 1.3125C4.16495 1.3125 4.36328 1.51083 4.36328 1.75Z" fill="white"/>
                         <path d="M12.6876 10.08C12.6876 10.1909 12.6468 10.3017 12.5593 10.3892L10.3893 12.5592C10.3076 12.6409 10.1968 12.6875 10.0802 12.6875C9.9635 12.6875 9.85265 12.6409 9.77098 12.5592L7.601 10.3892C7.43183 10.22 7.43183 9.94 7.601 9.77083C7.77016 9.60167 8.05016 9.60167 8.21933 9.77083L10.0802 11.6317L11.941 9.77083C12.1101 9.60167 12.3902 9.60167 12.5593 9.77083C12.6468 9.8525 12.6876 9.96335 12.6876 10.08Z" fill="white"/>
                         <path d="M10.5117 1.75L10.5117 12.25C10.5117 12.4892 10.3134 12.6875 10.0742 12.6875C9.83505 12.6875 9.63672 12.4892 9.63672 12.25L9.63672 1.75C9.63672 1.51083 9.83505 1.3125 10.0742 1.3125C10.3134 1.3125 10.5117 1.51083 10.5117 1.75Z" fill="white"/>
                    </svg>
                </div>
                <div>
                    <div className="f12-bold text-White">To</div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.53338 3.9199C6.53338 4.03073 6.49253 4.14158 6.40503 4.22908C6.23587 4.39825 5.95587 4.39825 5.7867 4.22908L3.92587 2.36825L2.06503 4.22908C1.89586 4.39825 1.61587 4.39825 1.4467 4.22908C1.27753 4.05992 1.27753 3.77992 1.4467 3.61075L3.61672 1.44073C3.69838 1.35906 3.8092 1.31242 3.92587 1.31242C4.04253 1.31242 4.15338 1.35906 4.23505 1.44073L6.40503 3.61075C6.4867 3.69825 6.53338 3.80906 6.53338 3.9199Z" fill="white"/>
                        <path d="M4.36328 1.75L4.36328 12.25C4.36328 12.4892 4.16495 12.6875 3.92578 12.6875C3.68661 12.6875 3.48828 12.4892 3.48828 12.25L3.48828 1.75C3.48828 1.51083 3.68661 1.3125 3.92578 1.3125C4.16495 1.3125 4.36328 1.51083 4.36328 1.75Z" fill="white"/>
                        <path d="M12.6876 10.08C12.6876 10.1909 12.6468 10.3017 12.5593 10.3892L10.3893 12.5592C10.3076 12.6409 10.1968 12.6875 10.0802 12.6875C9.9635 12.6875 9.85265 12.6409 9.77098 12.5592L7.601 10.3892C7.43183 10.22 7.43183 9.94 7.601 9.77083C7.77016 9.60167 8.05016 9.60167 8.21933 9.77083L10.0802 11.6317L11.941 9.77083C12.1101 9.60167 12.3902 9.60167 12.5593 9.77083C12.6468 9.8525 12.6876 9.96335 12.6876 10.08Z" fill="white"/>
                        <path d="M10.5117 1.75L10.5117 12.25C10.5117 12.4892 10.3134 12.6875 10.0742 12.6875C9.83505 12.6875 9.63672 12.4892 9.63672 12.25L9.63672 1.75C9.63672 1.51083 9.83505 1.3125 10.0742 1.3125C10.3134 1.3125 10.5117 1.51083 10.5117 1.75Z" fill="white"/>
                    </svg>
                </div>
                <div>
                    <div className="f12-bold text-White">Coin</div>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.24038 5.32045L8.57191 0.963819C8.82351 0.634814 8.58891 0.160095 8.17473 0.160095L1.51167 0.160095C1.09749 0.160095 0.862898 0.634814 1.11449 0.96382L4.44602 5.32045C4.64614 5.58215 5.04026 5.58215 5.24038 5.32045Z" fill="white"/>
                    </svg>
                </div>
                <div>
                    <div className="f12-bold text-White">Amount</div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.53338 3.9199C6.53338 4.03073 6.49253 4.14158 6.40503 4.22908C6.23587 4.39825 5.95587 4.39825 5.7867 4.22908L3.92587 2.36825L2.06503 4.22908C1.89586 4.39825 1.61587 4.39825 1.4467 4.22908C1.27753 4.05992 1.27753 3.77992 1.4467 3.61075L3.61672 1.44073C3.69838 1.35906 3.8092 1.31242 3.92587 1.31242C4.04253 1.31242 4.15338 1.35906 4.23505 1.44073L6.40503 3.61075C6.4867 3.69825 6.53338 3.80906 6.53338 3.9199Z" fill="white"/>
                        <path d="M4.36328 1.75L4.36328 12.25C4.36328 12.4892 4.16495 12.6875 3.92578 12.6875C3.68661 12.6875 3.48828 12.4892 3.48828 12.25L3.48828 1.75C3.48828 1.51083 3.68661 1.3125 3.92578 1.3125C4.16495 1.3125 4.36328 1.51083 4.36328 1.75Z" fill="white"/>
                        <path d="M12.6876 10.08C12.6876 10.1909 12.6468 10.3017 12.5593 10.3892L10.3893 12.5592C10.3076 12.6409 10.1968 12.6875 10.0802 12.6875C9.9635 12.6875 9.85265 12.6409 9.77098 12.5592L7.601 10.3892C7.43183 10.22 7.43183 9.94 7.601 9.77083C7.77016 9.60167 8.05016 9.60167 8.21933 9.77083L10.0802 11.6317L11.941 9.77083C12.1101 9.60167 12.3902 9.60167 12.5593 9.77083C12.6468 9.8525 12.6876 9.96335 12.6876 10.08Z" fill="white"/>
                        <path d="M10.5117 1.75L10.5117 12.25C10.5117 12.4892 10.3134 12.6875 10.0742 12.6875C9.83505 12.6875 9.63672 12.4892 9.63672 12.25L9.63672 1.75C9.63672 1.51083 9.83505 1.3125 10.0742 1.3125C10.3134 1.3125 10.5117 1.51083 10.5117 1.75Z" fill="white"/>
                    </svg>
                </div>
                <div>
                    <div className="f12-bold text-White">Status</div>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 6.4585H2.5C2.15833 6.4585 1.875 6.17516 1.875 5.8335C1.875 5.49183 2.15833 5.2085 2.5 5.2085H17.5C17.8417 5.2085 18.125 5.49183 18.125 5.8335C18.125 6.17516 17.8417 6.4585 17.5 6.4585Z" fill="white"/>
                        <path d="M15 10.625H5C4.65833 10.625 4.375 10.3417 4.375 10C4.375 9.65833 4.65833 9.375 5 9.375H15C15.3417 9.375 15.625 9.65833 15.625 10C15.625 10.3417 15.3417 10.625 15 10.625Z" fill="white"/>
                        <path d="M11.6668 14.7915H8.3335C7.99183 14.7915 7.7085 14.5082 7.7085 14.1665C7.7085 13.8248 7.99183 13.5415 8.3335 13.5415H11.6668C12.0085 13.5415 12.2918 13.8248 12.2918 14.1665C12.2918 14.5082 12.0085 14.7915 11.6668 14.7915Z" fill="white"/>
                    </svg>
                </div>
            </div>

            <table className="list-transaction-content w-100">
                <tbody>
                    {/* Linha mockada 1 - Completed (Bitcoin) */}
                    <tr className="tf-table-item checked">
                        <td>
                            <div className="tf-cart-checkbox">
                                <div className="tf-checkbox-wrapp">
                                    <input className="checkbox-item" type="checkbox" name="transaction_checkbox" defaultChecked />
                                    <div><i className="icon-check"></i></div>
                                </div>
                                <div className="f12-medium text-break" data-title="Transaction ID : ">#124567899654</div>
                            </div>
                        </td>
                        <td>
                            <div className="f12-bold">
                                January 24, 2022 <br/>
                                <span className="f12-medium">5.20 PM</span>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image">
                                <div className="image"><img src={user3} alt="User" /></div>
                                <div className="f12-medium">Marquezz</div>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image">
                                <div className="image"><img src={user4} alt="User" /></div>
                                <div className="f12-medium">Jarinas Tom</div>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image style-1">
                                <div className="image"><img src={coin1} alt="Bitcoin" /></div>
                                <div className="f12-bold">Bitcoin</div>
                            </div>
                        </td>
                        <td>
                            <div className="f12-medium" data-title="Amount : ">$455.00</div>
                        </td>
                        <td>
                            {getStatusBadge('completed')}
                        </td>
                    </tr>

                    {/* Linha mockada 2 - Completed (Ethereum) */}
                     <tr className="tf-table-item">
                        <td>
                            <div className="tf-cart-checkbox">
                                <div className="tf-checkbox-wrapp">
                                    <input className="checkbox-item" type="checkbox" name="transaction_checkbox" />
                                    <div><i className="icon-check"></i></div>
                                </div>
                                <div className="f12-medium text-break" data-title="Transaction ID : ">#124567899654</div>
                            </div>
                        </td>
                        <td>
                            <div className="f12-bold">
                                January 24, 2022 <br/>
                                <span className="f12-medium">5.20 PM</span>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image">
                                <div className="image"><img src={user3} alt="User" /></div>
                                <div className="f12-medium">Marquezz</div>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image">
                                <div className="image"><img src={user4} alt="User" /></div>
                                <div className="f12-medium">Jarinas Tom</div>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image style-1">
                                <div className="image"><img src={coin2} alt="Ethereum" /></div>
                                <div className="f12-bold">Ethereum</div>
                            </div>
                        </td>
                        <td>
                            <div className="f12-medium" data-title="Amount : ">$455.00</div>
                        </td>
                        <td>
                            {getStatusBadge('completed')}
                        </td>
                    </tr>

                    {/* Linha mockada 3 - Pending (Monero) */}
                    <tr className="tf-table-item">
                        <td>
                            <div className="tf-cart-checkbox">
                                <div className="tf-checkbox-wrapp">
                                    <input className="checkbox-item" type="checkbox" name="transaction_checkbox" />
                                    <div><i className="icon-check"></i></div>
                                </div>
                                <div className="f12-medium text-break" data-title="Transaction ID : ">#124567899654</div>
                            </div>
                        </td>
                        <td>
                            <div className="f12-bold">
                                January 24, 2022 <br/>
                                <span className="f12-medium">5.20 PM</span>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image">
                                <div className="image"><img src={user3} alt="User" /></div>
                                <div className="f12-medium">Marquezz</div>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image">
                                <div className="image"><img src={user4} alt="User" /></div>
                                <div className="f12-medium">Jarinas Tom</div>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image style-1">
                                <div className="image"><img src={coin3} alt="Monero" /></div>
                                <div className="f12-bold">Monero</div>
                            </div>
                        </td>
                        <td>
                            <div className="f12-medium" data-title="Amount : ">$455.00</div>
                        </td>
                        <td>
                            {getStatusBadge('pending')}
                        </td>
                    </tr>

                    {/* Linha mockada 4 - Completed (Bitcoin) */}
                     <tr className="tf-table-item">
                        <td>
                            <div className="tf-cart-checkbox">
                                <div className="tf-checkbox-wrapp">
                                    <input className="checkbox-item" type="checkbox" name="transaction_checkbox" />
                                    <div><i className="icon-check"></i></div>
                                </div>
                                <div className="f12-medium text-break" data-title="Transaction ID : ">#124567899654</div>
                            </div>
                        </td>
                        <td>
                            <div className="f12-bold">
                                January 24, 2022 <br/>
                                <span className="f12-medium">5.20 PM</span>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image">
                                <div className="image"><img src={user3} alt="User" /></div>
                                <div className="f12-medium">Marquezz</div>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image">
                                <div className="image"><img src={user4} alt="User" /></div>
                                <div className="f12-medium">Jarinas Tom</div>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image style-1">
                                <div className="image"><img src={coin1} alt="Bitcoin" /></div>
                                <div className="f12-bold">Bitcoin</div>
                            </div>
                        </td>
                        <td>
                            <div className="f12-medium" data-title="Amount : ">$455.00</div>
                        </td>
                        <td>
                            {getStatusBadge('completed')}
                        </td>
                    </tr>

                     {/* Linha mockada 5 - Canceled (Monero) */}
                     <tr className="tf-table-item">
                        <td>
                            <div className="tf-cart-checkbox">
                                <div className="tf-checkbox-wrapp">
                                    <input className="checkbox-item" type="checkbox" name="transaction_checkbox" />
                                    <div><i className="icon-check"></i></div>
                                </div>
                                <div className="f12-medium text-break" data-title="Transaction ID : ">#124567899654</div>
                            </div>
                        </td>
                        <td>
                            <div className="f12-bold">
                                January 24, 2022 <br/>
                                <span className="f12-medium">5.20 PM</span>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image">
                                <div className="image"><img src={user3} alt="User" /></div>
                                <div className="f12-medium">Marquezz</div>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image">
                                <div className="image"><img src={user4} alt="User" /></div>
                                <div className="f12-medium">Jarinas Tom</div>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image style-1">
                                <div className="image"><img src={coin3} alt="Monero" /></div>
                                <div className="f12-bold">Monero</div>
                            </div>
                        </td>
                        <td>
                            <div className="f12-medium" data-title="Amount : ">$455.00</div>
                        </td>
                        <td>
                            {getStatusBadge('canceled')}
                        </td>
                    </tr>

                    {/* Linha mockada 6 - Completed (Bitcoin) */}
                    <tr className="tf-table-item checked">
                        <td>
                            <div className="tf-cart-checkbox">
                                <div className="tf-checkbox-wrapp">
                                    <input className="checkbox-item" type="checkbox" name="transaction_checkbox" defaultChecked />
                                    <div><i className="icon-check"></i></div>
                                </div>
                                <div className="f12-medium text-break" data-title="Transaction ID : ">#124567899654</div>
                            </div>
                        </td>
                        <td>
                            <div className="f12-bold">
                                January 24, 2022 <br/>
                                <span className="f12-medium">5.20 PM</span>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image">
                                <div className="image"><img src={user3} alt="User" /></div>
                                <div className="f12-medium">Marquezz</div>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image">
                                <div className="image"><img src={user4} alt="User" /></div>
                                <div className="f12-medium">Jarinas Tom</div>
                            </div>
                        </td>
                        <td>
                            <div className="wrap-image style-1">
                                <div className="image"><img src={coin1} alt="Bitcoin" /></div>
                                <div className="f12-bold">Bitcoin</div>
                            </div>
                        </td>
                        <td>
                            <div className="f12-medium" data-title="Amount : ">$455.00</div>
                        </td>
                        <td>
                            {getStatusBadge('completed')}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
      </div>
    </Layout>
  )
}

export default Transaction
