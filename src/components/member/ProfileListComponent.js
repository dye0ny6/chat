import React from "react";
import { API_SERVER_HOST } from "../../api/MemberApi";
import CountryList from "react-select-country-list";

const host = API_SERVER_HOST;

const languageList = [
  { value: "KO", label: "한국어" },
  { value: "EN", label: "영어" },
  { value: "JA", label: "일본어" },
  { value: "ZH", label: "중국어" },
  { value: "RU", label: "러시아어" },
  { value: "UK", label: "우크라이나어" },
  { value: "ID", label: "인도네시아어" },
  { value: "TR", label: "튀르키예어" },
  { value: "DE", label: "독일어" },
  { value: "FR", label: "프랑스어" },
];

export default function ProfileListComponent({ member }) {
  const countryOptions = CountryList().getData();

  const getCountryLabel = (countryCode) => {
    const country = countryOptions.find((c) => c.value === countryCode);
    return country ? country.label : "Unknown Country";
  };

const getLanguageLabels = (languageList, languageArray) => {
  if (!languageArray || languageArray.length === 0) return "";

  const labels = languageArray.map((code) => {
    const language = languageList.find((item) => item.value === code);
    return language ? language.label : "";
  });

  return labels.filter((label) => label !== "").join(", ");
};

// 
// TODO 멤버 프로필 조회 클릭이벤트

  return (
    <div className="relative mt-8">
      <div className="relative -mb-6 w-full overflow-x-auto pb-6">
        <ul
          role="list"
          className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
        >
          {member.list.map((member) => (
            <li
              key={member.id}
              className="inline-flex w-64 flex-col text-center lg:w-auto"
            >
              <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                  <img
                    src={`${host}/api/member/view/th_${member.uploadedFileNames[0]}`}
                    alt={member.nickname}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-6">
                  <p className="text-sm text-gray-500">
                    {getCountryLabel(member.nationality)}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-gray-900">
                    <a href={member.href}>
                      <span className="absolute inset-0" />
                      {member.nickname}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {getLanguageLabels(languageList, member.languageList)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
