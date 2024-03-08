const apiKey = 'c68ca2fc6c8b67fe4e2c5f8ef6d1398b';
const bitcoinPriceElement = document.getElementById('bitcoin-price');
const ethereumPriceElement = document.getElementById('ethereum-price');

// Fetch the current prices of Bitcoin and Ethereum
fetch(`https://api.coinlayer.com/live?access_key=${apiKey}&currencies=USD,EUR,JPY&symbols=BTC,ETH`)
  .then((response) => response.json())
  .then((data) => {
    if (data.rates && data.rates.USD) {
      bitcoinPriceElement.textContent = `$${data.rates.USD.BTC.toFixed(2)}`;
      ethereumPriceElement.textContent = `$${data.rates.USD.ETH.toFixed(2)}`;
    } else {
      bitcoinPriceElement.textContent = 'Error: Unable to fetch price.';
      ethereumPriceElement.textContent = 'Error: Unable to fetch price.';
    }
  });

const form = document.getElementById('crypto-form');
const cryptoName = document.getElementById('crypto-name');
const cryptoPrice = document.getElementById('crypto-price');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const crypto = cryptoName.value.trim().toUpperCase();
  if (!crypto) {
    alert('Please enter a cryptocurrency name.');
    return;
  }

  try {
    const response = await fetch(`https://api.coinlayer.com/live?access_key=${apiKey}&currencies=USD,EUR,JPY&symbols=${crypto}`);
    const data = await response.json();
    if (data.rates && data.rates.USD) {
      cryptoPrice.textContent = `$${data.rates.USD[crypto].toFixed(2)}`;
    } else {
      cryptoPrice.textContent = 'Error: Unable to fetch price.';
    }
  }  catch (err) {
    console.log(err);
    cryptoPrice.textContent = 'Error: Invalid API request.';
  } finally {
    // Clear input field after successful submission
    cryptoName.value = '';
  }
});