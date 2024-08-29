export default () => {
    // запуск виджета чатбот
    const showWidgetBtns = document.querySelectorAll('.widget-show');
    const closeWidgetMenu = document.querySelector('.widget__menu-close');
    const operatoConnect = document.querySelector('.chat__operator-connect');

    showWidgetBtns.forEach(el => {
        el.addEventListener('click', function() {
            draggable.style.display = `block`;

            // подключение оператора
            setTimeout(() => {
                operatoConnect.style.display = 'block';
                scroll();
                setTimeout(() => {
                    startChat();
                }, 2000);
            }, 3000);
        })
    })
    
    // кнопка настройки чата
    const settingsBtn = document.querySelector('.widget__settings');
    const widgetMenu = document.querySelector('.widget__menu');

    settingsBtn.addEventListener('click', function() {
        widgetMenu.classList.add('active');
    })
    closeWidgetMenu.addEventListener('click', function() {
        widgetMenu.classList.remove('active');
    })


    // настройки чата
    function useSettingsWidget() {
        widgetMenu.addEventListener('click', function(e) {
            let target = e.target;

            if (target.classList.contains('dark-mode')) {
                draggable.classList.toggle('dark__mode')
            } 

            else if (target.classList.contains('large-font')) {
                draggable.classList.toggle('large__font')
            }
        })
    }
    useSettingsWidget();

    // перемещение виджета
    const draggable = document.querySelector('.widget');
    const movingArea = document.querySelector('.widget__top');

    let isDraggable = false;
    let offsetX, offsetY;
    
    function centerWindow() {
        const rect = draggable.getBoundingClientRect();
        draggable.style.left = `50%`;
        draggable.style.top = `50%`;
        draggable.style.bottom = `auto`;
        draggable.style.transform = `translate(-50%, -50%)`;
    }

    function moving() {
        isDraggable = true;

        document.addEventListener('mousemove', (e) => {
            if (isDraggable && window.innerWidth >= 1250) {
                const newX = e.clientX - offsetX;
                const newY = e.clientY - offsetY;
                draggable.style.left = `${newX}px`;
                draggable.style.top = `${newY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDraggable = false;
        });
    }

    movingArea.addEventListener('mousedown', (e) => {
        if (!draggable.classList.contains('minimize') && window.innerWidth >= 1250) {
            const rect = draggable.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            draggable.style.transform = 'none';
            draggable.style.left = `${rect.left}px`;
            draggable.style.top = `${rect.top}px`;

            moving();
        }
    });

    function checkWindowSize() {
        if (window.innerWidth < 1250) {
            centerWindow();
        }
    }

    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);


    // сворачивание виджета
    const minimizeBtn = document.querySelector('.widget__minimize-btn');

    minimizeBtn.addEventListener('click', function () {
        if (draggable.classList.toggle('minimize')) {
            draggable.style.left = '0';
            draggable.style.top = 'auto';
            draggable.style.bottom = '0';
            draggable.style.transform = 'none';
            isDraggable = false;
        } else {
            centerWindow();
        }
    });

    // chatbot
    // скроллл чата при появлении новых сообщений
    function scroll() {
        const chat = document.querySelector('.chat');
        chat.scroll({
            top: chat.scrollHeight,
            behavior: 'smooth'
        });
    }

    // хранение данных юзера
    const userData = {};
    
    // флоу чата
    const chatStart = {
        start: {
            question: 'Доброго дня, Легітимний оператор на зв”язку. Вкажіть ваше ім`я?',
            type: 'input',
            next: 'greetUser'
        },
        greetUser: {
            messages: [
                { type: 'statement', text: 'Дякую, {value}, радий з вами познайомитись' },
                { type: 'statement', text: 'Далі повідомте нам вашу стать?' }
            ],
            type: 'choice',
            choices: [
                { text: 'Чоловіча', value: 'man' },
                { text: 'Жіноча', value: 'woman' },
                { text: 'Небінарна', value: 'none' }
            ],
            next: {
                man: 'commentMan',
                woman: 'commentWoman',
                none: 'commentRobot'
            }
        },
        commentMan: {
            messages: [
                { type: 'statement', text: 'Мені дуже приємно спілкуватися з чоловіком.' },
                { type: 'statement', text: 'Вкажіть свій вік в цифрах:' }
            ],
            type: 'input',
            next: 'askWeight'
        },
        commentWoman: {
            messages: [
                { type: 'statement', text: 'Мені дуже приємно спілкуватися з жінкою.' },
                { type: 'statement', text: 'Вкажіть свій вік в цифрах:' }
            ],
            type: 'input',
            next: 'askWeight'
        },
        commentRobot: {
            messages: [
                { type: 'statement', text: 'Мені дуже приємно спілкуватися з роботом.' },
                { type: 'statement', text: 'Вкажіть свій вік в цифрах:' }
            ],
            type: 'input',
            next: 'askWeight'
        },
        askWeight: {
            messages: [
                { type: 'statement', text: 'Дякую, записав.' },
                { type: 'statement', text: 'А як що до вашої ваги? (в кг)' }
            ],
            type: 'input',
            next: 'askProblem'
        },
        askProblem: {
            messages: [
                { type: 'statement', text: 'Оце кабанчик, записав' },
                { type: 'statement', text: 'Виберіть будь-ласка проблему, з якою ми можемо вам допомогти' }
            ],
            type: 'choice',
            choices: [
                { text: 'Потенція', value: 'potention' },
                { text: 'Гіпертонія', value: 'hypertension' },
                { text: 'Теща', value: 'wife-mother' }
            ],
            next: {
                potention: 'stepPotention',
                hypertension: 'stepHypertension',
                wifeMother: 'stepWifeMother'
            }
        },
        stepHypertension: {
            question: 'Вкажіть ваш звичний тиск?',
            type: 'input',
            next: 'askHeartProblems'
        },
        askHeartProblems: {
            question: 'Чи є у вас проблеми із серцем?',
            type: 'choice',
            choices: [
                { text: 'Так', value: 'yes' },
                { text: 'Ні', value: 'no' },
                { text: 'Не знаю', value: 'unknown' }
            ],
            next: {
                yes: 'askMedication',
                no: 'askMedication',
                unknown: 'askMedication'
            }
        },
        askMedication: {
            question: 'Чи приймаєте ви якісь препарати для боротьби з тиском?',
            type: 'choice',
            choices: [
                { text: 'Так', value: 'yes' },
                { text: 'Нерегулярно', value: 'irregular' },
                { text: 'Кілька препаратів', value: 'multiple' }
            ],
            next: {
                yes: 'askExercise',
                irregular: 'askExercise',
                multiple: 'askExercise'
            }
        },
        askExercise: {
            question: 'Як часто ви займаєтесь спортом?',
            type: 'choice',
            choices: [
                { text: 'Щодня', value: 'daily' },
                { text: 'Пару раз на тиждень', value: 'fewTimes' },
                { text: 'У вихідні', value: 'weekends' },
                { text: 'У свята', value: 'holidays' },
                { text: 'Не займаюсь', value: 'none' }
            ],
            next: {
                daily: 'askInterestInSupport',
                fewTimes: 'askInterestInSupport',
                weekends: 'askInterestInSupport',
                holidays: 'askInterestInSupport',
                none: 'askInterestInSupport'
            }
        },
        askInterestInSupport: {
            question: 'А вам цікаво, як я підтримую свій тиск?',
            type: 'choice',
            choices: [
                { text: 'Так', value: 'yes' },
                { text: 'Ні', value: 'no' }
            ],
            next: {
                yes: 'addAudio',
                no: 'endChatOperator'
            }
        },

        endChatOperator: {
            question: 'От покидьок!',
            type: 'end'
        },

        addAudio: {
            type: 'audio',
            next: 'form'
        },

        // Другие шаги...
    };
    
    let currentStep = 'start';

    // форматирование сообщения в котором есть {value}
    function formatMessage(template) {
        return template.replace(/{(\w+)}/g, (_, key) => userData[key] || '');
    }
    
    // рендер вопросов
    function renderQuestion(step) {
        const currentData = chatStart[step];     
    
        if (currentData.type === 'audio') { // если тайп аудио, рендер блока аудио
            renderAudioRecording(() => {
                createAudioPlayer(); 
                goToNextStep(currentData.next);
            });
        } else if (currentData.messages) { // рендер сообщений оператора
            renderOperatorMessage(currentData.messages, currentData.type, currentData.choices, currentData.next);
        } else if (currentData.question) { // рендер вопроса оператора
            createOperatorMessage([{ text: currentData.question }], () => {
                if (currentData.type === 'end') { // если тайп end, запуск функции окончания чата
                    endChat();
                }
                
                if (currentData.type === 'choice') { // если тайп choice, создаем кнопки
                    createChoiceButtons(currentData.choices);
                } else if (currentData.type === 'input') {
                    document.querySelector('.user__message').value = '';
                    document.querySelector('.user__message').focus();
                    inputEnabled = true; // Включаем ввод данных
                }
            });
        }
    }

    // рендер сообщений оператора
    function renderOperatorMessage(messages, type, choices, next) {
        createOperatorMessage(messages, () => {
            if (type === 'choice') {
                createChoiceButtons(choices);
            } else if (type === 'input' && next) {
                // Если это шаг типа 'input', ожидаем ввода от пользователя
                // Переключаемся на следующий шаг только после ввода
            } else if (type === 'end') {
                // вызов endChat(), если шаг завершает чат
                endChat();
            } else if (next) {
                goToNextStep(next);
            }
        });
    }

    // рендер блока аудио
    function renderAudioRecording(callback) {
        const operatorWrapper = document.createElement('div');
        operatorWrapper.classList.add('chat__operator-wrapper');
    
        const operator = document.createElement('div');
        operator.classList.add('chat__operator');
    
        const img = document.createElement('img');
        img.src = 'img/operator.png';
        img.classList.add('operator__img');
        img.alt = '';
    
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('chat__operator-msg');
    
        const recordingBlock = document.createElement('div');
        recordingBlock.classList.add('chat__operator-record');
        recordingBlock.innerHTML = `
            <div class="record">
                <span class="record__line"></span>
                <span class="record__line record__line--2"></span>
                <span class="record__line record__line--3"></span>
                <span class="record__line record__line--4"></span>
            </div>
            <p>Записує аудіо повідомлення...</p>
        `;
    
        const doneRecordingBlock = document.createElement('div');
        doneRecordingBlock.classList.add('chat__operator-record-done');
        doneRecordingBlock.style.display = 'none';
        doneRecordingBlock.innerHTML = `
            <div class="record__img">
                <img src="img/equalizer.svg" class="audio" alt="" />
            </div>
            <div class="record__time-inner">
                <span class="record__progres">00:00</span> / <span class="record__time">00:24</span>
            </div>
            <button class="record__btn play"></button>
        `;
    
        messageContainer.appendChild(recordingBlock);
        messageContainer.appendChild(doneRecordingBlock);
        operator.appendChild(img);
        operator.appendChild(messageContainer);
        operatorWrapper.appendChild(operator);
        document.querySelector('.chat').appendChild(operatorWrapper);
    
        scroll();
    
        setTimeout(() => {
            recordingBlock.style.display = 'none';
            doneRecordingBlock.style.display = 'flex';
            callback();
        }, 4000);
    }
    
    // слушатель поля инпут
    function handleUserInput() {
        const input = document.querySelector('.user__message').value.trim();
        if (inputEnabled && input) { // Проверяем, включен ли ввод данных
            if (currentStep === 'start') {
                userData.value = input; // Сохраняем имя пользователя
            } else if (chatStart[currentStep].type === 'input') {
                userData.age = input; // Сохраняем введенный возраст
            }
            createUserMessage(input); // Отображаем сообщение пользователя
            document.querySelector('.user__message').value = ''; // Очищаем поле ввода
            inputEnabled = false; // Выключаем ввод данных до следующего сообщения
            goToNextStep(chatStart[currentStep].next);
        }
    }
    
    // слушатель блоков с кнопками 
    function handleChoice(choice) {
        const currentData = chatStart[currentStep];
        createUserMessage(choice.text);
        document.querySelector('.chat__operator-btns').remove(); // Удаляем блок кнопок после выбора
        goToNextStep(currentData.next[choice.value]);
    }
    
    document.querySelector('.widget__msg-send').addEventListener('click', handleUserInput);
    
    document.querySelector('.user__message').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });

    // выбор пола пользоватея и отображение выбранного значения в следующем сообщении
    document.querySelector('.chat').addEventListener('click', (event) => {
        if (event.target.classList.contains('chat__operator-btn')) {
            const choice = {
                text: event.target.textContent,
                value: event.target.dataset.gender
            };
            handleChoice(choice);
        }
    });

    // переход к следующему шагу
    function goToNextStep(nextStep) {
        const inputField = document.querySelector('.user__message');
        currentStep = nextStep;
    
        if (nextStep === 'end') {
            endChat(); // Завершаем чат сразу
        } else {
            renderQuestion(currentStep); // Отображаем вопрос оператора
        }
    
        if (chatStart[currentStep].type === 'input') {
            inputField.disabled = true; // блокируем ввод до конца печати сообщений
        } else {
            inputField.disabled = true;
        }
    }

    let inputEnabled = false; // Флаг для контроля ввода
    
    // создание сообщений оператора
    function createOperatorMessage(messages, callback = null) {
        let messageContainer;
    
        const operatorWrapper = document.createElement('div');
        operatorWrapper.classList.add('chat__operator-wrapper');
    
        const operator = document.createElement('div');
        operator.classList.add('chat__operator');
    
        const img = document.createElement('img');
        img.src = 'img/operator.png';
        img.classList.add('operator__img');
        img.alt = '';
    
        messageContainer = document.createElement('div');
        messageContainer.classList.add('chat__operator-msg');
    
        operator.appendChild(img);
        operator.appendChild(messageContainer);
        operatorWrapper.appendChild(operator);
        document.querySelector('.chat').appendChild(operatorWrapper);
    
        const typingMessage = document.createElement('p');
        typingMessage.classList.add('chat__operator-writes');
        typingMessage.textContent = 'Друкує повідомлення...';
    
        const doneMessage = document.createElement('div');
        doneMessage.classList.add('chat__operator-msg-done');
        doneMessage.style.display = 'none';
    
        const messageText = document.createElement('p');
        messageText.classList.add('chat__operator-text');
        messageText.textContent = formatMessage(messages[0].text);
    
        const timeSpan = document.createElement('span');
        timeSpan.classList.add('time', 'time-current');
        timeSpan.textContent = new Date().toLocaleTimeString();
    
        doneMessage.appendChild(messageText);
        doneMessage.appendChild(timeSpan);
        messageContainer.appendChild(typingMessage);
        messageContainer.appendChild(doneMessage);
    
        scroll();
    
        const inputField = document.querySelector('.user__message');
        inputField.disabled = true; // блокировка ввода
    
        // анимация печати и переключение на следующий шаг
        simulateTypingEffect(typingMessage, doneMessage, messageText.textContent.length, () => {
            if (messages.length > 1) {
                doneMessage.removeChild(timeSpan);
    
                const typingMessageSecond = document.createElement('p');
                typingMessageSecond.classList.add('chat__operator-writes');
                typingMessageSecond.classList.add('chat__operator-writes--second');
                typingMessageSecond.textContent = 'Друкує повідомлення...';
    
                const doneMessageSecond = document.createElement('div');
                doneMessageSecond.classList.add('chat__operator-msg-done--second');
                doneMessageSecond.style.display = 'none';
    
                const messageTextSecond = document.createElement('p');
                messageTextSecond.classList.add('chat__operator-text');
                messageTextSecond.textContent = formatMessage(messages[1].text);
    
                const timeSpanSecond = document.createElement('span');
                timeSpanSecond.classList.add('time', 'time-current');
                timeSpanSecond.textContent = new Date().toLocaleTimeString();
    
                doneMessageSecond.appendChild(messageTextSecond);
                doneMessageSecond.appendChild(timeSpanSecond);
                messageContainer.appendChild(typingMessageSecond);
                messageContainer.appendChild(doneMessageSecond);
    
                scroll();
    
                simulateTypingEffect(typingMessageSecond, doneMessageSecond, messageTextSecond.textContent.length, () => {
                    inputField.disabled = false; // включение ввода после печати всех сообщений
                    if (callback) callback();
                });
            } else {
                inputField.disabled = false; // включение ввода после одного сообщения
                if (callback) callback();
            }
        });
    }

    // анимация набора текста и скорость набора
    function simulateTypingEffect(typingElement, doneElement, typingDuration, callback = null) {
        typingElement.style.display = 'block';
        setTimeout(() => {
            typingElement.style.display = 'none';
            doneElement.style.display = 'block';
            scroll();
    
            inputEnabled = true; // включаем ввод после завершения анимации
    
            if (callback) callback();
        }, typingDuration * 10); // скорость печати
    }
    
    // создание сообщений пользователя
    function createUserMessage(text) {
        const userWrapper = document.createElement('div');
        userWrapper.classList.add('chat__user');
    
        const img = document.createElement('img');
        img.src = 'img/user.png';
        img.classList.add('user__img');
        img.alt = '';
    
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('chat__user-msg');
    
        const messageText = document.createElement('p');
        messageText.classList.add('chat__user-text');
        messageText.textContent = text;
    
        const timeSpan = document.createElement('span');
        timeSpan.classList.add('time', 'time-current');
        timeSpan.textContent = new Date().toLocaleTimeString();
    
        messageContainer.appendChild(messageText);
        messageContainer.appendChild(timeSpan);
        userWrapper.appendChild(img);
        userWrapper.appendChild(messageContainer);
    
        document.querySelector('.chat').appendChild(userWrapper);
        scroll();
    }
    
    // создание кнопок выбора
    function createChoiceButtons(choices) {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('chat__operator-btns');
    
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.classList.add('chat__operator-btn');
            button.textContent = choice.text;
            button.dataset.gender = choice.value;
            buttonWrapper.appendChild(button);
        });
    
        document.querySelector('.chat').appendChild(buttonWrapper);
        scroll();
    }

    // создание аудиоплеераs
    function createAudioPlayer() {
        const audio = new Audio('img/penki.mp3');
        const playButton = document.querySelector('.record__btn');
        const progressDisplay = document.querySelector('.record__progres');
        const totalTimeDisplay = document.querySelector('.record__time');
    
        audio.addEventListener('loadedmetadata', () => {
            totalTimeDisplay.textContent = formatTime(audio.duration);
        });
    
        playButton.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playButton.classList.add('pause');
                updateProgress(progressDisplay, audio);
            } else {
                audio.pause();
                playButton.classList.remove('pause');
            }
        });
    
        audio.addEventListener('timeupdate', () => {
            progressDisplay.textContent = formatTime(audio.currentTime);
        });
    
        audio.addEventListener('ended', () => {
            playButton.classList.remove('pause');
            progressDisplay.textContent = '00:00';
        });
    }
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    function updateProgress(display, audio) {
        const interval = setInterval(() => {
            if (audio.paused || audio.ended) {
                clearInterval(interval);
            } else {
                display.textContent = formatTime(audio.currentTime);
            }
        }, 500);
    }

    // завершение чата
    function endChat() {
        const chat = document.querySelector('.chat');
        const chatOperatorClose = document.createElement('div');
        const operatorExitMsg = document.createElement('p');
        chatOperatorClose.classList.add('chat__operator-close');
        operatorExitMsg.classList.add('chat__operator-header');
        operatorExitMsg.textContent = 'Оператор вийшов з чату';
        chat.appendChild(chatOperatorClose);
        chatOperatorClose.appendChild(operatorExitMsg);

        const closeButton = document.createElement('button');
        closeButton.classList.add('nav__close', 'chat__close');
        closeButton.textContent = 'Закрити чат';
        chatOperatorClose.appendChild(closeButton);

        closeButton.addEventListener('click', () => {
            // Очистка всех сообщений
            operatoConnect.style.display = 'none';
            const chatOperatorWrappers = document.querySelectorAll('.chat__operator-wrapper, .chat__operator-btns, .chat__user, .chat__operator-close');
            chatOperatorWrappers[0].remove();
            chatOperatorWrappers.forEach(el => el.remove());
    
            const widget = document.querySelector('.widget');
            widget.style.display = 'none';
    
            // Сброс состояния чата            
            currentStep = 'start';
            Object.keys(userData).forEach(key => delete userData[key]);

            inputEnabled = false;
            const inputField = document.querySelector('.user__message');
            inputField.disabled = true;
        });
    }
    
    // функция старта чата
    function startChat() {
        renderQuestion(currentStep);
    }
}