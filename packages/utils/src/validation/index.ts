import { curry, Either, pipe } from "../functional";
import {
  REGEX_WITHOUT_CHARACTERS,
  NICKNAME_CHARACTER_ERROR_MESSAGE,
  NICKNAME_LENGTH_ERROR_MESSAGE,
  NICKNAME_WHITESPACE_ERROR_MESSAGE,
  REGEX_CHECK_BLANK,
  REGEX_EMAIL,
  EMAIL_FORMAT_ERROR_MESSAGE,
  REGEX_ALPHABET_UPPER_CASE,
  PASSWORD_FORMAT_ERROR_MESSAGE,
  REGEX_ALPHABET_LOWER_CASE,
  REGEX_SPECIFIC_CHARACTERS,
  PASSWORD_LENGTH_ERROR_MESSAGE,
  TAG_CHARACTER_ERROR_MESSAGE,
  REGEX_TAG,
  INTRODUCTION_LENGTH_ERROR_MESSAGE,
} from "../constants/validation";

// 자기소개 검사: 공백 제외 15자 이상
export const isValidIntroduction = (intro: string): boolean => {
  const trimmedLength = intro.replace(/\s/g, "").length;
  return trimmedLength >= 15;
};

export const replaceAllBlack = (value: string) => value.replace(/\s/g, "");

export const checkStringLength = curry(
  (from: number, to: number, message: string, value: string) =>
    value.trim().length >= from && value.length <= to
      ? Either.right(value)
      : Either.left(message)
);

export const checkSpeicalCharacter = curry(
  (regex: RegExp, message: string, value: string) =>
    regex.test(value) ? Either.right(value) : Either.left(message)
);

export const checkNicknameLength = checkStringLength(
  3,
  15,
  NICKNAME_LENGTH_ERROR_MESSAGE
);

export const checkNicknameCharacter = checkSpeicalCharacter(
  REGEX_WITHOUT_CHARACTERS,
  NICKNAME_CHARACTER_ERROR_MESSAGE
);

export const checkNicknameWhiteSpace = checkSpeicalCharacter(
  REGEX_CHECK_BLANK,
  NICKNAME_WHITESPACE_ERROR_MESSAGE
);

export const checkValidEmail = checkSpeicalCharacter(
  REGEX_EMAIL,
  EMAIL_FORMAT_ERROR_MESSAGE
);

export const checkPasswordHasUpperCase = checkSpeicalCharacter(
  REGEX_ALPHABET_UPPER_CASE,
  PASSWORD_FORMAT_ERROR_MESSAGE
);

export const checkPasswordHasLowerCase = checkSpeicalCharacter(
  REGEX_ALPHABET_LOWER_CASE,
  PASSWORD_FORMAT_ERROR_MESSAGE
);

export const checkPasswordHasSpecificCharacters = checkSpeicalCharacter(
  REGEX_SPECIFIC_CHARACTERS,
  PASSWORD_FORMAT_ERROR_MESSAGE
);

export const checkPasswordLength = checkStringLength(
  10,
  20,
  PASSWORD_LENGTH_ERROR_MESSAGE
);

export const checkTagCharacter = checkSpeicalCharacter(
  REGEX_TAG,
  TAG_CHARACTER_ERROR_MESSAGE
);

export const checkIntroductionLength = pipe(
  replaceAllBlack,
  checkStringLength(
    15,
    Number.MAX_SAFE_INTEGER,
    INTRODUCTION_LENGTH_ERROR_MESSAGE
  )
);
