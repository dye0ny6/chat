import BasicLayout from "../../layouts/BasicLayout";
import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SignupPage = () => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <BasicLayout>
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
                        placeholder="you@example.com"
                        className="flex-1 block border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        중복확인
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
                      <p
                        className="mt-2 text-sm font-semibold text-gray-500"
                        id="email-description"
                      >
                        영문자, 숫자를 포함해 8글자 이상 입력
                      </p>
                    </div>
                    <div className="mt-2">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="block w-full border-gray-300 rounded-md shadow-sm py-1.5 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="passwordCheck"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          비밀번호 재입력
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          type="password"
                          name="passwordCheck"
                          id="passwordCheck"
                          className="block w-full border-gray-300 rounded-md shadow-sm py-1.5 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          aria-describedby="password-error"
                        />
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
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="010-1234-5678"
                        className="flex-1 block border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        인증번호 발송
                      </button>
                    </div>
                    <div className="mt-2 flex space-x-2">
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
                            name="male"
                            id="male"
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
                            name="female"
                            id="female"
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
                            htmlFor="fileUpload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>사진 선택 </span>
                            <input
                              id="fileUpload"
                              name="fileUpload"
                              type="file"
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
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      국적
                    </label>
                    <div className="mt-2">
                      <div>
                        <Select
                          className="block w-full border-gray-300 rounded-md shadow-sm py-1.5 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="입력"
                          options={options}
                          value={value}
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
                              id="korean"
                              name="korean"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 textindigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="korean"
                              className="font-medium textgray-900"
                            >
                              한국어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="english"
                              name="english"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="english"
                              className="font-medium text-gray-900"
                            >
                              영어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="japanese"
                              name="japanese"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="japanese"
                              className="font-medium text-gray-900"
                            >
                              일본어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="chinese"
                              name="chinese"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="chinese"
                              className="font-medium text-gray-900"
                            >
                              중국어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="russian"
                              name="russian"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="russian"
                              className="font-medium text-gray-900"
                            >
                              러시아어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="ukrainian"
                              name="ukrainian"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="ukrainian"
                              className="font-medium text-gray-900"
                            >
                              우크라이나어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="indonesian"
                              name="indonesian"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="indonesian"
                              className="font-medium text-gray-900"
                            >
                              인도네시아어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="turkish"
                              name="turkish"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="turkish"
                              className="font-medium text-gray-900"
                            >
                              튀르키예어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="german"
                              name="german"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="german"
                              className="font-medium text-gray-900"
                            >
                              독일어
                            </label>
                          </div>
                        </div>
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="french"
                              name="french"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text indigo-600 focus:ring-indigo-600"
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label
                              htmlFor="french"
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
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focusvisible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </BasicLayout>
  );
};

export default SignupPage;
