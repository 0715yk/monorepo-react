// 유효성 검사 로직을 만든다

// import {
//   checkNicknameLength,
//   checkNicknameCharacter,
//   checkNicknameWhiteSpace,
//   tap,
// } from "@myorg/utils";

// 닉네임

// 3글자 - 15글자 사이
// 특수문자 제외
// 공백 제외

// 만약에 모든 조건을 만족하면 error message "" 를 반환한다.
// 만약에 조건을 만족하지 못하면 error message "닉네임은 3글자 이상 15글자 이하로 입력해주세요." 를 반환한다
// 만약에 조건을 만족하지 못하면 error message "닉네임은 특수문자를 제외하고 입력해주세요." 를 반환한다
// 만약에 조건을 만족하지 못하면 error message "닉네임은 공백을 제외하고 입력해주세요." 를 반환한다
// 그리고 이를 Either로 구현하고

// 마지막에는 IO 모나드를 사용해서 실제로 렌더링한다.
