import React, { useState, useEffect, useMemo, Fragment } from "react";
import { SearchComponent } from "../components";
import useFetch from "../utils/hooks/useFetch";
import { ArrowDownIcon, ArrowUpIcon } from "../utils/svg/svg";
import { SortType } from "../utils/types/shared.types";
import { GhibliFilm } from "../utils/types/ghibli.types";

export const TableComponent = () => {
  /**
   * Hooks
   */

  const ghibliUrl: string = "https://ghibliapi.vercel.app/films"

  const [search, setSearch] = useState<string>("");
  const [data, fetchData, loading] = useFetch<GhibliFilm[]>(
    ghibliUrl
  );
  const [propertyName, setPropertyName] = useState<string>("");
  const [sortType, setSortType] = useState<SortType | null>(null);

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  const pureData = useMemo(() => {
    let nativeData: GhibliFilm[] = data || [];
    if (!search) {
      nativeData = data || [];
    } else if (data) {
      nativeData = data?.filter(({ title, director, description }) => {
        const searchLowerCase = search.toLowerCase();
        return (
          title.toLowerCase().search(searchLowerCase) !== -1 ||
          description.toLowerCase().search(searchLowerCase) !== -1 ||
          director.toLowerCase().search(searchLowerCase) !== -1
        );
      });
    }

    if (propertyName && sortType) {
      return [...nativeData].sort((a, b) => {
        const aValue = (a as any)[propertyName];
        const bValue = (b as any)[propertyName];

        if (sortType === SortType.ASC) {
          if (["release_date", "rt_score"].includes(propertyName)) {
            return Number(aValue) - Number(bValue);
          }
          return aValue.localeCompare(bValue);
        }

        if (["release_date", "rt_score"].includes(propertyName)) {
          return Number(bValue) - Number(aValue);
        }
        return bValue.localeCompare(aValue);
      });
    }

    return nativeData;
  }, [search, data, propertyName, sortType]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (value: string) => {
    if (propertyName === value) {
      if (sortType === SortType.ASC) {
        setSortType(SortType.DESC);
        return;
      }

      if (sortType === SortType.DESC) {
        setSortType(null);
        setPropertyName("");
        return;
      }
    }

    setSortType(SortType.ASC);
    setPropertyName(value);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="min-w-full ">
          <SearchComponent onSearch={handleSearch} />
        </div>
        <div className="mt-10" />
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md mt-5">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900 flex"
                  onClick={() => handleSort("title")}
                >
                  Title
                  <button
                    type="button"
                    className="rounded-3xl bg-white border-gray-200 ml-1"
                  >
                    {sortType === "ASC" && (
                      <Fragment>
                        <ArrowDownIcon />
                      </Fragment>
                    )}
                    {sortType === "DESC" && (
                      <Fragment>
                        <ArrowUpIcon />
                      </Fragment>
                    )}
                    {sortType !== "ASC" && sortType !== "DESC" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        Sort
                      </span>
                    )}
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                  onClick={() => handleSort("description")}
                >
                  Description
                  <button
                    type="button"
                    className="rounded-3xl bg-white border-gray-200 ml-1"
                  >
                    {sortType === "ASC" && (
                      <Fragment>
                        <ArrowDownIcon />
                      </Fragment>
                    )}
                    {sortType === "DESC" && (
                      <Fragment>
                        <ArrowUpIcon />
                      </Fragment>
                    )}
                    {sortType !== "ASC" && sortType !== "DESC" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        Sort
                      </span>
                    )}
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                  onClick={() => handleSort("director")}
                >
                  Director
                  <button
                    type="button"
                    className="rounded-3xl bg-white border-gray-200 ml-1"
                  >
                    {sortType === "ASC" && (
                      <Fragment>
                        <ArrowDownIcon />
                      </Fragment>
                    )}
                    {sortType === "DESC" && (
                      <Fragment>
                        <ArrowUpIcon />
                      </Fragment>
                    )}
                    {sortType !== "ASC" && sortType !== "DESC" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        Sort
                      </span>
                    )}
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                  onClick={() => handleSort("release_date")}
                >
                  Release
                  <button
                    type="button"
                    className="rounded-3xl bg-white border-gray-200 ml-1"
                  >
                    {sortType === "ASC" && (
                      <Fragment>
                        <ArrowDownIcon />
                      </Fragment>
                    )}
                    {sortType === "DESC" && (
                      <Fragment>
                        <ArrowUpIcon />
                      </Fragment>
                    )}
                    {sortType !== "ASC" && sortType !== "DESC" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        Sort
                      </span>
                    )}
                  </button>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                  onClick={() => handleSort("rt_score")}
                >
                  Score
                  <button
                    type="button"
                    className="rounded-3xl bg-white border-gray-200 ml-1"
                  >
                    {sortType === "ASC" && (
                      <Fragment>
                        <ArrowDownIcon />
                      </Fragment>
                    )}
                    {sortType === "DESC" && (
                      <Fragment>
                        <ArrowUpIcon />
                      </Fragment>
                    )}
                    {sortType !== "ASC" && sortType !== "DESC" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        Sort
                      </span>
                    )}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {pureData?.map(
                ({
                  id,
                  title,
                  description,
                  director,
                  release_date,
                  rt_score,
                }) => {
                  return (
                    <tr className="hover:bg-gray-50" key={id}>
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          {title}
                        </span>
                      </th>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          {search ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: description.replaceAll(
                                  new RegExp(search, "gmi"),
                                  `<strong class="text-orange">${search}</strong>`
                                ),
                              }}
                            ></span>
                          ) : (
                            description
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          {director}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          {release_date}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                          {rt_score}
                        </span>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
