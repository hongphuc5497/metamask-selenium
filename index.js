var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');

const { Builder, By } = require('selenium-webdriver');

const Web3 = require('web3');

const detectEthereumProvider = require('@metamask/detect-provider');

function encode(file) {
  var stream = require('fs').readFileSync(file);
  return new Buffer(stream).toString('base64');
}

const test = async () => {
	try {
		let options = new chrome.Options();
		options.addExtensions(encode('MetaMask_v9.8.1.crx'));

		let driver = new webdriver.Builder()
			.withCapabilities(webdriver.Capabilities.chrome())
			.setChromeOptions(options)
			.build();

		await driver.get(
			'https://dxsale.app/app/v2_9/defipresale?saleID=1594&chain=BSC'
		);

		await driver
			.wait(
				webdriver.until.elementLocated(By.css('.MuiIconButton-label input')),
				5000
			)
			.then((el) => {
				el.click();
			});

		await driver
			.findElement(
				By.xpath('/html/body/div[3]/div[3]/div/div[2]/div/div[2]/div[2]/button')
			)
			.click();

    const eth = await driver.executeScript('return window.ethereum;')
    console.log(eth)

		// let w = driver.manage().window();
		// const ethEnabled = async () => {
		// 	if (w.ethereum) {
		// 		await w.ethereum.send('eth_requestAccounts');
		// 		w.web3 = new Web3(w.ethereum);
		// 		return true;
		// 	}
		// 	return false;
		// };

		// if (!ethEnabled()) {
		// 	alert('Please install MetaMask to use this dApp!');
		// }

		// await driver.wait(
		// 	webdriver.until.elementLocated(
		// 		By.xpath(
		// 			"//*[@id='mainContent']/section/div/div/div[1]/div[2]/div[2]/div/div[2]/div/div/div/section/div[3]/table"
		// 		)
		// 	),
		// 	10000
		// );

		// driver
		// 	.findElement(
		// 		By.xpath(
		// 			"//*[@id='mainContent']/section/div/div/div[1]/div[2]/div[2]/div/div[2]/div/div/div/section/div[3]/table"
		// 		)
		// 	)
		// 	.getAttribute('innerHtml');
	} catch (err) {
		console.log(err);
	}
};

test();
