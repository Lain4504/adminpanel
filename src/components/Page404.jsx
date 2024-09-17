import React from "react";
import { Link } from "react-router-dom";
const Page404 = () => {
    return (
      <>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-4xl font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Không tìm thấy trang</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm..</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to='/'
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
              <span aria-hidden="true">&larr;</span> Quay lại trang chủ 
              </Link>
             
            </div>
          </div>
        </main>
      </>
    )
  }
export default Page404