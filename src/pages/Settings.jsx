import { Layout } from '../components'

/**
 * Settings Page
 * Gerenciamento de segurança e preferências da conta
 */
function Settings() {
  return (
    <Layout activePage="settings" title="Settings">
      <div className="tf-container">
        <div className="wg-box style-1 p-32 gap16 bg-Gainsboro shadow-none mb-23">
          <h5>Account Security</h5>
          <div className="flex flex-wrap row-gap-16 gap36 items-center">
            <div className="flex gap6 items-center">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.492 2.1665H6.50866C3.47533 2.1665 1.66699 3.97484 1.66699 7.00817V13.9832C1.66699 17.0248 3.47533 18.8332 6.50866 18.8332H13.4837C16.517 18.8332 18.3253 17.0248 18.3253 13.9915V7.00817C18.3337 3.97484 16.5253 2.1665 13.492 2.1665ZM12.8003 12.4165C13.042 12.6582 13.042 13.0582 12.8003 13.2998C12.6753 13.4248 12.517 13.4832 12.3587 13.4832C12.2003 13.4832 12.042 13.4248 11.917 13.2998L10.0003 11.3832L8.08366 13.2998C7.95866 13.4248 7.80033 13.4832 7.64199 13.4832C7.48366 13.4832 7.32533 13.4248 7.20033 13.2998C6.95866 13.0582 6.95866 12.6582 7.20033 12.4165L9.11699 10.4998L7.20033 8.58317C6.95866 8.3415 6.95866 7.9415 7.20033 7.69984C7.44199 7.45817 7.84199 7.45817 8.08366 7.69984L10.0003 9.6165L11.917 7.69984C12.1587 7.45817 12.5587 7.45817 12.8003 7.69984C13.042 7.9415 13.042 8.3415 12.8003 8.58317L10.8837 10.4998L12.8003 12.4165Z" fill="#FD7972"/>
              </svg>
              <div className="f14-regular">2 FA</div>
            </div>
            <div className="flex gap6 items-center">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.492 2.1665H6.50866C3.47533 2.1665 1.66699 3.97484 1.66699 7.00817V13.9832C1.66699 17.0248 3.47533 18.8332 6.50866 18.8332H13.4837C16.517 18.8332 18.3253 17.0248 18.3253 13.9915V7.00817C18.3337 3.97484 16.5253 2.1665 13.492 2.1665ZM12.8003 12.4165C13.042 12.6582 13.042 13.0582 12.8003 13.2998C12.6753 13.4248 12.517 13.4832 12.3587 13.4832C12.2003 13.4832 12.042 13.4248 11.917 13.2998L10.0003 11.3832L8.08366 13.2998C7.95866 13.4248 7.80033 13.4832 7.64199 13.4832C7.48366 13.4832 7.32533 13.4248 7.20033 13.2998C6.95866 13.0582 6.95866 12.6582 7.20033 12.4165L9.11699 10.4998L7.20033 8.58317C6.95866 8.3415 6.95866 7.9415 7.20033 7.69984C7.44199 7.45817 7.84199 7.45817 8.08366 7.69984L10.0003 9.6165L11.917 7.69984C12.1587 7.45817 12.5587 7.45817 12.8003 7.69984C13.042 7.9415 13.042 8.3415 12.8003 8.58317L10.8837 10.4998L12.8003 12.4165Z" fill="#FD7972"/>
              </svg>
              <div className="f14-regular">Identify Verification</div>
            </div>
            <div className="flex gap6 items-center">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.492 2.1665H6.50866C3.47533 2.1665 1.66699 3.97484 1.66699 7.00817V13.9832C1.66699 17.0248 3.47533 18.8332 6.50866 18.8332H13.4837C16.517 18.8332 18.3253 17.0248 18.3253 13.9915V7.00817C18.3337 3.97484 16.5253 2.1665 13.492 2.1665ZM13.9837 8.58317L9.25866 13.3082C9.14199 13.4248 8.98366 13.4915 8.81699 13.4915C8.65033 13.4915 8.49199 13.4248 8.37533 13.3082L6.01699 10.9498C5.77533 10.7082 5.77533 10.3082 6.01699 10.0665C6.25866 9.82484 6.65866 9.82484 6.90033 10.0665L8.81699 11.9832L13.1003 7.69984C13.342 7.45817 13.742 7.45817 13.9837 7.69984C14.2253 7.9415 14.2253 8.33317 13.9837 8.58317Z" fill="#2BC155"/>
              </svg>
              <div className="f14-regular">Enable Anti-phising Code</div>
            </div>
            <div className="flex gap6 items-center">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.492 2.1665H6.50866C3.47533 2.1665 1.66699 3.97484 1.66699 7.00817V13.9832C1.66699 17.0248 3.47533 18.8332 6.50866 18.8332H13.4837C16.517 18.8332 18.3253 17.0248 18.3253 13.9915V7.00817C18.3337 3.97484 16.5253 2.1665 13.492 2.1665ZM12.8003 12.4165C13.042 12.6582 13.042 13.0582 12.8003 13.2998C12.6753 13.4248 12.517 13.4832 12.3587 13.4832C12.2003 13.4832 12.042 13.4248 11.917 13.2998L10.0003 11.3832L8.08366 13.2998C7.95866 13.4248 7.80033 13.4832 7.64199 13.4832C7.48366 13.4832 7.32533 13.4248 7.20033 13.2998C6.95866 13.0582 6.95866 12.6582 7.20033 12.4165L9.11699 10.4998L7.20033 8.58317C6.95866 8.3415 6.95866 7.9415 7.20033 7.69984C7.44199 7.45817 7.84199 7.45817 8.08366 7.69984L10.0003 9.6165L11.917 7.69984C12.1587 7.45817 12.5587 7.45817 12.8003 7.69984C13.042 7.9415 13.042 8.3415 12.8003 8.58317L10.8837 10.4998L12.8003 12.4165Z" fill="#FD7972"/>
              </svg>
              <div className="f14-regular">Turn-on Withdrawal Whitelist</div>
            </div>
          </div>
        </div>

        <div className="grid-account-security">
          <div className="left">
            <div className="account-security-item mb-24">
              <div className="heading">
                <div className="label-01 mb-8">2 Factor Authentication</div>
                <div className="f12-regular text-GrayDark">Two-factor authentication is an enhanced security measure. Once enabled, you'll be required to give two types of identification when you log into</div>
              </div>
              <div className="content">
                <div className="content-item">
                  <input className="tf-check flex-shrink-0" type="checkbox" defaultChecked />
                  <div className="icon flex-shrink-0">
                    <i className="icon-google"></i>
                  </div>
                  <div>
                    <div className="mb-6 f12-bold">Google Authentication</div>
                    <div className="f12-regular text-GrayDark">Used for withdrawal & Security verification</div>
                  </div>
                </div>
                <div className="content-item">
                  <input className="tf-check flex-shrink-0" type="checkbox" />
                  <div className="icon flex-shrink-0">
                    <i className="icon-message-text1"></i>
                  </div>
                  <div>
                    <div className="mb-6 f12-bold">SMS Authentication</div>
                    <div className="f12-regular text-GrayDark">Used for withdrawal & Security verification</div>
                  </div>
                </div>
                <div className="content-item">
                  <input className="tf-check flex-shrink-0" type="checkbox" defaultChecked />
                  <div className="icon flex-shrink-0">
                    <i className="icon-sms-tracking"></i>
                  </div>
                  <div>
                    <div className="mb-6 f12-bold">Email Authentication</div>
                    <div className="f12-regular text-GrayDark">Used for withdrawal & Security verification</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="account-security-item mb-24">
              <div className="heading">
                <div className="label-01 mb-8">Identify Verification</div>
                <div className="f12-regular text-GrayDark">Identify Verification is an enhanced security measure. Once enabled, you'll be required to give two types of identification when you log into</div>
              </div>
              <div className="content">
                <div className="content-item">
                  <input className="tf-check flex-shrink-0" type="checkbox" defaultChecked />
                  <div className="icon flex-shrink-0">
                    <i className="icon-person"></i>
                  </div>
                  <div>
                    <div className="mb-6 f12-bold">Manage Identify Verification</div>
                    <div className="f12-regular text-GrayDark">Used for withdrawal & Security verification</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="account-security-item mb-24">
              <div className="heading">
                <div className="label-01 mb-8">Anti-phising Code</div>
                <div className="f12-regular text-GrayDark">Identify Verification is an enhanced security measure. Once enabled, you'll be required to give two types of identification when you log into</div>
              </div>
              <div className="content">
                <div className="content-item">
                  <input className="tf-check flex-shrink-0" type="checkbox" defaultChecked />
                  <div className="icon flex-shrink-0">
                    <i className="icon-message-text1"></i>
                  </div>
                  <div>
                    <div className="mb-6 f12-bold">Enable Anti-phising Code</div>
                    <div className="f12-regular text-GrayDark">Enable Anti-phising Code & Security verification</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="account-security-item d-block mb-24">
              <div className="content-item mb-24">
                <div className="icon flex-shrink-0">
                  <i className="icon-mouse-square"></i>
                </div>
                <div className="flex-grow">
                  <div className="mb-6 f12-bold">Device Management</div>
                  <div className="f12-regular text-GrayDark">Used for withdrawal & Security verification</div>
                </div>
                <a href="#" className="flex-shrink-0 f12-medium">Manage</a>
              </div>
              <div className="content-item">
                <div className="icon flex-shrink-0">
                  <i className="icon-login"></i>
                </div>
                <div className="flex-grow">
                  <div className="mb-6 f12-bold">Login Password</div>
                  <div className="f12-regular text-GrayDark">Used for withdrawal & Security verification</div>
                </div>
                <a href="#" className="flex-shrink-0 f12-medium">Reset</a>
              </div>
            </div>

            <div className="account-security-item d-block mb-24">
              <div className="content-item mb-16">
                <div className="icon flex-shrink-0">
                  <i className="icon-gps"></i>
                </div>
                <div className="flex-grow">
                  <div className="mb-6 f12-bold">Address Management</div>
                  <div className="f12-regular text-GrayDark">Used for withdrawal & Security verification</div>
                </div>
                <a href="#" className="flex-shrink-0 f12-medium">Manage</a>
              </div>
              <div className="flex items-center gap8">
                <div className="f12-medium">Whitelist on</div>
                <input className="tf-check flex-shrink-0" type="checkbox" defaultChecked />
              </div>
            </div>

            <div className="account-security-item d-block mb-24">
              <div className="content-item mb-16">
                <div className="icon flex-shrink-0">
                  <i className="icon-person"></i>
                </div>
                <div className="flex-grow">
                  <div className="mb-6 f12-bold">Account Activity</div>
                  <div className="f12-regular text-GrayDark">Last Signed In</div>
                </div>
                <a href="#" className="flex-shrink-0 f12-medium">Manage</a>
              </div>
              <div>
                <div className="f12-medium">Suspended Account Activity?</div>
                <a href="#" className="f14-bold text-Salmon">Deactivated Account</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Settings
