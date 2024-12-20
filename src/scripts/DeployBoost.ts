import { ethers } from 'ethers';
import { BoostClient, Chain } from '@boostxyz/boost-sdk';


async function main() {
    // Setup provider and signer
    const provider = new ethers.JsonRpcProvider(process.env.BASE_SEPOLIA_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PK_BASE_SEPOLIA!, provider);

    // Initialize Boost client
    const boostClient = new BoostClient({
        chain: Chain.BASE_SEPOLIA,
        signer: wallet
    });

    // Setup your action (example for a token distribution)
    const action = {
        // Configure your specific action parameters here
        // This is just an example structure
        target: "0xd627e46A4A8A41FB137E75E0A6D9A1c43053E548",
        selector: "YOUR_FUNCTION_SELECTOR",
        value: 0,
        data: "0x"
    };

    // Setup incentives
    const incentives = {
        // Configure your incentive parameters
        // Example for ERC20 token distribution
        token: "0x40dC4b21c67939884e531F98686f93E8E0f22b9d",
        amount: ethers.parseEther("1")
    };

    try {
        // Deploy the boost
        const boost = await boostClient.deployBoost({
            action,
            incentives,
            budgetId: "YOUR_BUDGET_ID", // Your budget account ID
            allowList: "OPEN" // Or configure specific allow list
        });

        console.log("Boost deployed successfully!");
        console.log("Boost address:", boost.address);
    } catch (error) {
        console.error("Error deploying boost:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });