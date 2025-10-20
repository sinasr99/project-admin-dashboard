import {FC, useEffect, useState} from "react"
import AccessPanel from "../../components/AccessPanel"
import {Outlet, useLocation} from "react-router-dom"
import Cookies from "js-cookie"
import ChartWrapper, {chartDataType} from "../../components/ChartWrapper"
import getLastWeeks from "../../helperFunctions/getLastWeek"
import {IoLogOut} from "react-icons/io5";

const Dashboard: FC = () => {
    const isDashboardPath = useLocation().pathname === "/dashboard"
    const [isShowUsers, setIsShowUsers] = useState<boolean>(false)
    const [isShowTickets, setIsShowTickets] = useState<boolean>(false)
    const users = [
        {
            id: 1,
            name: "Sina Saber",
            phone: "09056408490",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$",
            bought: 280
        },
        {
            id: 2,
            name: "Alex Morgan",
            phone: "09172086598",
            email: "alex_morgan_2020@gmail.com",
            password: "Aa2020@#$",
            bought: 4_800
        },
        {
            id: 3,
            name: "Tyler Rake",
            phone: "09056408921",
            email: "tyler_rake_2000@gmail.com",
            password: "Tt2000@#$",
            bought: 120
        },
        {
            id: 4,
            name: "Brad Pitt",
            phone: "09179056492",
            email: "brad_pitt_1986@gmail.com",
            password: "Bt1986@#$",
            bought: 7_890
        },
        {
            id: 5,
            name: "Sina Saber",
            phone: "09056408490",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$",
            bought: 280
        },
        {
            id: 6,
            name: "Sina Saber",
            phone: "09056408490",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$",
            bought: 280
        },
        {
            id: 7,
            name: "Sina Saber",
            phone: "09056408490",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$",
            bought: 280
        },
        {
            id: 8,
            name: "Sina Saber",
            phone: "09056408490",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$",
            bought: 280
        },
        {
            id: 9,
            name: "Sina Saber",
            phone: "09056408490",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$",
            bought: 280
        },
        {
            id: 10,
            name: "Sina Saber",
            phone: "09056408490",
            email: "sina.sr.21.09.1383@gmail.com",
            password: "Ss1383@#$",
            bought: 280
        }
    ]
    const tickets = [
        {
            title: "How to buy your product 0 0 0 0 0 0 0 0 0 0 0 0 0 00 0 0  0 0 0 0  0 0 00 0 ",
            name: "Alex Morgan",
            description: "Hi this product is real? how can I buy it? I really want to buy it."
        },
        {
            title: "How to buy your product",
            name: "Alex Morgan",
            description: "Hi this product is real? how can I buy it? I really want to buy it."
        },
        {
            title: "How to buy your product",
            name: "Alex Morgan",
            description: "Hi this product is real? how can I buy it? I really want to buy it."
        },
        {
            title: "How to buy your product",
            name: "Alex Morgan",
            description: "Hi this product is real? how can I buy it? I really want to buy it."
        },
        {
            title: "How to buy your product",
            name: "Alex Morgan",
            description: "Hi this product is real? how can I buy it? I really want to buy it."
        },
        {
            title: "How to buy your product",
            name: "Alex Morgan",
            description: "Hi this product is real? how can I buy it? I really want to buy it."
        },
        {
            title: "How to buy your product",
            name: "Alex Morgan",
            description: "Hi this product is real? how can I buy it? I really want to buy it."
        },
        {
            title: "How to buy your product",
            name: "Alex Morgan",
            description: "Hi this product is real? how can I buy it? I really want to buy it."
        },
        {
            title: "How to buy your product",
            name: "Alex Morgan",
            description: "Hi this product is real? how can I buy it? I really want to buy it."
        },
        {
            title: "How to buy your product",
            name: "Alex Morgan",
            description: "Hi this product is real? how can I buy it? I really want to buy it."
        }
    ]
    const sellData: chartDataType = getLastWeeks().map(item => {
        return {key: `${item.day}${item.date}`, value: (Math.floor(Math.random() * 100) + 1)}
    })

    const registeredUsers: chartDataType = getLastWeeks().map(item => {
        return {key: `${item.day}${item.date}`, value: (Math.floor(Math.random() * 10) + 1)}
    })

    useEffect(() => {
        localStorage.removeItem("otp-level")
        localStorage.removeItem("auth-level")
        Cookies.remove("code-timer")
        Cookies.remove("email-time")
        Cookies.remove("phone-time")

        setTimeout(() => {
            setIsShowUsers(true)
            setIsShowTickets(true)
        }, 1500)
    }, [])

    return (
        <>
            <AccessPanel/>

            <div className="container pt-5 pb-[60px]">
                {
                    isDashboardPath ?
                        <>
                            <h5 className="font-bold flex items-center gap-6 justify-between text-base sm:text-xl text-shadow bg-white dark:bg-zinc-700 dark:text-white w-fit py-4 px-[7px] sm:p-5  rounded-md mx-auto mb-8">Welcome
                                to your dashboard Sina Saber ✌️
                                <span className="relative group">
                                    <IoLogOut className="w-7 h-7 cursor-pointer"/>
                                        <span className="absolute invisible opacity-0 group-hover:visible z-20 group-hover:opacity-100 transition-all ease-in-out duration-150 top-full right-5 text-sm font-medium w-16 h-9 flex items-center justify-center rounded-full bg-white dark:bg-zinc-700 dark:text-white">Log out</span>
                                </span>
                            </h5>
                            <ChartWrapper tooltipKey="Sell" afterValue="$" data={sellData}
                                          title="Last week's sales chart"/>
                            <ChartWrapper tooltipKey="Users" data={registeredUsers}
                                          title="Chart of registered users last week"/>

                            <div
                                className="10-last-items-wrapper rounded-md mx-auto pt-5 pr-1 max-w-[1000px] bg-white dark:bg-zinc-700 dark:text-white mb-8">
                                <h5 className="text-shadow font-bold text-xl text-center">Last 10 registered users</h5>

                                <div className="custom-scroll overflow-y-auto max-h-[500px] pb-4">
                                    <div className="user-wrapper px-3 flex flex-col gap-5 pt-5">
                                        {
                                            isShowUsers ?
                                                users.length ?
                                                users.map(user => (
                                                    <div
                                                        key={user.id}
                                                        className="user-item max-w-[900px] mx-auto grid items-center justify-items-center gap-y-4 md:px-1.5 p-3 grid-cols-[80px_175px] from-400:grid-cols-[80px_230px] from-500:grid-cols-[80px_300px] md:grid-cols-[25px_50px_100px_100px_100px_100px_100px] lg:grid-cols-[25px_50px_100px_300px_100px_150px_120px] md:gap-3 bg-white box-shadow-small dark:bg-zinc-700 rounded-md md:rounded-full">
                                                        <span
                                                            className="user-key h-12 leading-12 md:hidden">Number :</span>
                                                        <span
                                                            className="number w-6 h-6 rounded-full text-sm font-bold bg-orange-400 text-white flex items-center justify-center">{user.id}</span>
                                                        <span
                                                            className="user-key h-12 leading-12 md:hidden">Profile :</span>
                                                        <img
                                                            className="user-profile w-12 h-12 rounded-full object-cover"
                                                            src="/images/profile-1.webp" alt="Profile"/>
                                                        <span
                                                            className="user-key h-12 leading-12 md:hidden">Name :</span>
                                                        <span
                                                            className="user-name font-bold whitespace-nowrap text-ellipsis max-w-[150px] from-400:max-w-[230px] from-500:max-w-[300px] md:max-w-[100px] lg:max-w-[150px] overflow-hidden">{user.name}</span>
                                                        <span
                                                            className="user-key h-12 leading-12 md:hidden">Email :</span>
                                                        <span
                                                            className="user-email whitespace-nowrap text-ellipsis max-w-[150px] from-400:max-w-[230px] from-500:max-w-[300px] md:max-w-[100px] lg:max-w-[300px] overflow-hidden">{user.email}</span>
                                                        <span
                                                            className="user-key h-12 leading-12 md:hidden">Phone :</span>
                                                        <span
                                                            className="user-phone whitespace-nowrap text-ellipsis max-w-[150px] from-400:max-w-[230px] from-500:max-w-[300px] md:max-w-[100px] lg:max-w-[150px] overflow-hidden">{user.phone}</span>
                                                        <span
                                                            className="user-key h-12 leading-12 md:hidden">Password :</span>
                                                        <span
                                                            className="user-password whitespace-nowrap text-ellipsis max-w-[150px] from-400:max-w-[230px] from-500:max-w-[300px] md:max-w-[100px] lg:max-w-[150px] overflow-hidden">{user.password}</span>
                                                        <span
                                                            className="user-key h-12 leading-12 md:hidden">Bought :</span>
                                                        <span
                                                            className="user-sale-count whitespace-nowrap text-ellipsis max-w-[150px] from-400:max-w-[230px] from-500:max-w-[300px] md:max-w-[100px] lg:max-w-[150px] overflow-hidden">{user.bought} $</span>
                                                    </div>
                                                )) :
                                                    <p className="emptyalert text-shadow font-bold text-center text-lg py-4 bg-orange-400 text-white rounded-md">There's
                                                        no tickets</p>
                                                :
                                                Array.from({length: 5}).map((shimmer, index) => (
                                                    <div key={index}
                                                         className="user-shimmer max-w-[900px] mx-auto grid items-center justify-items-center gap-y-4 md:px-1.5 p-3 grid-cols-[80px_175px] from-400:grid-cols-[80px_230px] from-500:grid-cols-[80px_300px] md:grid-cols-[25px_50px_100px_100px_100px_100px_100px] lg:grid-cols-[25px_50px_100px_200px_100px_150px_120px] md:gap-3 bg-white box-shadow-small dark:bg-zinc-700 rounded-md md:rounded-full">
                                                        <span
                                                            className="user-key shimmer-animation box-shadow relative overflow-hidden w-8 block h-12 leading-12 md:hidden bg-shimmer dark:bg-dark-shimmer"></span>
                                                        <span
                                                            className="w-6 h-6 shimmer-animation box-shadow overflow-hidden relative block rounded-full bg-shimmer dark:bg-dark-shimmer"></span>
                                                        <span
                                                            className="user-key shimmer-animation box-shadow relative overflow-hidden w-8 block h-12 leading-12 md:hidden bg-shimmer dark:bg-dark-shimmer"></span>
                                                        <span
                                                            className="w-12 h-12 shimmer-animation box-shadow overflow-hidden relative block rounded-full bg-shimmer dark:bg-dark-shimmer"></span>
                                                        <span
                                                            className="user-key shimmer-animation box-shadow relative overflow-hidden w-8 block h-12 leading-12 md:hidden bg-shimmer dark:bg-dark-shimmer"></span>
                                                        <span
                                                            className="w-[100px] md:w-[70px] shimmer-animation box-shadow overflow-hidden relative h-3 block bg-shimmer dark:bg-dark-shimmer"></span>
                                                        <span
                                                            className="user-key shimmer-animation box-shadow relative overflow-hidden w-8 block h-12 leading-12 md:hidden bg-shimmer dark:bg-dark-shimmer"></span>
                                                        <span
                                                            className="w-[150px] md:w-[100px] shimmer-animation box-shadow overflow-hidden relative h-3 block bg-shimmer dark:bg-dark-shimmer"></span>
                                                        <span
                                                            className="user-key shimmer-animation box-shadow relative overflow-hidden w-8 block h-12 leading-12 md:hidden bg-shimmer dark:bg-dark-shimmer"></span>
                                                        <span
                                                            className="w-[100px] md:w-[50px] shimmer-animation box-shadow overflow-hidden relative h-3 block bg-shimmer dark:bg-dark-shimmer"></span>
                                                        <span
                                                            className="user-key shimmer-animation box-shadow relative overflow-hidden w-8 block h-12 leading-12 md:hidden bg-shimmer dark:bg-dark-shimmer"></span>
                                                        <span
                                                            className="w-[150px] md:w-[50px] shimmer-animation box-shadow overflow-hidden relative h-3 block bg-shimmer dark:bg-dark-shimmer"></span>
                                                        <span
                                                            className="user-key shimmer-animation box-shadow relative overflow-hidden w-8 block h-12 leading-12 md:hidden bg-shimmer dark:bg-dark-shimmer"></span>
                                                        <span
                                                            className="w-[120px] md:w-[50px] shimmer-animation box-shadow overflow-hidden relative h-3 block bg-shimmer dark:bg-dark-shimmer"></span>
                                                        {/* [25px_50px_100px_200px_100px_150px_120px] */}
                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                            </div>

                            <div
                                className="10-last-tickets-wrapper rounded-md pt-4 mx-auto max-w-[1000px] pr-1 bg-white dark:bg-zinc-700 dark:text-white">
                                <h5 className="text-shadow font-bold text-xl text-center">Last 10 tickets</h5>
                                <div className="custom-scroll overflow-y-auto max-h-[500px] py-4">
                                    <div className="tickets flex gap-6 flex-col px-3">
                                        {
                                            isShowTickets ?
                                                tickets.length ?
                                                    tickets.map((ticket, i) => (
                                                        <div
                                                            key={i}
                                                            className="ticket box-shadow p-3 rounded-md sm:rounded-full gap-y-4 gap-x-2.5 grid grid-cols-[90px_200px] from-400:grid-cols-[90px_230px] from-500:grid-cols-[90px_350px] sm:grid-cols-[25px_100px_100px_320px] md:grid-cols-[25px_100px_100px_500px] lg:grid-cols-[25px_100px_100px_690px] items-center">
                                                            <span
                                                                className="ticket-item-key leading-[30px] sm:hidden">Number :</span>
                                                            <span
                                                                className="number w-6 h-6 rounded-full text-sm font-bold bg-orange-400 text-white flex items-center justify-center">{i + 1}</span>
                                                            <span
                                                                className="ticket-item-key leading-[30px] sm:hidden">Title :</span>
                                                            <span
                                                                className="ticket-title whitespace-nowrap text-ellipsis overflow-hidden max-w-[100px] from-350:max-w-[300px]">{ticket.title}</span>
                                                            <span
                                                                className="ticket-item-key leading-[30px] sm:hidden">Name :</span>
                                                            <span
                                                                className="tikcet-creator whitespace-nowrap text-ellipsis overflow-hidden max-w-[100px]">{ticket.name}</span>
                                                            <span className="ticket-item-key leading-[30px] sm:hidden">Description :</span>
                                                            <span
                                                                className="ticket-description whitespace-nowrap text-ellipsis overflow-hidden max-w-[150px] from-350:max-w-[500px] sm:max-w-[350px] md:max-w-[440px] lg:max-w-[690px]">{ticket.description}</span>
                                                        </div>
                                                    ))
                                                    :
                                                    <p className="emptyalert text-shadow font-bold text-center text-lg py-4 bg-orange-400 text-white rounded-md">There's
                                                        no tickets</p>
                                                :
                                                Array.from({length: 5})
                                                    .map((shimmer, i) => (
                                                        <div
                                                            key={i}
                                                            className="ticket box-shadow p-3 rounded-md sm:rounded-full gap-y-4 gap-x-2.5 grid grid-cols-[90px_200px] from-400:grid-cols-[90px_230px] from-500:grid-cols-[90px_350px] sm:grid-cols-[25px_100px_100px_320px] md:grid-cols-[25px_100px_100px_500px] lg:grid-cols-[25px_100px_100px_690px] items-center">
                                                            <span
                                                            className="shimmer-key block sm:hidden bg-shimmer dark:bg-dark-shimmer shimmer-animation relative overflow-hidden w-[50px] h-5"></span>
                                                            <span
                                                                className="w-6 block h-6 rounded-full overflow-hidden relative shimmer-animation bg-shimmer dark:bg-dark-shimmer"></span>
                                                            <span
                                                                className="shimmer-key block sm:hidden bg-shimmer dark:bg-dark-shimmer shimmer-animation relative overflow-hidden w-[50px] h-5"></span>
                                                            <span
                                                                className="w-24 block h-4 rounded-md overflow-hidden relative shimmer-animation bg-shimmer dark:bg-dark-shimmer"></span>
                                                            <span
                                                                className="shimmer-key block sm:hidden bg-shimmer dark:bg-dark-shimmer shimmer-animation relative overflow-hidden w-[50px] h-5"></span>
                                                            <span
                                                                className="w-24 block h-4 rounded-md overflow-hidden relative shimmer-animation bg-shimmer dark:bg-dark-shimmer"></span>
                                                            <span
                                                                className="shimmer-key block sm:hidden bg-shimmer dark:bg-dark-shimmer shimmer-animation relative overflow-hidden w-[50px] h-5"></span>
                                                            <span
                                                                className="w-[150px] from-400:w-[230px] from-500:w-[330px] md:w-[400px] lg:w-[500px] block h-4 rounded-md overflow-hidden relative shimmer-animation bg-shimmer dark:bg-dark-shimmer"></span>
                                                        </div>
                                                    ))

                                        }
                                    </div>
                                </div>
                            </div>
                        </> : null
                }

                <Outlet/>
            </div>
        </>
    )
}

export default Dashboard