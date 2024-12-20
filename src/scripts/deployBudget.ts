import { BoostCore, ManagedBudget } from '@boostxyz/sdk'
import { BoostRegistry } from '@boostxyz/sdk'
import { Roles } from '@boostxyz/sdk'
import { config } from "./config"
import { Account, Address, } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
const registry = new BoostRegistry({ config })
const account = {
    privateKey: process.env.PRIVATE_KEY as `0x${string}`,
    address: process.env.WALLET_ADDRESS as `0x${string}`,
  }
  const core = new BoostCore({ config, account: privateKeyToAccount(account.privateKey) })

async function main() {
  try {
    console.log('Deploying budget account...')
    
    /* DOCS CODE
    const budget = await registry.initialize(
      "MyBoostBudget",
      core.ManagedBudget({
        owner: account.address,
        authorized: [account.address, core.assertValidAddress()],
        roles: [Roles.ADMIN, Roles.MANAGER],
      })
    )*/
    const budget = new ManagedBudget({
    config,
    account: privateKeyToAccount(account.privateKey),
    }, {
      owner: account.address,
      authorized: [account.address, core.assertValidAddress()],
      roles: [Roles.ADMIN, Roles.MANAGER],
    });

    const budgetAddress = budget.assertValidAddress()
    console.log('Budget deployed at:', budgetAddress)
    
    return budgetAddress
  } catch (error) {
    console.error('Error deploying budget:', error)
    throw error
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  }) 