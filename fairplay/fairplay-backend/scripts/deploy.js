const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // 1. Deploy Mock FBTC
  const MockFBTC = await hre.ethers.getContractFactory("MockFBTC");
  const fbtc = await MockFBTC.deploy();
  await fbtc.waitForDeployment();
  const fbtcAddress = await fbtc.getAddress();
  console.log("MockFBTC deployed to:", fbtcAddress);

  // 2. Deploy Mock FDC (This was missing!)
  const MockFDC = await hre.ethers.getContractFactory("MockFDC");
  const fdc = await MockFDC.deploy();
  await fdc.waitForDeployment();
  const fdcAddress = await fdc.getAddress();
  console.log("MockFDC deployed to:", fdcAddress);

  // 3. Deploy FairPlay (Now linked to FDC)
  const FairPlay = await hre.ethers.getContractFactory("FairPlay");
  const fairPlay = await FairPlay.deploy(fbtcAddress, fdcAddress);
  await fairPlay.waitForDeployment();
  const fairPlayAddress = await fairPlay.getAddress();
  console.log("FairPlay deployed to:", fairPlayAddress);

  // 4. Deploy XRP Controller (This was missing!)
  const XRPController = await hre.ethers.getContractFactory("XRPAccountController");
  const controller = await XRPController.deploy(fairPlayAddress, fdcAddress, fbtcAddress);
  await controller.waitForDeployment();
  const controllerAddress = await controller.getAddress();
  console.log("XRPController deployed to:", controllerAddress);

  // 5. SETUP: Link them together
  // A. Tell FairPlay who the controller is
  await fairPlay.setController(controllerAddress);
  // B. Fund the Controller (so it can pay for users)
  const fundTx = await fbtc.transfer(controllerAddress, hre.ethers.parseEther("500"));
  await fundTx.wait();
  console.log("Controller funded with 500 FBTC");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});