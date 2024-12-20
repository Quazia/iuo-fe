import { BoostCore } from '@boostxyz/sdk/src/BoostCore'
import { BoostRegistry } from '@boostxyz/sdk/src/BoostRegistry'
import { Roles } from '@boostxyz/sdk'
import { config } from "../scripts/config";

//const core = new BoostCore({ config });
const core = core.ManagedBudget({config:{
                owner: account.address,
                authorized: [account.address, core.assertValidAddress()],
                roles: [Roles.ADMIN, Roles.MANAGER],
            }, account: account.address})
const registry = new BoostRegistry({ config });

// initialize a new budget contract
const budget = await registry.initialize(
  "MyBoostBudget",
  core.ManagedBudget({
    owner: "0x39dc391f8FFE71156212C7c3196Ef09B9C0bdDf8",
    authorized: ["0x39dc391f8FFE71156212C7c3196Ef09B9C0bdDf8", core.assertValidAddress()],
    roles: [Roles.ADMIN, Roles.MANAGER],
  })
);

const budgetAddress = budget.assertValidAddress();
