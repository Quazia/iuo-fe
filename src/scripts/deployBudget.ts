import { BoostCore } from '@boostxyz/sdk'
import { BoostRegistry } from '@boostxyz/sdk'
import { Roles } from '@boostxyz/sdk'
import { config } from "./config"

const core = new BoostCore({ config })
const registry = new BoostRegistry({ config })

async function main() {
  try {
    console.log('Deploying budget account...')
    
    const budget = await registry.initialize(
      "MyBoostBudget",
      core.ManagedBudget({
        owner: process.env.WALLET_ADDRESS as `0x${string}`,
        authorized: [process.env.WALLET_ADDRESS as `0x${string}`, core.assertValidAddress()],
        roles: [Roles.ADMIN, Roles.MANAGER],
      })
    )

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