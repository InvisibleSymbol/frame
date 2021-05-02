import React from 'react'
import Restore from 'react-restore'
import link from '../../resources/link'
import svg from '../../resources/svg'

import Signer from './Signer'

import AddHardware from './Add/AddHardware'
import AddAragon from './Add/AddAragon'
import AddPhrase from './Add/AddPhrase'
import AddRing from './Add/AddRing'
import AddAddress from './Add/AddAddress'

class AddAccounts extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {
      view: 'default'
    }
  }
  renderAddNonsigning () {
    return (
      <div className='addAccounts cardShow'>
       <AddAddress />          
      </div>
    )
  }
  renderAddKeystore () {
    return (
      <div className='addAccounts cardShow'>
        <AddRing />
      </div>
    )
  }
  renderAddSeed () {
    return (
      <div className='addAccounts cardShow'>
       <AddPhrase />
      </div>
    )
  }
  renderAddTrezor () {
    return (
      <div className='addAccounts cardShow'>
       <AddHardware type={'trezor'} />
      </div>
    )
  }
  renderAddLedger () {
    return (
      <div className='addAccounts cardShow'>
       <AddHardware type={'ledger'} />
      </div>
    )
  }
  renderAddLattice () {
    return (
      <div className='addAccounts cardShow'>
       {'Add Lattice'}
      </div>
    )
  }
  renderAddGnosis () {
    return (
      <div className='addAccounts cardShow'>
       {'Add Gnosis'}
      </div>
    )
  }
  renderAddAragon () {
    return (
      <div className='addAccounts cardShow'>
       <AddAragon />
      </div>
    )
  }
  renderDefault () {
    return (
      <div className='addAccounts cardShow'>
        <div className='accountTypeSelect' onMouseDown={() => this.setState({ view: 'aragon' })}>Aragon DAO</div>
        {/* <div className='accountTypeSelect' onMouseDown={() => this.setState({ view: 'gnosis' })}>Gnosis Safe</div> */}
        <div className='accountTypeSelect' onMouseDown={() => this.setState({ view: 'ledger' })}>Ledger Wallet</div>
        <div className='accountTypeSelect' onMouseDown={() => this.setState({ view: 'trezor' })}>Trezor Wallet</div>
        <div className='accountTypeSelect' onMouseDown={() => this.setState({ view: 'lattice' })}>Grid+ Lattice1</div>
        <div className='accountTypeSelect' onMouseDown={() => this.setState({ view: 'seed' })}>Seed Phrase</div>
        <div className='accountTypeSelect' onMouseDown={() => this.setState({ view: 'keystore' })}>Keystore.json</div>
        <div className='accountTypeSelect' onMouseDown={() => this.setState({ view: 'nonsigning' })}>Non-signing Account</div>
      </div>
    )
  }
  render () {
    const view = this.state.view
    if (view === 'default') {
      return this.renderDefault()
    } else if (view === 'aragon')  {
      return this.renderAddAragon()
    // } else if (view === 'gnosis')  {
    //   return this.renderAddGnosis()
    } else if (view === 'ledger')  {
      return this.renderAddLedger()
    } else if (view === 'trezor')  {
      return this.renderAddTrezor()
    } else if (view === 'lattice')  {
      return this.renderAddLattice()
    } else if (view === 'seed')  {
      return this.renderAddSeed()
    } else if (view === 'keystore')  {
      return this.renderAddKeystore()
    } else if (view === 'nonsigning')  {
      return this.renderAddNonsigning()
    } else {
      return 'Cannot find ' + view
    }
  }
}

class Dash extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.input = React.createRef()
    this.state = {
      showAddAccounts: false
    }
  }
  render () {
      const hardwareSigners = Object.keys(this.store('main.signers')).map(s => {
        const signer = this.store('main.signers', s)
        if (
          signer.type === 'ledger' || 
          signer.type === 'trezor' ||
          signer.type === 'lattice'
        ) {
          return signer
        } else {
          return false
        }
      }).filter(s => s)
      const hotSigners = Object.keys(this.store('main.signers')).map(s => {
        const signer = this.store('main.signers', s)
        if (
          signer.type === 'seed' || 
          signer.type === 'ring'
        ) {
          return signer
        } else {
          return false
        }
      }).filter(s => s)
      return (
      <div className='dash'>
        {this.state.showAddAccounts ? <AddAccounts /> : null}
        <div className='newAccount' onMouseDown={() => this.setState({ showAddAccounts: !this.state.showAddAccounts })}>
          Add New Accounts
        </div>
        <div className='signers'>
          <div className='signersMid'>
            <div className='signersHeader'>
              Hardware Signers
            </div>
            <div className='signersList'>
              {hardwareSigners.length ? (
                hardwareSigners.map(signer => <Signer key={signer.id} {...signer} />)
              ) : (
                <div className='noSigners'>
                  {'No hardware signers detected'}
                </div>
              )}
            </div>
            <div className='signersHeader'>
              Hot Signers
            </div>
            <div className='signersList'>
              {hotSigners.length ? (
                hotSigners.map(signer => <Signer key={signer.id} {...signer} />)
              ) : (
                <div className='noSigners'>
                  {'No hot signers detected'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Restore.connect(Dash)