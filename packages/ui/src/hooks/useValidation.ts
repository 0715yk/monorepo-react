import { useCallback, useEffect, useRef, useState } from "react";
import { createFieldValidator } from "../utils/validator";
import {
  ErrorMessage,
  FormData,
  FormErrors,
  MetaData,
  ValidatorRef,
} from "../types/validator";
import { useSkipFirstRender } from "./useSkipFirstRender";
import { alt, identity, isValid, sequence } from "@myorg/utils";
import { curry } from "lodash";

interface UseValidationProps {
  formData: FormData;
  metadata?: MetaData;
}

/* 
** Document ** 
: useValidation은 form 데이터와 metadata를 받아서 form 데이터의 유효성을 검사하는 커스텀 훅입니다.
- metadata는 form 데이터의 필드에 대한 유효성 검사 규칙을 정의합니다.
ex) 
const META_DATA = {
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

이 때, 모든 유효성 검사 함수는 Either.right or Either.left를 반환해야 합니다.
- formData는 실제로 이 커스텀 훅을 가져다 쓰는 컴포넌트(예를 들어, Signup or Form 등)에서 관리하는 form 데이터입니다.
ex) 
  const [formData, setFormData] = useState<FormData>({
    email: "",
    nickname: "",
    password: "",
    introduction: "",
  });

이 때, formData의 타입은 packages/ui/src/types/validator.ts에 정의된 FormData 타입에 맞춰서 써야합니다. 
input 태그를 쓰는 value에 한하여 유효성 검사 로직을 만든 것이기 때문에 모든 value는 string이라고 가정합니다.

- 실제 가져다 쓸 때는 

const { errors, isFormValid } = useValidation({
  formData,
  metadata: META_DATA,
});

이런식을로 사용하고, errors에는 formData 각 필드에 대한 유효성 검사 결과가 담겨있고, isFormValid는 전체 form 데이터가 유효한지를 나타냅니다.
따라서 컴포넌트(Input 태그등)에서 사용할 때 이런식으로 활용합니다. 

<FormGroup>
  <Label>{META_DATA.password.required && <span>*</span>}비밀번호</Label>
  <Input
    type="password"
    name="password"
    data-testid="password-input"
    hasError={isValid(errors.password)}
    value={formData.password}
    onChange={handleChange}
  />
  {errors.password && (
    <ErrorMessage data-testid="password-error">
      {errors.password}
    </ErrorMessage>
  )}
</FormGroup>

포인트는 errors.특정_필드_이름에 에러가 있으면 에러 메시지가 할당되고, 문제가 없으면 "" 이 할당된다는 것 입니다. 또한, 초기 아무 값도 입력하지 않았을 때는 
에러가 없는 상태지만, 유효성 검사를 통과한 상태는 아니기 때문에 undefined로 처리 됩니다.

- 마지막으로 submit 버튼을 유효성 검사 clear 여부에 따라 활성, 비활성 처리를 하고자 할 때는 이런식으로 가져다 쓰면 됩니다.

<SubmitButton
  type="submit"
  data-testid="submit-button"
  disabled={!isFormValid}
>
  가입하기
</SubmitButton>

** PS
<Label>{META_DATA.password.required && <span>*</span>}비밀번호</Label>
required 여부를 UI로 표시하고자 할 때는 따로 훅에서 정보를 제공하진 않으며, META_DATA(hook에 파라미터로 제공하는)에서
가져다가 위와 같이 써주시면 됩니다.
*/

export const useValidation = ({ formData, metadata }: UseValidationProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const prevFormData = useRef(formData);
  const validatorRef = useRef<ValidatorRef>({});

  const filterActualChangedFields = useCallback(
    (field: string) => formData[field] !== prevFormData.current[field],
    [formData]
  );

  const checkValueIsReset = useCallback(
    (field: string) => !isValid(formData[field]),
    [formData]
  );

  const activateValidator = useCallback(
    (field: string) => {
      validatorRef.current[field](formData[field]);
    },
    [formData]
  );

  const checkValidatorSaved = useCallback(
    (field: string) => validatorRef?.current && validatorRef.current[field],
    []
  );
  const handleSetErrors = useCallback(
    curry((value: ErrorMessage, field: string) => {
      setErrors((prev) => ({
        ...prev,
        [field]: value,
      }));
    }),
    []
  );

  const handleNotRequiredField = handleSetErrors("");
  const handleFirstRenderingField = handleSetErrors(undefined);

  const handleValidate = (formData: FormData) => {
    Object.keys(formData)
      .filter(filterActualChangedFields)
      .forEach(
        alt(
          checkValidatorSaved,
          alt(
            checkValueIsReset,
            alt(isRequired, handleFirstRenderingField, handleNotRequiredField),
            activateValidator
          ),
          identity
        )
      );
  };

  const resetPrevFormData = (formData: FormData) => {
    prevFormData.current = formData;
  };

  useSkipFirstRender(() => {
    sequence(handleValidate, resetPrevFormData)(formData);
  }, [formData, metadata]);

  const hasMetaData = useCallback(
    (metadata: MetaData | undefined) => metadata !== undefined,
    [metadata]
  );

  const hasValidator = useCallback(
    (field: string) =>
      hasMetaData(metadata) && metadata[field] !== undefined ? field : false,
    [metadata]
  );

  const isRequired = useCallback(
    (field: string) =>
      hasMetaData(metadata) && metadata[field].required ? true : false,
    [metadata]
  );

  const initializeErrors = useCallback((formData: FormErrors) => {
    Object.keys(formData).forEach(handleFirstRenderingField);
  }, []);

  const initializeValidator = useCallback(
    (field: string) => {
      validatorRef.current[field] = createFieldValidator(
        field,
        setErrors
      ).createCheckField((metadata as MetaData)[field].validators);
    },
    [metadata]
  );

  const initializeMetadata = useCallback(() => {
    Object.keys(formData).forEach(
      alt(
        hasValidator,
        sequence(
          initializeValidator,
          alt(isRequired, identity, handleNotRequiredField)
        ),
        identity
      )
    );
  }, [formData, initializeValidator, isRequired, handleSetErrors]);

  useEffect(() => {
    initializeErrors(formData);
    initializeMetadata();
  }, []);

  const isValidData = (message: ErrorMessage) => message === "";
  const isFormValid = Object.values(errors).every(isValidData);

  return {
    errors,
    isFormValid,
  };
};
