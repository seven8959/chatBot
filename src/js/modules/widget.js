export default () => {
    // Moving a chat

    const draggable = document.querySelector('.widget');
    const movingArea = document.querySelector('.widget__top');
    let isDraggable = false;
    let offsetX, offsetY;

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
        if (window.innerWidth >= 1250) {
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
            draggable.style.left = '50%';
            draggable.style.top = '50%';
            draggable.style.transform = 'translate(-50%, -50%)';
        }
    }

    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
}