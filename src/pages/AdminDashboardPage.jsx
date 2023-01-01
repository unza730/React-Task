import React, { useEffect, useState } from "react";
import MkdSDK from "../utils/MkdSDK";
import { AuthContext, logout, tokenExpireError } from "../authContext";
import _ from "lodash";
import { ArrowUpOutlined } from '@ant-design/icons';
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import SortableItem from "./SortableItem";
const AdminDashboardPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100)
  const [videoData, setVideoData] = useState([])
  const [paginatedPosts, setPaginatedPost] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const { dispatch } = React.useContext(AuthContext);
  const logoutfunction = () => {
    localStorage.clear()
    dispatch(logout(dispatch, "logout"))

  }
  const pageSize = 10;
  const pageCount = videoData ? Math.ceil(videoData.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1)
  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedVideo = _(videoData).slice(startIndex).take(pageSize).value();
    setPaginatedPost(paginatedVideo)
  }
  console.log("current", currentPage, pages[pages.length - 1])
  const PreviousPage = (pageNo) => {
    setCurrentPage(pageNo - 1);
    const startIndex = (pageNo - 2) * pageSize;
    const paginatedVideo = _(videoData).slice(startIndex).take(pageSize).value();
    setPaginatedPost(paginatedVideo)
  }
  const NextPage = (pageNo) => {
    setCurrentPage(pageNo + 1);
    const startIndex = (pageNo) * pageSize;
    const paginatedVideo = _(videoData).slice(startIndex).take(pageSize).value();
    setPaginatedPost(paginatedVideo)
  }
  const sdk = new MkdSDK
  useEffect(() => {
    sdk.setTable("video")

    const callApiOfPagination = async () => {
      try {
        let payload = {
          page,
          limit
        }
        let method = "PAGINATE"
        const res = await sdk.callRestAPI(payload, method)
        console.log("***", res)
        setVideoData(res.list)
        setPaginatedPost(_(res.list).slice(0).take(pageSize).value())
      } catch (err) {
        console.log(err)
        }
    }
    callApiOfPagination()
}, [])
  return (
    <>
      
      <header className="text-gray-600 body-font  m-0">
        <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center bg-black-400 justify-between">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-3xl font-bold text-white font-serif">Dashboard</span>
          </a>
          <button className="inline-flex items-center bg-green-500 text-gray-200 font-serif border-0 py-2 px-5 focus:outline-none hover:bg-gray-200  text-base mt-4 md:mt-0 rounded-xl" onClick={logoutfunction}>Logout
          </button>
        </div>
      </header>
     <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <div className="flex justify-between mb-5">
              <h1 className="text-3xl font-thin font-serif text-gray-400">Today's Leaderboard</h1>
              <div className="flex justify-between bg-gray-800 text-gray-400 px-3 py-2 rounded-xl w-80">
                <span>30 May 2022  </span>
                <span>.</span>
                <span className="bg-green-500 px-2 rounded-2xl text-gray-200"> Submission Open </span>
                <span>.</span>
                <span> 11:34</span>
              </div>
            </div>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <section class="text-gray-600 body-font" style={{ width: '100%' }}>
                <div class="container px-5 py-2 mx-auto flex flex-wrap">
                  <div class="flex flex-wrap -m-4" style={{ width: '100%' }}>
                    <div class="p-4 lg:w-full md:w-full">
                      <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                        <p className='text-xl mr-5' style={{ marginTop: '12px' }}>#</p>
                        <div className="flex w-1/2">
                          <span className="m-1">
                             </span> <span className="mt-3 ml-2 " style={{ width: '100%' }}>Title</span>
                        </div>
                        <div class="flex justify-around " style={{ width: '50%' }}>
                          <p style={{ marginTop: '10px' }}>Author</p>
                          <div className='flex ' >
                            <p style={{ marginTop: '10px' }}>Most Liked</p>
                            <span style={{ marginTop: '6px' }}> <ArrowUpOutlined style={{ fontSize: '15px', color: 'green' }} /></span>
                          </div>
                         </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>
              <SortableContext
                items={videoData}
                strategy={verticalListSortingStrategy}
              >
                {paginatedPosts && paginatedPosts.map((video) => {
                  return (
                    // <Table columns={columns} dataSource={data} />
                    <SortableItem video={video} key={video.id} id={video.id} />
                  )
                })}
              </SortableContext>
            </DndContext>
            <nav aria-label="Page navigation example" style={{ textAlign: 'end', marginTop: '10px' }}>
              <ul class="inline-flex items-center -space-x-px">
                <li >
                  <button type="button" className={currentPage === 1 ? "cursor-no-drop block px-3 py-2 ml-0 leading-tight text-gray-500 border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white " : "block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white "} disabled={currentPage === 1} onClick={() => PreviousPage(currentPage)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                  </button>
                </li>
                {pages && pages.map((page) => {
                  
                  return (
                    <>
                      <li className={
                        page === currentPage ? "active bg-slate-800" : ""
                      }>
                        <button className={page === currentPage ? 'active bg-green-500 px-3 py-2  leading-tight text-gray-300  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700  dark:hover:text-white' : " px-3 py-2  leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700  dark:hover:text-white"} onClick={() => pagination(page)}>{page}</button>
                      </li>
                    </>
                  )
                }
                )}
                <li>
                  <button class={currentPage === pages[pages.length - 1] ? "cursor-no-drop block px-3 py-2 leading-tight text-gray-500  border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" : "block px-3 py-2 leading-tight text-gray-500 border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"} disabled={currentPage === pages[pages.length - 1]} onClick={() => NextPage(currentPage)}>
                    <span class="sr-only">Next</span>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setPaginatedPost((items) => {
        console.log("drag items", items)
        const activeIndex = items.filter((item) => item.id === active.id && (
          item.id
        ));
        const activeeIndex = activeIndex.map((item) => item.id)
        const overIndex = items.filter((item) => item.id === over.id)
        const overeIndex = overIndex.map((item) => item.id)
        const arraymove = arrayMove(items, activeeIndex - 1, overeIndex - 1)
        return arraymove
      })
    }
  }
};

export default AdminDashboardPage;
