import './PasswordStrengthIndicator.css';

export type PasswordStrength = 'weak' | 'medium' | 'strong';

export type PasswordCheck = {
    label: string;
    passed: boolean;
};

function getPasswordChecks(password: string): PasswordCheck[] {
    return [
        { label: 'At least 8 characters', passed: password.length >= 8 },
        { label: 'Contains a number', passed: /\d/.test(password) },
        { label: 'Contains an uppercase letter', passed: /[A-Z]/.test(password) },
        { label: 'Contains a special character', passed: /[^A-Za-z0-9]/.test(password) },
    ];
}

function getPasswordStrength(password: string): PasswordStrength {
    if (!password) {
        return 'weak';
    }

    const passedCount = getPasswordChecks(password).filter((check) => check.passed).length;

    if (passedCount <= 2) {
        return 'weak';
    }
    if (passedCount === 3) {
        return 'medium';
    }
    return 'strong';
}

interface PasswordStrengthIndicatorProps {
    password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
    const strength = getPasswordStrength(password);
    const checks = getPasswordChecks(password);

    return (
        <span className="password-strength" tabIndex={0}>
            <span className={`password-strength-dot password-strength-dot--${strength}`} />

            <span className="password-strength-tooltip" role="tooltip">
                <ul className="password-strength-checklist">
                    {checks.map((check) => (
                        <li
                            key={check.label}
                            className={check.passed ? 'password-strength-check--passed' : ''}
                        >
                            {check.passed ? '✓' : '✗'} {check.label}
                        </li>
                    ))}
                </ul>
            </span>
        </span>
    );
}
