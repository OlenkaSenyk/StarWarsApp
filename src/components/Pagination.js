export const Pagination = ({ page, changePage, isPrevDisabled, isNextDisabled }) => (
    <div className="flex gap-4">
        <button
            className={`w-32 p-3 rounded-lg border-2 border-solid
            ${isPrevDisabled ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed' : 
                'bg-white border-gray-500 hover:bg-blue-50'}`}
            onClick={() => changePage(page - 1)}
            disabled={isPrevDisabled}
        >
            Previous
        </button>
        <button
            className={`w-32 p-3 rounded-lg border-2 border-solid
            ${isNextDisabled ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed' : 
                'bg-white border-gray-500 hover:bg-blue-50'}`}
            onClick={() => changePage(page + 1)}
            disabled={isNextDisabled}
        >
            Next
        </button>
    </div>
);
