/* eslint-disable react/prop-types */
import { Table, Pagination } from "flowbite-react";
import { useState } from "react";
import Lottie from "lottie-react";
import Loading from "../assets/loading.json";
import SearchBar from "./SearchBar";
import NoDataUi from "./NoDataUi";

import PerPageDropdown from "./PerPageDropdown";

import DropdownForTable from "./DropdownForTable";
import { useNavigate } from "react-router-dom";

const TableWithData = ({
  rows,
  columns,
  fetchData,
  dataForPagination,
  handleAction,
  dataForRowDetail = false,
  dataForDropdown = false,
  pendingFilter = false,
  userTypeFilter = false,
  perPageDropdownItems,
}) => {
  const navigate = useNavigate();

  const handleSearch = (searchText, searchId) => {
    handleAction.onSearch(searchText, searchId);
  };

  const handleReset = () => {
    handleAction.onReset();
  };

  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => {
    setCurrentPage(page);
    handleAction.onPageChange(page);
  };

  const handlePerPageChange = (perPage) => {
    handleAction.onPaginateChange(perPage);
  };

  return (
    <div className="my-6 ">
      {fetchData && (
        <>
          <div className="flex justify-between items-center my-5">
            <SearchBar handleSearch={handleSearch} handleReset={handleReset} />
          </div>
          <div className=" overflow-x-auto  mb-5">
            <div className="min-w-max flex items-center w-full  gap-3 ">
              {dataForDropdown && (
                <DropdownForTable
                  defaultValue={dataForDropdown.defaultValue}
                  handleOnClickDropdownItem={handleAction.onClickDropdownItem}
                  dropdownItems={dataForDropdown.dropdownItems}
                />
              )}

              {pendingFilter && location.pathname.search("yawgi") && (
                <DropdownForTable
                  defaultValue={pendingFilter.defaultValue}
                  handleOnClickDropdownItem={pendingFilter.onSelect}
                  dropdownItems={pendingFilter.dropdownItems}
                />
              )}

              {perPageDropdownItems && (
                <PerPageDropdown
                  className=""
                  defaultValue={perPageDropdownItems[0]}
                  handleOnClickDropdownItem={(item) =>
                    handlePerPageChange(item.value)
                  }
                  dropdownItems={perPageDropdownItems}
                />
              )}

              {userTypeFilter && location.pathname.search("yawgi") && (
                <DropdownForTable
                  defaultValue={userTypeFilter.defaultValue}
                  handleOnClickDropdownItem={userTypeFilter.onSelect}
                  dropdownItems={userTypeFilter.dropdownItems}
                />
              )}
            </div>
          </div>
          {rows?.length > 0 && (
            <div className="overflow-x-auto">
              {" "}
              <Table hoverable>
                <Table.Head>
                  {columns?.map((item, i) => {
                    return (
                      <Table.HeadCell key={i}>
                        <span className="">{item}</span>
                      </Table.HeadCell>
                    );
                  })}
                </Table.Head>
                <Table.Body className="divide-y text-md text-black">
                  {rows?.map((row, i) => {
                    return (
                      <Table.Row
                        key={i}
                        onClick={() => {
                          //wth edited 29/02/2024 for yawgi pages conditional routing
                          if (
                            // (location.pathname == "/yawgi" ||
                            //   location.pathname == "/") &&
                            location.pathname == "/" &&
                            window.location.pathname !== "/yawgi/deleted/all"
                          ) {
                            let approveIndex = location.pathname == "/yawgi" ? 6 : 5;
                            if (row.list[approveIndex] == "ခွင့်ပြုပြီး") {
                              navigate(`/yawgi/${row.id}`);
                            } else {
                              navigate(`/event/${row.event}/yawgi/approve/${row.id}`);
                            }
                          } else {
                            navigate(
                              `${dataForRowDetail?.parentLink}/${row.id}`
                            );
                          }
                        }}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                      >
                        {Array.isArray(row?.list) &&
                          row?.list?.map((item, i) => {
                            if (item?.type === "img") {
                              return (
                                <Table.Cell key={i}>
                                  <img
                                    className="w-14 h-14 rounded-md"
                                    src={item.link}
                                    alt="image of yawgi"
                                  />
                                </Table.Cell>
                              );
                            } else if (typeof item === "string") {
                              return (
                                <Table.Cell
                                  key={i}
                                  className=" font-medium text-gray-900 dark:text-white"
                                >
                                  {item?.length > 20
                                    ? `${item.slice(0, 90)}...`
                                    : item}
                                </Table.Cell>
                              );
                            } else if (item?.type === "id") {
                              return;
                            } else if (!item) {
                              return;
                            } else if (
                              typeof item === "object" &&
                              item.icon &&
                              item.action
                            ) {
                              return (
                                <Table.Cell key={i}>
                                  <div
                                    className="px-4 py-2 bg-green-500 text-center flex justify-center items-center rounded-lg text-white text-lg hover:scale-105 transition-all"
                                    onClick={item?.action}
                                  >
                                    {item?.icon}
                                  </div>
                                </Table.Cell>
                              );
                            } else {
                              return (
                                <Table.Cell
                                  key={i}
                                  className=" font-medium text-gray-900 dark:text-white"
                                >
                                  {item}
                                </Table.Cell>
                              );
                            }
                          })}
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
          )}
          {!fetchData.isPending && dataForPagination.total > 1 && (
            <div className="flex overflow-x-auto sm:justify-center my-3">
              <Pagination
                nextLabel=">"
                previousLabel="<"
                currentPage={currentPage}
                totalPages={dataForPagination.total}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}{" "}
      {fetchData?.isLoading || fetchData?.isPending ? (
        <div className="w-full flex-col items-center flex justify-center ">
          <Lottie className="w-[100px] my-0" animationData={Loading} />
          <p className="mt-[-10px] text-black ">ခေတ္တစောင့်ဆိုင်းပေးပါ</p>
        </div>
      ) : (
        (fetchData?.error || rows.length?.length <= 0) && (
          <NoDataUi message={"အချက်အလက်များမရှိပါ။"} />
        )
      )}
    </div>
  );
};

export default TableWithData;
