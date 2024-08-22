export default () => {
    // show widget
    const showWidgetBtns = document.querySelectorAll('.widget-show');
    const closeWidgetMenu = document.querySelector('.widget__menu-close');

    showWidgetBtns.forEach(el => {
        el.addEventListener('click', function() {
            draggable.style.display = `block`;
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
}