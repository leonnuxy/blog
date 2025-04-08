export function showToast(message: string, type: 'success' | 'error'): void {
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');
    
    if (!toast || !toastMessage) return;
    
    toast.className = `toast ${type}`;
    toastMessage.textContent = message;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Inside notifications.ts
export function showConfirmDialog(message: string): Promise<boolean> {
    return new Promise((resolve) => {
        const confirmDialog = document.getElementById('confirm-dialog') as HTMLDivElement;
        const messageElement = confirmDialog.querySelector('p') as HTMLParagraphElement;
        const confirmButton = document.getElementById('confirm-delete-btn') as HTMLButtonElement;
        const cancelButton = document.getElementById('cancel-delete-btn') as HTMLButtonElement;

        if (!confirmDialog || !messageElement || !confirmButton || !cancelButton) {
            resolve(false);
            return;
        }

        messageElement.textContent = message;
        confirmDialog.classList.add('active', 'open');

        const handleConfirm = () => {
            confirmDialog.classList.remove('active', 'open');
            cleanupListeners();
            resolve(true);
        };

        const handleCancel = () => {
            confirmDialog.classList.remove('active', 'open');
            cleanupListeners();
            resolve(false);
        };

        const cleanupListeners = () => {
            confirmButton.removeEventListener('click', handleConfirm);
            cancelButton.removeEventListener('click', handleCancel);
        };

        confirmButton.addEventListener('click', handleConfirm);
        cancelButton.addEventListener('click', handleCancel);
    });
}