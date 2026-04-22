// Maps Firebase Auth error codes to user-facing Ukrainian messages.
// Keeping login/register wording identical for credential errors makes user
// enumeration harder (don't leak whether an email is registered).
const firebaseAuthErrors = {
    "auth/invalid-email": "Невірний формат email",
    "auth/user-not-found": "Невірний email або пароль",
    "auth/wrong-password": "Невірний email або пароль",
    "auth/invalid-credential": "Невірний email або пароль",
    "auth/invalid-login-credentials": "Невірний email або пароль",
    "auth/user-disabled": "Обліковий запис заблоковано",
    "auth/email-already-in-use": "Користувач з цією поштою вже існує",
    "auth/weak-password": "Занадто слабкий пароль",
    "auth/too-many-requests": "Забагато спроб. Спробуйте пізніше",
    "auth/network-request-failed": "Проблеми зі з'єднанням. Перевірте інтернет",
    "auth/popup-closed-by-user": "Вікно входу закрито. Спробуйте ще раз",
    "auth/popup-blocked": "Браузер заблокував спливаюче вікно",
    "auth/cancelled-popup-request": "Попередній запит на вхід не завершено",
    "auth/account-exists-with-different-credential":
        "Цей email вже використовується з іншим способом входу",
    "auth/requires-recent-login": "Потрібно знову увійти, щоб підтвердити дію",
    "auth/expired-action-code": "Посилання застаріло. Запросіть нове",
    "auth/invalid-action-code": "Посилання недійсне або вже використане",
}

export const firebaseAuthErrorMessage = (err) => {
    const code = typeof err === "string" ? err : err?.code
    return firebaseAuthErrors[code] || "Щось пішло не так. Спробуйте ще раз"
}

// react-hook-form setError-ready helper
export const firebaseAuthErrorToFormError = (err) => ({
    type: err?.code || "unknown",
    message: firebaseAuthErrorMessage(err),
})
