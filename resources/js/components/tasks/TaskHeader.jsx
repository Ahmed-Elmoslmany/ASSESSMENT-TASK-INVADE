import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const TaskHeader = ({amount, links, status, handleStatusChange, handelPreviousPage, handelNextPage}) => {
    return (
        <>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">{amount}</h1>
            <div>
                <label htmlFor="statusFilter" className="mr-2 font-semibold">Filter by Status:</label>
                <select className="px-4 py-2 border border-gray-300 rounded-md" id="statusFilter" value={status} onChange={handleStatusChange}>
                    <option value="">No Filter</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div className="flex justify-between items-center">

                {links.prev ? (
                    <button
                        onClick={handelPreviousPage}
                        className="flex justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors transform hover:scale-105 mb-6 font-semibold"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2 mt-0.5" />
                        Previous
                    </button>
                ) : (
                    <div className="w-[100px]"></div>
                )}

                {links.next ? (
                    <button
                        onClick={handelNextPage}
                        className="flex justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors transform hover:scale-105 mb-6 font-semibold"
                    >
                        Next
                        <ArrowRightIcon className="h-5 w-5 ml-2 mt-0.5" />
                    </button>
                ) : (
                    <div className="w-[100px]"></div>
                )}
            </div>
        </>
    )
}

export default TaskHeader