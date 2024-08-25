export default () => {
    // show widget
    const showWidgetBtns = document.querySelectorAll('.widget-show');
    const closeWidgetMenu = document.querySelector('.widget__menu-close');

    showWidgetBtns.forEach(el => {
        el.addEventListener('click', function() {
            draggable.style.display = `block`;

            // operator connect
            const operatoConnect = document.querySelector('.chat__operator-connect');
            setTimeout(() => {
                operatoConnect.style.display = 'block';
                scroll();
                setTimeout(() => {
                    startChat();
                }, 2000);
            }, 3000);
        })
    })
    
    // toggle settings
    const settingsBtn = document.querySelector('.widget__settings');
    const widgetMenu = document.querySelector('.widget__menu');

    settingsBtn.addEventListener('click', function() {
        widgetMenu.classList.add('active');
    })
    closeWidgetMenu.addEventListener('click', function() {
        widgetMenu.classList.remove('active');
    })


    // settings widget
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

    // moving a widget
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


    // minimize a widget
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
    function scroll() {
        const chat = document.querySelector('.chat');
        chat.scroll({
            top: chat.scrollHeight,
            behavior: 'smooth'
        });
    }

    const userData = {};
    
    const chatStart = {
        start: {
            question: 'Як вас звати?',
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
            next: 'end'
        },
        end: {
            question: 'Дякую, це все на сьогодні!',
            type: 'statement',
        }
    };
    
    let currentStep = 'start';

    function formatMessage(template) {
        return template.replace(/{(\w+)}/g, (_, key) => userData[key] || '');
    }
    
    function displayQuestion(step) {
        const currentData = chatStart[step];
    
        if (currentData.messages) {
            displayOperatorMessages(currentData.messages, currentData.type, currentData.choices, currentData.next);
        } else if (currentData.question) {
            createOperatorMessage([{ text: currentData.question }], () => {
                if (currentData.type === 'choice') {
                    createChoiceButtons(currentData.choices);
                } else if (currentData.type === 'input') {
                    // Для вопросов типа 'input' поле ввода должно быть видно
                    document.querySelector('.user__message').value = ''; // Очищаем поле ввода перед фокусом
                    document.querySelector('.user__message').focus(); // Фокус на поле ввода
                }
            });
        }
    }

    function displayOperatorMessages(messages, type, choices, next) {
        createOperatorMessage(messages, () => {
            if (type === 'choice') {
                createChoiceButtons(choices);
            } else if (type === 'input' && next) {
                // Если это шаг типа 'input', ожидаем ввода от пользователя
                // Переключаемся на следующий шаг только после ввода
            } else if (next) {
                goToNextStep(next);
            }
        });
    }
    
    function goToNextStep(nextStep) {
        currentStep = nextStep;
        displayQuestion(currentStep);
    }
    
    function handleUserInput() {
        const input = document.querySelector('.user__message').value.trim();
        if (input) {
            if (currentStep === 'start') {
                userData.value = input; // Сохраняем имя пользователя
            } else if (chatStart[currentStep].type === 'input') {
                userData.age = input; // Сохраняем введенный возраст
            }
            createUserMessage(input); // Отображаем сообщение пользователя
            document.querySelector('.user__message').value = ''; // Очищаем поле ввода
            goToNextStep(chatStart[currentStep].next);
        }
    }
    
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

    document.querySelector('.chat').addEventListener('click', (event) => {
        if (event.target.classList.contains('chat__operator-btn')) {
            const choice = {
                text: event.target.textContent,
                value: event.target.dataset.gender
            };
            handleChoice(choice);
        }
    });
    
    function createOperatorMessage(messages, callback = null) {
    
        const lastOperatorWrapper = document.querySelector('.chat__operator-wrapper:last-child');
        let messageContainer;
    
        if (lastOperatorWrapper && !lastOperatorWrapper.querySelector('.chat__operator-writes')) {
            // Если это продолжение предыдущего сообщения, добавляем в тот же блок
            messageContainer = lastOperatorWrapper.querySelector('.chat__operator-msg');
        } else {
            // Иначе создаем новый блок
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
        }
    
        const typingMessage = document.createElement('p');
        typingMessage.classList.add('chat__operator-writes');
        typingMessage.textContent = 'Друкує повідомлення...';
    
        const doneMessage = document.createElement('div');
        doneMessage.classList.add('chat__operator-msg-done');
        doneMessage.style.display = 'none';
    
        const messageText = document.createElement('p');
        messageText.classList.add('chat__operator-text');
        messageText.textContent = formatMessage(messages[0].text);
    
        doneMessage.appendChild(messageText);
        messageContainer.appendChild(typingMessage);
        messageContainer.appendChild(doneMessage);
    
        scroll();
    
        // Первое сообщение
        simulateTypingEffect(typingMessage, doneMessage, messageText.textContent.length, () => {
            // После первого сообщения
            if (messages.length > 1) {
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
    
                const timeSpan = document.createElement('span');
                timeSpan.classList.add('time', 'time-current');
                timeSpan.textContent = new Date().toLocaleTimeString();
    
                doneMessageSecond.appendChild(messageTextSecond);
                doneMessageSecond.appendChild(timeSpan);
                messageContainer.appendChild(typingMessageSecond);
                messageContainer.appendChild(doneMessageSecond);
    
                scroll();
    
                simulateTypingEffect(typingMessageSecond, doneMessageSecond, messageTextSecond.textContent.length, callback);
            } else if (callback) {
                callback();
            }
        });
    }
    
    function simulateTypingEffect(typingMessage, doneMessage, textLength, callback = null) {
        const typingDuration = textLength * 100;
        setTimeout(() => {
            typingMessage.style.display = 'none';
            doneMessage.style.display = 'block';
            if (callback) {
                callback();
            }
            scroll();
        }, typingDuration);
    }
    
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
    
    function startChat() {
        displayQuestion(currentStep);
    }
}