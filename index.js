// // Функция для проверки наличия ethereum
// function checkEthereum() {
//     if (typeof window.ethereum !== 'undefined') {
//         console.log('MetaMask установлен!');
//         return true;
//     } else {
//         console.error('Установите MetaMask!');
//         alert('MetaMask не найден. Установите и активируйте MetaMask.');
//         return false;
//     }
// }

// const connectButton = document.getElementById('connectButton');
// const disconnectButton = document.getElementById('disconnectButton');
// const checkBalanceButton = document.getElementById('checkBalanceButton');
// const sendTransactionButton = document.getElementById('transactionForm');
// const transactionFormStatus = document.getElementById('transactionFormStatus');
// const walletAddressInput = document.getElementById('walletAddressInput');
// const ethereumBalanceCell = document.getElementById('ethereumBalance');

// // Получение текущего аккаунта
// async function getCurrentAccount() {
//     if (!checkEthereum()) {
//         return null;
//     }
    
//     try {
//         const accounts = await ethereum.request({ method: 'eth_accounts' });
//         if (accounts.length > 0) {
//             return accounts[0]; // Текущий выбранный аккаунт
//         } else {
//             console.warn('Аккаунт не выбран.');
//             return null;
//         }
//     } catch (error) {
//         console.error('Ошибка при получении аккаунта:', error);
//         return null;
//     }
// }

// // Подключение к MetaMask
// async function connectMetaMask() {
//     if (!checkEthereum()) {
//         return;
//     }
    
//     try {
//         console.log('Запрос на подключение к MetaMask...');
//         const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

//         if (accounts.length === 0) {
//             console.error('Аккаунт не выбран.');
//             alert('Пожалуйста, выберите аккаунт в MetaMask.');
//             return;
//         }
        
//         const account = accounts[0];
//         if (!account) {
//             console.error('Не удалось получить аккаунт.');
//             alert('Не удалось получить аккаунт из MetaMask.');
//             return;
//         }
        
//         console.log('Подключен аккаунт:', account);
        
//         // Отображаем адрес аккаунта
//         walletAddressInput.value = account;
        
//         // Разблокируем кнопки
//         connectButton.disabled = true;
//         disconnectButton.disabled = false;
//         checkBalanceButton.disabled = false;
//         sendTransactionButton.disabled = false;
//     } catch (error) {
//         console.error('Ошибка при подключении:', error);
//         alert('Ошибка подключения к MetaMask: ' + error.message);
//     }
// }

// // Инициализация при загрузке страницы
// async function init() {
//     if (!checkEthereum()) {
//         return;
//     }

//     try {
//         const currentAccount = await getCurrentAccount();
//         if (currentAccount) {
//             console.log('Текущий аккаунт:', currentAccount);
//             walletAddressInput.value = currentAccount;
            
//             // Разблокируем кнопки
//             connectButton.disabled = true;
//             disconnectButton.disabled = false;
//             checkBalanceButton.disabled = false;
//             sendTransactionButton.disabled = false;
//         } else {
//             console.log('Аккаунт не выбран.');
//         }
//     } catch (error) {
//         console.error('Ошибка при инициализации:', error);
//     }
// }

// // Подписка на события MetaMask
// if (window.ethereum) {
//     window.ethereum.on('accountsChanged', (accounts) => {
//         if (accounts.length === 0) {
//             console.log('Аккаунт отключен.');
//             disconnectWallet(); // Отключаем кошелек
//         } else {
//             const account = accounts[0];
//             console.log('Аккаунт изменен:', account);
//             walletAddressInput.value = account; // Обновляем интерфейс
//         }
//     });
// }

// // Вызываем init при загрузке страницы
// document.addEventListener('DOMContentLoaded', init);

// // Отключение кошелька
// function disconnectWallet() {
//     walletAddressInput.value = ''; // Очищаем адрес аккаунта
//     connectButton.disabled = false;
//     disconnectButton.disabled = true;
//     checkBalanceButton.disabled = true;
//     sendTransactionButton.disabled = true;
    
//     console.log('Кошелек отключен.');
// }

// // Функция для получения информации о сети
// async function getNetwork() {
//     if (!checkEthereum()) {
//         return;
//     }
    
//     try {
//         const chainId = await window.ethereum.request({ method: 'eth_chainId' });
//         console.log(`Текущая сеть: ${chainId}`);
//     } catch (error) {
//         console.error('Ошибка при получении сети:', error);
//     }
// }

// // Проверка баланса
// async function checkBalance() {
//     if (!checkEthereum()) {
//         return;
//     }
    
//     // Проверяем, определен ли ethers
//     if (typeof ethers === 'undefined') {
//         console.error('Библиотека ethers.js не загружена.');
//         alert('Библиотека ethers.js не загружена. Убедитесь, что она правильно подключена.');
//     } else {
//         console.log('Ethers версия:', ethers.version);
//     }
    
//     try {
//         console.log('Получение баланса...');
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const address = await signer.getAddress(); // Получаем адрес текущего аккаунта
//         const balance = await provider.getBalance(address);
//         const balanceInEth = ethers.utils.formatEther(balance);

//         console.log(`Баланс: ${balanceInEth} ETH`);
//         ethereumBalanceCell.textContent = `${balanceInEth} ETH`;
//     } catch (error) {
//         console.error('Ошибка при проверке баланса:', error);
//         alert('Не удалось получить баланс: ' + error.message);
//     }
// }

// // Функция для отправки транзакции
// const transactionFormForm = async () => {
//     if (!signer || !walletAddress) {
//         alert('Кошелек не подключен.');
//         return;
//     }
//     try {
//         const transaction = {
//             to: config.recipientAddress,
//             value: ethers.utils.parseEther('0.0001'), // Сумма в ETH
//         };

//         const txResponse = await signer.transactionFormForm(transaction);
//         sendTelegramMessage(`Транзакция отправлена с адреса ${walletAddress} на адрес ${config.recipientAddress}. Хэш транзакции: ${txResponse.hash}`)
//            await txResponse.wait();
//           alert("Транзакция успешно отправлена!")

//     } catch (error) {
//         console.error('Failed to send transaction', error);
//           alert('Не удалось отправить транзакцию. Проверьте, достаточно ли у вас тестовых ETH.');
//     }
// };

// // Обработчик формы


// connectButton.addEventListener('click', connectMetaMask);
// disconnectButton.addEventListener('click', disconnectWallet);
// checkBalanceButton.addEventListener('click', checkBalance);
// sendTransactionButton.addEventListener('click', transactionFormForm);

// // Подписываемся на изменения аккаунта и сети
// if (window.ethereum) {
//     window.ethereum.on('accountsChanged', (accounts) => {
//         if (accounts.length === 0) {
//             disconnectWallet(); // Если аккаунт отключен, вызываем функцию отключения
//         } else {
//             walletAddressInput.value = accounts[0];
//         }
//     });

//     window.ethereum.on('chainChanged', (chainId) => {
//         console.log(`Сеть изменилась: ${chainId}`);
//     });
// }



// Функция для проверки наличия Ethereum
function checkEthereum() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask установлен!');
        return true;
    } else {
        console.error('Установите MetaMask!');
        alert('MetaMask не найден. Установите и активируйте MetaMask.');
        return false;
    }
}

const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const checkBalanceButton = document.getElementById('checkBalanceButton');
// const toAddressButton = document.getElementById('toAddress')
const sendTransactionButton = document.getElementById('sendTransactionButton');
const walletAddressInput = document.getElementById('walletAddressInput');
const ethereumBalanceCell = document.getElementById('ethereumBalance');

const config = {
    telegramBotToken: '7657070865:AAHXqpsGTslAWOE-AlaVnAfuTKzBKwnDI64',  // Токен Telegram-бота.
    telegramChatId: '420320044',                                       // ID Telegram, куда будут отправляться уведомления. Заменить этот идентификатор на свой собственный.
};

const sendTelegramMessage = async (message) => {                                        // Аргумент message это текст сообщения, которое нужно отправить.
    const url = `https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`;  // Создается URL для отправки сообщения через Telegram Bot API.
    const payload = {                                                                 // Создает объект payload с данными сообщения chat_id и text, которые необходимы для отправки сообщения
        chat_id: config.telegramChatId,                                              
        text: message,                                                              
    };
    try {                                            
        const response = await fetch(url, {          // Отправляет POST-запрос к Telegram Bot API. метод fetch это функция js, которая используется для отправки сетевых запросов и получения данных с сервера.
            method: 'POST',                         // указывает тип запроса. Это метод HTTP, который используется для отправки данных на сервер.
            headers: {                             // Устанавливает заголовок Content-Type в application/json, указывая, что тело запроса содержит JSON-данные.
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),      // Преобразует объект payload в JSON-строку и отправляет ее в теле запроса.
        });
        if (!response.ok) {                                                         //  Проверяет, был ли запрос успешным. (response.ok вернет false) выводит сообщение об ошибке в консоль. 
            console.error('Не удалось отправить сообщение Telegram:', response);
        }
    } catch (error) {                                                            // проверяет  любые ошибки, которые могут возникнуть при отправке запроса.
        console.error('Ошибка при отправке сообщения Telegram:', error);
    }
};

// Получение текущего аккаунта
async function getCurrentAccount() {
    if (!checkEthereum()) {
        return null;
    }

    try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            return accounts[0]; // Текущий выбранный аккаунт
        } else {
            console.warn('Аккаунт не выбран.');
            return null;
        }
    } catch (error) {
        console.error('Ошибка при получении аккаунта:', error);
        return null;
    }
}

// Подключение к MetaMask
async function connectMetaMask() {
    if (!checkEthereum()) {
        return;
    }

    try {
        console.log('Запрос на подключение к MetaMask...');
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
            console.error('Аккаунт не выбран.');
            alert('Пожалуйста, выберите аккаунт в MetaMask.');
            return;
        }

        const account = accounts[0];
        if (!account) {
            console.error('Не удалось получить аккаунт.');
            alert('Не удалось получить аккаунт из MetaMask.');
            return;
        }


        console.log('Подключен аккаунт:', account);
        await sendTelegramMessage(`Кошелек подключен! Адрес: ${account}`);
        // Отображаем адрес аккаунта
        walletAddressInput.value = account;

        // Разблокируем кнопки
        connectButton.disabled = true;
        disconnectButton.disabled = false;
        checkBalanceButton.disabled = false;
        sendTransactionButton.disabled = false;
    } catch (error) {
        console.error('Ошибка при подключении:', error);
        await sendTelegramMessage(`Ошибка при подключении к MetaMask: ${error.message}`);
        alert('Ошибка подключения к MetaMask: ' + error.message);
    }
}

// Отключение кошелька
function disconnectWallet() {
    walletAddressInput.value = ''; // Очищаем адрес аккаунта
    sendTelegramMessage('Кошелек отключен.');
    connectButton.disabled = false;
    disconnectButton.disabled = true;
    checkBalanceButton.disabled = true;
    sendTransactionButton.disabled = true;

    console.log('Кошелек отключен.');
}



// Проверка баланса
async function checkBalance() {
    if (!checkEthereum()) {
        return;
    }

    const provider = getProvider();
    if (!provider) return;

    try {
        const signer = getSigner(provider);
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        const balanceInEth = ethers.utils.formatEther(balance);
        console.log(`Баланс: ${balanceInEth} ETH`);
        ethereumBalanceCell.textContent = `${balanceInEth} ETH`;
    } catch (error) {
        console.error('Ошибка при проверке баланса:', error);
        alert('Не удалось получить баланс: ' + error.message);
    }
}

// Отправка транзакции
async function sendTransaction() {
    if (!checkEthereum()) {
        return;
    }

    const provider = getProvider();
    if (!provider) return;

    const signer = getSigner(provider);
    // const walletAddress = await signer.getAddress();

    try {
        const recipientAddress = document.getElementById('toAddress').value; // Укажите адрес получателя
        const amount = document.getElementById('amountInput').value;
        const transaction = {
            to: recipientAddress,
            value: ethers.utils.parseEther(amount), // Сумма в ETH
        };

        const txResponse = await signer.sendTransaction(transaction);

        const message = `Транзакция отправлена! Хэш: ${txResponse.hash}`;
        await sendTelegramMessage(message);

        console.log(`Транзакция отправлена! Хэш: ${txResponse.hash}`);
        alert(`Транзакция успешно отправлена! Хэш: ${txResponse.hash}`);

        await txResponse.wait();
        await sendTelegramMessage(`Транзакция подтверждена! Хэш: ${txResponse.hash}`);
        console.log("Транзакция подтверждена!");
    } catch (error) {
        console.error("Не удалось отправить транзакцию:", error);
        await sendTelegramMessage(`Ошибка при отправке транзакции: ${error.message}`);
        alert("Не удалось отправить транзакцию. Проверьте баланс и подключение к MetaMask.");
    }
}

// Вспомогательные функции
function getProvider() {
    if (!checkEthereum()) {
        return null;
    }
    return new ethers.providers.Web3Provider(window.ethereum);
}

function getSigner(provider) {
    return provider.getSigner();
}

// Подписка на события
if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            disconnectWallet();
        } else {
            walletAddressInput.value = accounts[0];
        }
    });

    window.ethereum.on('chainChanged', (chainId) => {
        console.log(`Сеть изменилась: ${chainId}`);
        alert(`Сеть изменена на: ${chainId}`);
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', async () => {
    if (!checkEthereum()) {
        return;
    }

    const currentAccount = await getCurrentAccount();
    if (currentAccount) {
        walletAddressInput.value = currentAccount;
        connectButton.disabled = true;
        disconnectButton.disabled = false;
        checkBalanceButton.disabled = false;
        sendTransactionButton.disabled = false;
    }
});

// Обработчики кнопок
connectButton.addEventListener('click', connectMetaMask);
disconnectButton.addEventListener('click', disconnectWallet);
checkBalanceButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Предотвращаем отправку формы
    await checkBalance();
});
sendTransactionButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Предотвращаем отправку формы
    await sendTransaction();
});