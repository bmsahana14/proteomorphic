// Toast Notification System
const NotificationSystem = {
    container: null,

    init() {
        // Create notification container
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'notification-container';
            this.container.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 400px;
      `;
            document.body.appendChild(this.container);
        }
    },

    show(message, type = 'info', duration = 4000) {
        this.init();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        const colors = {
            success: { bg: 'rgba(16, 185, 129, 0.1)', border: '#10b981', text: '#10b981' },
            error: { bg: 'rgba(239, 68, 68, 0.1)', border: '#ef4444', text: '#ef4444' },
            warning: { bg: 'rgba(245, 158, 11, 0.1)', border: '#f59e0b', text: '#f59e0b' },
            info: { bg: 'rgba(91, 141, 239, 0.1)', border: '#5B8DEF', text: '#5B8DEF' }
        };

        const color = colors[type] || colors.info;

        notification.style.cssText = `
      background: ${color.bg};
      backdrop-filter: blur(20px);
      border: 1px solid ${color.border};
      border-left: 4px solid ${color.border};
      border-radius: 12px;
      padding: 16px 20px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      gap: 12px;
      animation: slideIn 0.3s ease;
      cursor: pointer;
    `;

        notification.innerHTML = `
      <span style="font-size: 1.5rem;">${icons[type]}</span>
      <span style="color: ${color.text}; font-weight: 500; flex: 1;">${message}</span>
      <button style="background: none; border: none; color: ${color.text}; cursor: pointer; font-size: 1.2rem; opacity: 0.7; padding: 0 4px;" onclick="this.parentElement.remove()">×</button>
    `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
        if (!document.getElementById('notification-styles')) {
            style.id = 'notification-styles';
            document.head.appendChild(style);
        }

        this.container.appendChild(notification);

        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }

        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
    },

    success(message, duration) {
        this.show(message, 'success', duration);
    },

    error(message, duration) {
        this.show(message, 'error', duration);
    },

    warning(message, duration) {
        this.show(message, 'warning', duration);
    },

    info(message, duration) {
        this.show(message, 'info', duration);
    }
};

// Make it globally available
window.notify = NotificationSystem;

// Auto-initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NotificationSystem.init());
} else {
    NotificationSystem.init();
}
