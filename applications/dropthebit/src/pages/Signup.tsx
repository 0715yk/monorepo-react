import { useState } from "react";
import styled from "@emotion/styled";
import { META_DATA } from "../constants/validator";
import { useValidation, FormData } from "@myorg/ui";
import { isValid } from "@myorg/utils";

const Container = styled.div`
  width: 450px;
  margin: 2rem auto;
  padding: 2rem;
  box-sizing: border-box;
  background: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: #fff;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #fff;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #fff;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  background: #2a2a2a;
  border: 1px solid ${(props) => (props.hasError ? "#ff4444" : "#3a3a3a")};
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#ff4444" : "#4a4a4a")};
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  background: #2a2a2a;
  border: 1px solid ${(props) => (props.hasError ? "#ff4444" : "#3a3a3a")};
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;
  min-height: 120px;
  resize: vertical;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#ff4444" : "#4a4a4a")};
  }
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

// const TagInputContainer = styled.div`
//   display: flex;
//   gap: 0.5rem;
// `;

// const TagButton = styled.button`
//   padding: 0.5rem 1rem;
//   box-sizing: border-box;
//   width: 100px;
//   height: 40px;
//   background: #333;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background: #444;
//   }
// `;

// const TagList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
//   margin-top: 0.5rem;
// `;

// const TagItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
//   padding: 0.25rem 0.5rem;
//   background: #2a2a2a;
//   border: 1px solid #3a3a3a;
//   border-radius: 4px;
//   color: #fff;
// `;

// const TagRemoveButton = styled.button`
//   background: none;
//   border: none;
//   color: #ff4444;
//   cursor: pointer;
//   padding: 0 0.25rem;
//   font-size: 1.2rem;
//   line-height: 1;

//   &:hover {
//     color: #ff0000;
//   }
// `;

const SubmitButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 0.75rem;
  background: ${(props) => (props.disabled ? "#222" : "#333")};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${(props) => (props.disabled ? "#222" : "#444")};
  }
`;

export default function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    nickname: "",
    password: "",
    introduction: "",
  });

  // const [tagInput, setTagInput] = useState("");
  const { errors, isFormValid } = useValidation({
    formData,
    metadata: META_DATA,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleTagSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!checkTagCharacter(tagInput)) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       tag: "태그는 3-10자의 영문, 숫자, 한글만 사용 가능합니다",
  //     }));
  //     return;
  //   }

  //   if (formData.tags.includes(tagInput)) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       tag: "이미 존재하는 태그입니다",
  //     }));
  //     return;
  //   }

  //   setFormData((prev) => ({
  //     ...prev,
  //     tags: [...prev.tags, tagInput],
  //   }));
  //   setTagInput("");
  //   setErrors((prev) => ({ ...prev, tag: undefined }));
  // };

  // const removeTag = (tagToRemove: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     tags: prev.tags.filter((tag) => tag !== tagToRemove),
  //   }));
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <form onSubmit={handleSubmit} noValidate>
        <FormGroup>
          <Label>{META_DATA.email.required && <span>*</span>}이메일</Label>
          <Input
            type="email"
            name="email"
            data-testid="email-input"
            hasError={isValid(errors.email)}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <ErrorMessage data-testid="email-error">
              {errors.email}
            </ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>{META_DATA.nickname.required && <span>*</span>}닉네임</Label>
          <Input
            type="text"
            name="nickname"
            data-testid="nickname-input"
            hasError={isValid(errors.nickname)}
            value={formData.nickname}
            onChange={handleChange}
          />
          {errors.nickname && (
            <ErrorMessage data-testid="nickname-error">
              {errors.nickname}
            </ErrorMessage>
          )}
        </FormGroup>
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
        {/* 
        <FormGroup>
          <Label>태그</Label>
          <TagInputContainer>
            <Input
              type="text"
              value={tagInput}
              data-testid="tag-input"
              hasError={!!errors.tag}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="태그 입력"
            />
            <TagButton
              type="button"
              data-testid="tag-submit"
              onClick={handleTagSubmit}
            >
              추가
            </TagButton>
          </TagInputContainer>
          {errors.tag && (
            <ErrorMessage data-testid="tag-error">{errors.tag}</ErrorMessage>
          )}
          <TagList>
            {formData.tags.map((tag, index) => (
              <TagItem key={index} data-testid={`tag-item-${index}`}>
                <span>{tag}</span>
                <TagRemoveButton
                  data-testid={`tag-remove-${index}`}
                  type="button"
                  onClick={() => removeTag(tag)}
                >
                  ×
                </TagRemoveButton>
              </TagItem>
            ))}
          </TagList>
        </FormGroup> */}

        <FormGroup>
          <Label>
            {META_DATA.introduction.required && <span>*</span>}자기소개
          </Label>
          <TextArea
            name="introduction"
            data-testid="introduction-input"
            hasError={isValid(errors.introduction)}
            value={formData.introduction}
            onChange={handleChange}
          />
          {errors.introduction && (
            <ErrorMessage data-testid="introduction-error">
              {errors.introduction}
            </ErrorMessage>
          )}
        </FormGroup>

        <SubmitButton
          type="submit"
          data-testid="submit-button"
          disabled={!isFormValid}
        >
          가입하기
        </SubmitButton>
      </form>
    </Container>
  );
}
