import {FC, useState} from "react";
import SearchBar from "../../../components/SearchBar";
import {useSearchParams} from "react-router-dom";
import SelectBox from "../../../components/SelectBox";
import {MdQuestionAnswer} from "react-icons/md";
import {FaMessage} from "react-icons/fa6";
import {FaCheck, FaTrashAlt} from "react-icons/fa";
import {IoCloseSharp} from "react-icons/io5";

const notifications = [
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
    "Alex Morgan sent comment for ASUS TUF F15",
]
type SortCommentType = "Default" | "Sort by newest" | "Sort by oldest" | "Sort by read" | "Sort by unread"
const sortItems: SortCommentType[] = ["Sort by newest", "Sort by oldest", "Sort by read", "Sort by unread"]

type FilterCommentType =
    "All"
    | "Filter by main comments"
    | "Filter by answer comments"
    | "Filter by approved comments"
    | "Filter by unapproved comments"
const filterItems: FilterCommentType[] = ["Filter by main comments", "Filter by answer comments", "Filter by approved comments", "Filter by unapproved comments"]

const Comments: FC = () => {
    const [query, setQuery] = useSearchParams()

    // Search, Sort, Filter States :
    const [inputSearch, setInputSearch] = useState("")
    const [filterComment, setFilterComment] = useState<FilterCommentType>("All")
    const [sortComment, setSortComment] = useState<SortCommentType>("Default")

    const searchHandler = () => {

    }

    return (
        <div className="w-full px-[1.5px] sm:px-3 rounded-md bg-white dark:bg-zinc-700 py-5 dark:text-white">
            <h3 className="font-bold text-2xl text-center mb-6">Comments Management</h3>

            <div className="comments-management">
                <SearchBar inputSearch={inputSearch} setInputSearch={setInputSearch} search={searchHandler}
                           query={query}
                           setQuery={setQuery} notifications={notifications}/>
                <div className="comments-sort-filter flex items-center justify-center gap-5 flex-wrap">
                    <SelectBox items={filterItems} defaultItem={filterComment} setDefaultItem={setFilterComment}
                               placeholder="filter comments"/>
                    <SelectBox items={sortItems} defaultItem={sortComment} setDefaultItem={setSortComment}
                               placeholder="sort comments"/>
                </div>
            </div>

            <div className="comments">
                <div className="comment">
                    <div className="comment-number">{(99_999).toLocaleString()}</div>
                    <div className="comment-title">Thanks a lot</div>
                    <div className="comment-status">Unapproved</div>
                    <div className="comment-creator">Tyler Rake</div>
                    <div className="comment-sentTime">12-12-2025 08:36 AM</div>
                    <div className="comment-buttons flex items-center justify-center gap-2">
                        <FaTrashAlt className="w-6 h-6"/>
                        <FaCheck className="w-6 h-6"/>
                        <IoCloseSharp className="w-6 h-6"/>
                        <FaMessage className="w-6 h-6"/>
                        <MdQuestionAnswer className="w-6 h-6"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments