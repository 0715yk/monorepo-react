import {
  checkIntroductionLength,
  checkNicknameCharacter,
  checkNicknameLength,
  checkNicknameWhiteSpace,
  checkPasswordHasLowerCase,
  checkPasswordHasSpecificCharacters,
  checkPasswordHasUpperCase,
  checkPasswordLength,
  checkValidEmail,
} from "@myorg/utils";

export const META_DATA = {
  email: {
    required: true,
    validators: [checkValidEmail],
  },
  nickname: {
    validators: [
      checkNicknameLength,
      checkNicknameCharacter,
      checkNicknameWhiteSpace,
    ],
    required: true,
  },
  password: {
    required: true,
    validators: [
      checkPasswordLength,
      checkPasswordHasUpperCase,
      checkPasswordHasLowerCase,
      checkPasswordHasSpecificCharacters,
    ],
  },
  introduction: {
    validators: [checkIntroductionLength],
    required: false,
  },
};
