import { Layout } from '../components'

const MESSAGES_DATA = [
  { id: 1, name: 'Cameron Williamson', time: '10:13 PM', desc: 'Hello?', img: '/images/avatar/user-1.png' },
  { id: 2, name: 'Ralph Edwards', time: '10:13 PM', desc: 'Are you there? interested i this...', img: '/images/avatar/user-2.png' },
  { id: 3, name: 'Jonathan Smith', time: '10:13 PM', desc: 'Interested in this loads?', img: '/images/avatar/user-3.png' },
  { id: 4, name: 'Marquezz', time: '10:13 PM', desc: 'Okay...Do we have a deal?', img: '/images/avatar/user-4.png' },
  { id: 5, name: 'Cameron Williamson', time: '10:13 PM', desc: 'Hello?', img: '/images/avatar/user-1.png' },
  { id: 6, name: 'Ralph Edwards', time: '10:13 PM', desc: 'Are you there? interested i this...', img: '/images/avatar/user-2.png' },
  { id: 7, name: 'Jonathan Smith', time: '10:13 PM', desc: 'Interested in this loads?', img: '/images/avatar/user-3.png' },
  { id: 8, name: 'Marquezz', time: '10:13 PM', desc: 'Okay...Do we have a deal?', img: '/images/avatar/user-4.png' },
  { id: 9, name: 'Cameron Williamson', time: '10:13 PM', desc: 'Hello?', img: '/images/avatar/user-1.png' },
  { id: 10, name: 'Ralph Edwards', time: '10:13 PM', desc: 'Are you there? interested i this...', img: '/images/avatar/user-2.png' },
  { id: 11, name: 'Jonathan Smith', time: '10:13 PM', desc: 'Interested in this loads?', img: '/images/avatar/user-3.png' },
  { id: 12, name: 'Marquezz', time: '10:13 PM', desc: 'Okay...Do we have a deal?', img: '/images/avatar/user-4.png' }
]

/**
 * Message Page
 * Lista de mensagens do usuário
 */
function Message() {
  return (
    <Layout activePage="component" title="Message">
      <div className="tf-container">
        <div className="wg-box style-1 bg-Gainsboro shadow-none">
          <h5>Message</h5>
          <div className="list-message">
            {MESSAGES_DATA.map(msg => (
              <div key={msg.id} className="wg-user w-full type-lg message-item">
                <div className="image">
                  <img src={msg.img} alt="" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <a href="#" className="f14-bold name">{msg.name}</a>
                    <div className="f12-medium">{msg.time}</div>
                  </div>
                  <div className="f12-regular desc">{msg.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Message
