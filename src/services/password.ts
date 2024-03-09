export enum PasswordStrength {
    STRENGTH_VERY_WEAK = 0,
    STRENGTH_WEAK = 1,
    STRENGTH_MEDIUM = 2,
    STRENGTH_STRONG = 3,
    STRENGTH_VERY_STRONG = 4,
}

type CharCountMap = {
    [char: string]: number;
};

export const estimateStrength = (password: string): PasswordStrength => {
    if (!password.length) {
        return PasswordStrength.STRENGTH_VERY_WEAK;
    }

    const charCount: CharCountMap = Array.from(password).reduce((countMap: CharCountMap, char: string) => {
        countMap[char] = (countMap[char] || 0) + 1;
        return countMap;
    }, {});

    const chars = Object.keys(charCount).length;

    let control = 0,
        digit = 0,
        upper = 0,
        lower = 0,
        symbol = 0,
        other = 0;

    for (const char in charCount) {
        switch (true) {
            case parseInt(char) < 32 || 127 === parseInt(char):
                control = 33;
                break;
            case 48 <= parseInt(char) && parseInt(char) <= 57:
                digit = 10;
                break;
            case 65 <= parseInt(char) && parseInt(char) <= 90:
                upper = 26;
                break;
            case 97 <= parseInt(char) && parseInt(char) <= 122:
                lower = 26;
                break;
            case 128 <= parseInt(char):
                other = 128;
                break;
            default:
                symbol = 33;
        }
    }

    const pool = lower + upper + digit + symbol + control + other;
    const entropy = chars * Math.log2(pool) + (password.length - chars) * Math.log2(chars);

    console.log(entropy);

    switch (true) {
        case entropy >= 120:
            return PasswordStrength.STRENGTH_VERY_STRONG;
        case entropy >= 100:
            return PasswordStrength.STRENGTH_STRONG;
        case entropy >= 80:
            return PasswordStrength.STRENGTH_MEDIUM;
        case entropy >= 60:
            return PasswordStrength.STRENGTH_WEAK;
        default:
            return PasswordStrength.STRENGTH_VERY_WEAK;
    }
};
