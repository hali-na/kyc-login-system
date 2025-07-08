// KYC 认证系统 JavaScript 功能

// 工具函数
const Utils = {
    // 邮箱验证
    validateEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // 密码强度检查
    checkPasswordStrength: (password) => {
        let score = 0;
        let feedback = [];

        if (password.length >= 8) score += 1;
        else feedback.push('至少8个字符');

        if (/[a-z]/.test(password)) score += 1;
        else feedback.push('包含小写字母');

        if (/[A-Z]/.test(password)) score += 1;
        else feedback.push('包含大写字母');

        if (/[0-9]/.test(password)) score += 1;
        else feedback.push('包含数字');

        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        else feedback.push('包含特殊字符');

        const levels = ['weak', 'weak', 'fair', 'good', 'strong'];
        const texts = ['弱', '弱', '一般', '良好', '强'];
        
        return {
            score,
            level: levels[score],
            text: texts[score],
            feedback
        };
    },

    // 显示字段消息
    showFieldMessage: (fieldId, message, type = 'error') => {
        const messageEl = document.getElementById(fieldId + 'Message');
        const inputEl = document.getElementById(fieldId);
        
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = `field-message ${type}`;
        }
        
        if (inputEl) {
            inputEl.classList.toggle('error', type === 'error');
        }
    },

    // 清除字段消息
    clearFieldMessage: (fieldId) => {
        const messageEl = document.getElementById(fieldId + 'Message');
        const inputEl = document.getElementById(fieldId);
        
        if (messageEl) {
            messageEl.textContent = '';
            messageEl.className = 'field-message';
        }
        
        if (inputEl) {
            inputEl.classList.remove('error');
        }
    },

    // 显示全局消息
    showGlobalMessage: (message, type = 'error') => {
        const messageEl = document.getElementById('globalMessage');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = `global-message ${type}`;
            messageEl.style.display = 'block';
        }
    },

    // 隐藏全局消息
    hideGlobalMessage: () => {
        const messageEl = document.getElementById('globalMessage');
        if (messageEl) {
            messageEl.style.display = 'none';
        }
    },

    // 设置按钮加载状态
    setButtonLoading: (buttonId, loading = true) => {
        const button = document.getElementById(buttonId);
        if (button) {
            const textEl = button.querySelector('.btn-text');
            const loadingEl = button.querySelector('.btn-loading');
            
            if (loading) {
                textEl.style.display = 'none';
                loadingEl.style.display = 'flex';
                button.disabled = true;
            } else {
                textEl.style.display = 'block';
                loadingEl.style.display = 'none';
                button.disabled = false;
            }
        }
    },

    // 防抖函数
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// 密码切换功能
function initPasswordToggle(toggleId, inputId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    
    if (toggle && input) {
        toggle.addEventListener('click', () => {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            const icon = toggle.querySelector('.toggle-icon');
            icon.textContent = type === 'password' ? '👁' : '🙈';
        });
    }
}

// 密码强度指示器 - 简化版本，不显示复杂指示器
function initPasswordStrength() {
    // 保持简洁，不显示密码强度指示器
    return;
}

// 登录表单初始化
function initLoginForm() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // 初始化密码切换
    initPasswordToggle('passwordToggle', 'password');
    
    // 邮箱验证
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email && !Utils.validateEmail(email)) {
            Utils.showFieldMessage('email', '请输入有效的邮箱地址');
        } else {
            Utils.clearFieldMessage('email');
        }
    });
    
    // 表单提交
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // 清除之前的错误
        Utils.hideGlobalMessage();
        Utils.clearFieldMessage('email');
        Utils.clearFieldMessage('password');
        
        // 验证
        let hasError = false;
        
        if (!email) {
            Utils.showFieldMessage('email', 'Please input your email!');
            hasError = true;
        } else if (!Utils.validateEmail(email)) {
            Utils.showFieldMessage('email', 'Please input a valid email!');
            hasError = true;
        }

        if (!password) {
            Utils.showFieldMessage('password', 'Please input your password!');
            hasError = true;
        }
        
        if (hasError) return;
        
        // 模拟登录请求
        Utils.setButtonLoading('loginBtn', true);
        
        try {
            // 这里应该调用实际的登录API
            await simulateApiCall();
            
            // 登录成功
            Utils.showGlobalMessage('Login successful! Redirecting...', 'success');

            // 模拟跳转
            setTimeout(() => {
                // window.location.href = '/dashboard';
                console.log('Redirecting to dashboard');
            }, 1500);

        } catch (error) {
            Utils.showGlobalMessage('Login failed. Please check your email and password.', 'error');
        } finally {
            Utils.setButtonLoading('loginBtn', false);
        }
    });
}

// 注册表单初始化
function initSignupForm() {
    const form = document.getElementById('signupForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // 初始化密码切换
    initPasswordToggle('passwordToggle', 'password');
    initPasswordToggle('confirmPasswordToggle', 'confirmPassword');
    
    // 初始化密码强度指示器
    initPasswordStrength();
    
    // 邮箱验证
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email && !Utils.validateEmail(email)) {
            Utils.showFieldMessage('email', '请输入有效的邮箱地址');
        } else {
            Utils.clearFieldMessage('email');
        }
    });
    
    // 确认密码验证
    confirmPasswordInput.addEventListener('blur', () => {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword && password !== confirmPassword) {
            Utils.showFieldMessage('confirmPassword', '两次输入的密码不一致');
        } else {
            Utils.clearFieldMessage('confirmPassword');
        }
    });
    
    // 表单提交
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // 清除之前的错误
        Utils.hideGlobalMessage();
        Utils.clearFieldMessage('email');
        Utils.clearFieldMessage('password');
        Utils.clearFieldMessage('confirmPassword');
        
        // 验证
        let hasError = false;
        
        if (!email) {
            Utils.showFieldMessage('email', 'Please input your email!');
            hasError = true;
        } else if (!Utils.validateEmail(email)) {
            Utils.showFieldMessage('email', 'Please input a valid email!');
            hasError = true;
        }

        if (!password) {
            Utils.showFieldMessage('password', 'Please input your password!');
            hasError = true;
        }

        if (!confirmPassword) {
            Utils.showFieldMessage('confirmPassword', 'Please confirm your password!');
            hasError = true;
        } else if (password !== confirmPassword) {
            Utils.showFieldMessage('confirmPassword', 'Passwords do not match!');
            hasError = true;
        }
        
        if (hasError) return;
        
        // 模拟注册请求
        Utils.setButtonLoading('signupBtn', true);
        
        try {
            // 这里应该调用实际的注册API
            await simulateApiCall();
            
            // 注册成功
            Utils.showGlobalMessage('Registration successful! Redirecting to login...', 'success');

            // 跳转到登录页面
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);

        } catch (error) {
            Utils.showGlobalMessage('Registration failed. Please try again.', 'error');
        } finally {
            Utils.setButtonLoading('signupBtn', false);
        }
    });
}

// 忘记密码表单初始化
function initForgotPasswordForm() {
    const form = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const successMessage = document.getElementById('successMessage');
    const resendBtn = document.getElementById('resendBtn');
    
    // 邮箱验证
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email && !Utils.validateEmail(email)) {
            Utils.showFieldMessage('email', '请输入有效的邮箱地址');
        } else {
            Utils.clearFieldMessage('email');
        }
    });
    
    // 重新发送按钮
    if (resendBtn) {
        resendBtn.addEventListener('click', () => {
            // 重新发送逻辑
            handlePasswordReset(emailInput.value.trim());
        });
    }
    
    // 表单提交
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // 清除之前的错误
        Utils.hideGlobalMessage();
        Utils.clearFieldMessage('email');
        
        // 验证
        if (!email) {
            Utils.showFieldMessage('email', 'Please input your email!');
            return;
        }

        if (!Utils.validateEmail(email)) {
            Utils.showFieldMessage('email', 'Please input a valid email!');
            return;
        }
        
        await handlePasswordReset(email);
    });
    
    async function handlePasswordReset(email) {
        Utils.setButtonLoading('resetBtn', true);
        
        try {
            // 这里应该调用实际的重置密码API
            await simulateApiCall();
            
            // 隐藏表单，显示成功消息
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
        } catch (error) {
            Utils.showGlobalMessage('Failed to send. Please try again.', 'error');
        } finally {
            Utils.setButtonLoading('resetBtn', false);
        }
    }
}

// 模拟API调用
function simulateApiCall() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 90% 成功率
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('API Error'));
            }
        }, 2000);
    });
}

// 页面加载完成后的通用初始化
document.addEventListener('DOMContentLoaded', () => {
    // 自动聚焦第一个输入框
    const firstInput = document.querySelector('input[type="email"], input[type="text"]');
    if (firstInput) {
        firstInput.focus();
    }
    
    // 键盘导航支持
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement.tagName === 'INPUT') {
                const form = activeElement.closest('form');
                if (form) {
                    const submitBtn = form.querySelector('button[type="submit"]');
                    if (submitBtn && !submitBtn.disabled) {
                        submitBtn.click();
                    }
                }
            }
        }
    });
});
