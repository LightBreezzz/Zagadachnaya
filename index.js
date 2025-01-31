import { ethers } from 'ethers';
// Проверяем, есть ли MetaMask в браузере
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask установлен!');
} else {
    console.log('Установите MetaMask!');
}

// Элементы DOM
const connectButton = document.getElementById('connectButton');
const accountInfo = document.getElementById('accountInfo');
const networkInfo = document.getElementById('networkInfo');
const sendTransactionButton = document.getElementById('sendTransactionButton');
const transactionStatus = document.getElementById('transactionStatus');

// Функция для подключения к MetaMask
async function connectMetaMask() {
    try {
        // Запрашиваем доступ к аккаунту
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        accountInfo.textContent = `Подключенный аккаунт: ${account}`;
        sendTransactionButton.disabled = false; // Разблокируем кнопку отправки транзакции

        // Обновляем информацию о сети
        getNetwork();
    } catch (error) {
        console.error('Ошибка при подключении:', error);
        accountInfo.textContent = 'Ошибка подключения';
    }
}

// Функция для получения информации о сети
async function getNetwork() {
    try {
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        networkInfo.textContent = `Текущая сеть: ${chainId}`;
    } catch (error) {
        console.error('Ошибка при получении сети:', error);
        networkInfo.textContent = 'Ошибка получения сети';
    }
}

// Функция для отправки тестовой транзакции
async function sendTestTransaction() {
    try {
        const toAddress = '0xRecipientAddress'; // Адрес получателя (замените на реальный адрес)
        const amountInEther = '0.01'; // Сумма в ETH

        const transactionParameters = {
            to: toAddress, // Адрес получателя
            from: ethereum.selectedAddress, // Адрес отправителя
            value: ethers.utils.parseEther(amountInEther).toHexString(), // Сумма в Wei
        };

        // Отправляем транзакцию
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });

        transactionStatus.textContent = `Транзакция отправлена: ${txHash}`;
    } catch (error) {
        console.error('Ошибка при отправке транзакции:', error);
        transactionStatus.textContent = 'Ошибка отправки транзакции';
    }
}

// Обработчики событий
connectButton.addEventListener('click', connectMetaMask);
sendTransactionButton.addEventListener('click', sendTestTransaction);

// Подписываемся на изменения аккаунта и сети
ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length > 0) {
        accountInfo.textContent = `Подключенный аккаунт: ${accounts[0]}`;
    } else {
        accountInfo.textContent = 'Аккаунт не подключен';
        sendTransactionButton.disabled = true;
    }
});

ethereum.on('chainChanged', (chainId) => {
    networkInfo.textContent = `Текущая сеть: ${chainId}`;
});