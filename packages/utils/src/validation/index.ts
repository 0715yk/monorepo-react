import * as E from "fp-ts/Either";
import { curry, Either } from "../functional";
import {
  REGEX_WITHOUT_CHARACTERS,
  NICKNAME_CHARACTER_ERROR_MESSAGE,
  NICKNAME_LENGTH_ERROR_MESSAGE,
  NICKNAME_WHITESPACE_ERROR_MESSAGE,
  REGEX_CHECK_BLANK,
} from "../constants/validation";

export const isNotBlank = (value: string): E.Either<string, string> =>
  value.trim() !== "" ? E.right(value) : E.left("Value cannot be blank");

export const isLengthValid =
  (min: number, max: number, message: string) =>
  (value: string): E.Either<string, string> =>
    value.length >= min && value.length <= max
      ? E.right(value)
      : E.left(message);

// 이메일 형식 검사
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 닉네임 검사: 3-10자, 특수문자 불가
export const isValidNickname = (nickname: string): boolean => {
  const nicknameRegex = /^[a-zA-Z0-9가-힣]{3,10}$/;
  return nicknameRegex.test(nickname);
};

// 비밀번호 검사: 10-20자, 영문 대소문자/특수문자 필수
export const isValidPassword = (password: string): boolean => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasValidLength = password.length >= 10 && password.length <= 20;

  return hasUpperCase && hasLowerCase && hasSpecialChar && hasValidLength;
};

// 태그 검사: 3-10자, 특수문자/공백 불가
export const isValidTag = (tag: string): boolean => {
  const tagRegex = /^[a-zA-Z0-9가-힣]{3,10}$/;
  return tagRegex.test(tag);
};

// 자기소개 검사: 공백 제외 15자 이상
export const isValidIntroduction = (intro: string): boolean => {
  const trimmedLength = intro.replace(/\s/g, "").length;
  return trimmedLength >= 15;
};

export const checkStringLength = curry(
  (from: number, to: number, message: string, value: string) =>
    value.length >= from && value.length <= to
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
