import { Layout } from '../components'

const NOTIFICATIONS_DATA = [
  { 
    id: 1, 
    title: 'Discount available', 
    desc: 'Morbi sapien massa, ultricies at rhoncus at, ullamcorper nec diam', 
    icon: 'icon-setting-5',
    className: 'item-1'
  },
  { 
    id: 2, 
    title: 'Account has been verified', 
    desc: 'Mauris libero ex, iaculis vitae rhoncus et', 
    icon: 'icon-person',
    className: 'item-2'
  },
  { 
    id: 3, 
    title: 'Order shipped successfully', 
    desc: 'Integer aliquam eros nec sollicitudin sollicitudin', 
    icon: 'icon-message-text1',
    className: 'item-3'
  },
  { 
    id: 4, 
    title: 'Order pending:', 
    titleSpan: 'ID 305830',
    desc: 'Ultricies at rhoncus at ullamcorper', 
    icon: 'icon-sms-tracking',
    className: 'item-4'
  }
]

function Notifications() {
  return (
    <Layout activePage="notifications" title="Notifications">
      <div className="tf-container">
        <div className="wg-box style-1 bg-Gainsboro shadow-none">
          <h5>Notifications</h5>
          <div className="list-notifications">
            {NOTIFICATIONS_DATA.map(item => (
              <div key={item.id} className={`notifications-item ${item.className}`}>
                <div className="image">
                  <i className={item.icon}></i>
                </div>
                <div className="content">
                  <div className="body-title-2">
                    {item.title} {item.titleSpan && <span>{item.titleSpan}</span>}
                  </div>
                  <div className="text-tiny">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Notifications
