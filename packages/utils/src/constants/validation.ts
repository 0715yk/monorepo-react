export const NICKNAME_LENGTH_ERROR_MESSAGE =
  "닉네임은 3글자 이상 15글자 이하로 입력해주세요.";

export const NICKNAME_CHARACTER_ERROR_MESSAGE =
  "닉네임은 특수문자를 제외하고 입력해주세요.";

export const NICKNAME_WHITESPACE_ERROR_MESSAGE =
  "닉네임은 공백을 제외하고 입력해주세요.";

export const REGEX_WITHOUT_CHARACTERS = /^[ㄱ-ㅎ가-힣a-zA-Z0-9\s]*$/;
export const REGEX_CHECK_BLANK = /^\S*$/;

export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const REGEX_TAG = /^[a-zA-Z0-9가-힣]{3,10}$/;

export const REGEX_ALPHABET_UPPER_CASE = /[A-Z]/;
export const REGEX_ALPHABET_LOWER_CASE = /[a-z]/;
export const REGEX_SPECIFIC_CHARACTERS = /[!@#$%^&*(),.?":{}|<>]/;

export const EMAIL_FORMAT_ERROR_MESSAGE = "올바른 이메일 형식이 아닙니다.";
export const PASSWORD_FORMAT_ERROR_MESSAGE =
  "비밀번호는 영문 대소문자와 특수문자를 포함해야 합니다";

export const PASSWORD_LENGTH_ERROR_MESSAGE =
  "비밀번호는 10글자 이상 20글자 이하로 입력해주세요.";

export const TAG_CHARACTER_ERROR_MESSAGE =
  "태그는 영문, 숫자, 한글만 사용 가능합니다";

export const INTRODUCTION_LENGTH_ERROR_MESSAGE =
  "자기소개는 공백 제외 15자 이상이어야 합니다";
