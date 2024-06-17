import BasicLayout from "../../layouts/BasicLayout";
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { memberSubmit, checkEmail, checkNickname } from "../../api/MemberApi";
import Select from "react-select";
import countryList from "react-select-country-list";
import { PhotoIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const initState = {
  email: "",
  password: "",
  passwordConfirm: "",
  phone: "",
  nickname: "",
  birth: "",
  gender: "",
  profileImage: null,
  nationality: "",
  languageList: [],
};

const SignupPage = () => {
  const [member, setMember] = useState({ ...initState });

  const uploadRef = useRef(); // 프로필 이미지
  const [value, setValue] = useState(""); // 국적 셀렉터
  const options = useMemo(() => countryList().getData(), []);
  const [checkedValues, setCheckedValues] = useState([]); // 사용 언어 체크박스

  // 비밀번호 유효성체크
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  // 비밀번호 확인
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // 전화번호
  const [inputValue, setInputValue] = useState("");

  // 이메일 중복 검사
  const handleClickEmail = async (e) => {
    e.preventDefault();
    console.log("***** SignupPage handleClickEmail");
    console.log("***** SignupPage handleClickEmail - email : ", member.email);

    try {
      const response = await checkEmail(member.email);
      if (response) {
        alert("이미 사용 중인 이메일입니다.");
        // TODO 사용 불가 처리
      } else {
        alert("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      console.error("***** SignupPage handleClickEmail - error : ", error);
    }
  };

  // 비밀번호 유효성체크
  const onChangePassword = useCallback((e) => {
    const { name, value } = e.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("영문자, 숫자를 포함해 8글자 이상 입력해주세요.");
      setIsPassword(false);
      // TODO 사용 불가 처리
    } else {
      setPasswordMessage("사용 가능한 비밀번호입니다.");
      setIsPassword(true);
    }
  }, []);
  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const { name, value } = e.target;
      setMember((prevMember) => ({
        ...prevMember,
        [name]: value,
      }));

      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호가 일치합니다.");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
        setIsPasswordConfirm(false);
        // TODO 사용 불가 처리
      }
    },
    [password]
  );

  // 닉네임 중복 검사
  const handleClickNickname = async (e) => {
    e.preventDefault();
    console.log("***** SignupPage handleClickNickname");
    console.log(
      "***** SignupPage handleClickNickname - nickname : ",
      member.nickname
    );

    try {
      const response = await checkNickname(member.nickname);
      if (response) {
        alert("이미 사용 중인 닉네임입니다.");
        // TODO 사용 불가 처리
      } else {
        alert("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.error("***** SignupPage handleClickNickname - error : ", error);
    }
  };

  // 전화번호 정규식
  useEffect(() => {
    if (member.phone) {
      setInputValue(formatPhoneNumber(member.phone));
    } else {
      setInputValue("");
    }
  }, [member.phone]);
  const formatPhoneNumber = (phone) => {
    if (phone.length === 10) {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    } else if (phone.length === 13) {
      return phone
        .replace(/-/g, "")
        .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }
    return phone;
  };
  const OnChangePhone = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(e.target.value)) {
      setInputValue(e.target.value);
      setMember({ ...member, phone: e.target.value });
    }
  };

  const handleChangeMember = (e) => {
    const { name, value } = e.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  // 회원가입 요청
  const handleClickSubmit = async (e) => {
    e.preventDefault();
    console.log("***** SignupPage - handleClickSubmit");

    try {
      const formData = new FormData();
      if (uploadRef.current && uploadRef.current.files.length > 0) {
        for (let i = 0; i < uploadRef.current.files.length; i++) {
          formData.append("files", uploadRef.current.files[i]);
        }
      }

      const checkedValues = [];
      const checkboxes = document.querySelectorAll(
        'input[name="languageList"]:checked'
      );
      checkboxes.forEach((checkbox) => {
        formData.append("languageList", checkbox.value);
      });

      formData.append("email", member.email);
      formData.append("password", member.password);
      formData.append("phone", member.phone);
      // formData.append("authNumber", member.authNumber);
      formData.append("nickname", member.nickname);
      formData.append("birth", member.birth);
      formData.append("gender", member.gender);
      formData.append("nationality", value);

      console.log("***** SignupPage handleClickSubmit - formData : ", formData);

      const response = await memberSubmit(formData);

      console.log(
        "***** SignupPage handleClickSubmit - response(member_id) : ",
        response
      );
      alert(`환영합니다, ${member.nickname}님`);
      window.location.href = "/";
    } catch (error) {
      console.log("***** SignupPage handleClickSubmit - error : ", error);
      console.error(error);
      alert("회원가입에 실패했습니다. 재시도 또는 관리자에게 문의해주세요.");
      window.location.href = "/signup";
    }
  };

  // 국적 셀렉터
  const changeHandler = (selectedOption) => {
    setValue(selectedOption.value);
  };

  // 사용 언어 체크박스
  const handleChangeCheckbox = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedValues([...checkedValues, value]); // 선택값 추가
    } else {
      setCheckedValues(checkedValues.filter((item) => item !== value)); // 선택값 제거
    }
  };

  return (
    <BasicLayout>
      {/* TODO required 처리 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <form>
            <div className="space-y-12">
              <div className="pl-48 border-b border-gray-900/10 py-12">
                <h2 className="text-xl font-bold leading-7 text-indigo-900">
                  회원가입
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {/* 이메일 */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      이메일
                    </label>
                    <div className="mt-2 flex space-x-2">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={member.email}
                        onChange={handleChangeMember}
                        placeholder="you@example.com"
                        className="flex-1 block border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleClickEmail}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span>중복확인</span>
                      </button>
                    </div>
                  </div>
                  {/* 비밀번호 */}
                  <div className="sm:col-span-4">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        비밀번호
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={member.password}
                        onChange={onChangePassword}
                        className="block w-full border-gray-300 rounded-md shadow-sm py-1.5 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {password.length > 0 && (
                        <span
                          className={`message ${
                            isPassword ? "success" : "error"
                          }`}
                        >
                          <p className="mt-2 text-sm font-semibold text-gray-500">
                            {passwordMessage}
                          </p>
                        </span>
                      )}
                    </div>
                    {/* 비밀번호 재입력 */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="passwordConfirm"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          비밀번호 재입력
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          type="password"
                          name="passwordConfirm"
                          id="passwordConfirm"
                          value={member.passwordConfirm}
                          onChange={onChangePasswordConfirm}
                          className="block w-full border-gray-300 rounded-md shadow-sm py-1.5 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {passwordConfirm.length > 0 &&
                          member.passwordConfirm && (
                            <span
                              className={`message ${
                                isPasswordConfirm ? "success" : "error"
                              }`}
                            >
                              <p className="mt-2 text-sm font-semibold text-gray-500">
                                {passwordConfirmMessage}
                              </p>
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                  {/* 전화번호 */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      전화번호
                    </label>
                    <div className="mt-2 flex space-x-2">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={inputValue}
                        onChange={OnChangePhone}
                        placeholder="010-1234-5678"
                        className="flex-1 block border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span>인증번호 발송</span>
                      </button>
                    </div>
                    {/* 인증번호 확인 */}
                    {/* TODO 전화번호 인증 API */}
                    {/* <div className="mt-2 flex space-x-2">
                      <input
                        type="number"
                        name="authNumber"
                        id="authNumber"
                        placeholder="인증번호 입력"
                        className="flex-1 block border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        확인
                      </button>
                    </div> */}
                  </div>
                  {/* 닉네임 */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="nickname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      닉네임
                    </label>
                    <div className="mt-2 flex space-x-2">
                      <input
                        type="text"
                        name="nickname"
                        id="nickname"
                        value={member.nickname}
                        onChange={handleChangeMember}
                        className="flex-1 block border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleClickNickname}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span>중복확인</span>
                      </button>
                    </div>
                  </div>
                  {/* 생년월일 */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="birth"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      생년월일
                    </label>
                    <div className="mt-2 flex space-x-2">
                      <input
                        type="date"
                        name="birth"
                        id="birth"
                        value={member.birth}
                        onChange={handleChangeMember}
                        className="flex-1 block border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  {/* 성별 */}
                  <div className="sm:col-span-4">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        성별
                      </legend>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            type="radio"
                            name="gender"
                            id="male"
                            value="MALE"
                            onChange={handleChangeMember}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="male"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            남
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            type="radio"
                            name="gender"
                            id="female"
                            value="FEMALE"
                            onChange={handleChangeMember}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="female"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            여
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  {/* 프로필 사진 */}
                  <div className="sm:col-span-4">
                    {/* <div className="col-span-full"> */}
                    <label
                      htmlFor="profileImage"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      프로필 사진
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="profileImage"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>사진 선택 </span>
                            <input
                              type="file"
                              id="profileImage"
                              ref={uploadRef}
                              multiple={true}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">또는 끌어다놓기</p>
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                  {/* 국적 */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="nationality"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      국적
                    </label>
                    <div className="mt-2">
                      <div>
                        <Select
                          className="block w-full border-gray-300 rounded-md shadow-sm py-1.5 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          name="nationality"
                          id="nationality"
                          placeholder="입력"
                          options={options}
                          value={options.find(
                            (option) => option.value === value
                          )} // 선택된 값 설정
                          onChange={changeHandler}
                        />
                      </div>
                    </div>
                  </div>
                  {/* 사용 언어 */}
                  <div className="sm:col-span-4">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        사용 언어
                      </legend>
                      <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="KO"
                              name="languageList"
                              type="checkbox"
                              value="KO"
                              onChange={handleChangeCheckbox}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="ko"
                              className="font-medium text-gray-900"
                            >
                              한국어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="EN"
                              name="languageList"
                              type="checkbox"
                              value="EN"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="EN"
                              className="font-medium text-gray-900"
                            >
                              영어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="JA"
                              name="languageList"
                              type="checkbox"
                              value="JA"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="JA"
                              className="font-medium text-gray-900"
                            >
                              일본어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="ZH"
                              name="languageList"
                              type="checkbox"
                              value="ZH"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="ZH"
                              className="font-medium text-gray-900"
                            >
                              중국어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="RU"
                              name="languageList"
                              type="checkbox"
                              value="RU"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="RU"
                              className="font-medium text-gray-900"
                            >
                              러시아어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="UK"
                              name="languageList"
                              type="checkbox"
                              value="UK"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="UK"
                              className="font-medium text-gray-900"
                            >
                              우크라이나어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="ID"
                              name="languageList"
                              type="checkbox"
                              value="ID"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="ID"
                              className="font-medium text-gray-900"
                            >
                              인도네시아어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="TR"
                              name="languageList"
                              type="checkbox"
                              value="TR"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="TR"
                              className="font-medium text-gray-900"
                            >
                              튀르키예어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="DE"
                              name="languageList"
                              type="checkbox"
                              value="DE"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="DE"
                              className="font-medium text-gray-900"
                            >
                              독일어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="FR"
                              name="languageList"
                              type="checkbox"
                              value="FR"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="FR"
                              className="font-medium text-gray-900"
                            >
                              프랑스어
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                취소
              </button>
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focusvisible:outline-indigo-600"
                onClick={handleClickSubmit}
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </BasicLayout>
  );
};

export default SignupPage;
