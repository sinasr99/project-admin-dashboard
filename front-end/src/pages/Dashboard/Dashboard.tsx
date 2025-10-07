import {FC, useEffect, useState} from "react"
import AccessPanel from "../../components/AccessPanel"
import {Outlet, useLocation} from "react-router-dom"
import Cookies from "js-cookie"
import ChartWrapper, {chartDataType} from "../../components/ChartWrapper"
import getLastWeeks from "../../helperFunctions/getLastWeek"

const Dashboard: FC = () => {
    const isDashboardPath = useLocation().pathname === "/dashboard"
    const [isShowUsers, setIsShowUsers] = useState<boolean>(false)
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

        // setTimeout(() => {
        //     setIsShowUsers(true)
        // }, 1500)
    }, [])

    return (
        <>
            <AccessPanel/>

            <div className="container pt-5">
                {
                    isDashboardPath ?
                        <>
                            <h5 className="font-bold text-base sm:text-xl text-shadow bg-white dark:bg-zinc-700 dark:text-white w-fit py-4 px-[7px] sm:p-5  rounded-md mx-auto mb-8">Welcome
                                to your dashboard Sina Saber ✌️</h5>
                            <ChartWrapper tooltipKey="Sell" afterValue="$" data={sellData}
                                          title="Last week's sales chart"/>
                            <ChartWrapper tooltipKey="Users" data={registeredUsers}
                                          title="Chart of registered users last week"/>

                            <div
                                className="10-last-items-wrapper rounded-md mx-auto p-5 max-w-[1000px] bg-white dark:bg-zinc-700 dark:text-white">
                                <h5 className="text-shadow font-bold text-xl text-center">Last 10 registered users</h5>

                                <div className="user-wrapper flex flex-col gap-5 pt-5">
                                    {
                                        isShowUsers ?
                                            users.map(user => (
                                                <div
                                                    key={user.id}
                                                    className="user-item max-w-[900px] mx-auto grid items-center justify-items-center gap-y-4 md:px-1.5 p-3 grid-cols-[80px_175px] from-400:grid-cols-[80px_230px] from-500:grid-cols-[80px_300px] md:grid-cols-[25px_50px_100px_100px_100px_100px_100px] lg:grid-cols-[25px_50px_100px_200px_100px_150px_120px] md:gap-3 bg-white box-shadow-small dark:bg-zinc-700 rounded-md md:rounded-full">
                                                    <span className="user-key h-12 leading-12 md:hidden">Number :</span>
                                                    <span
                                                        className="number w-6 h-6 rounded-full text-sm font-bold bg-orange-400 text-white flex items-center justify-center">{user.id}</span>
                                                    <span
                                                        className="user-key h-12 leading-12 md:hidden">Profile :</span>
                                                    <img className="user-profile w-12 h-12 rounded-full object-cover"
                                                         src="/images/profile-1.webp" alt="Profile"/>
                                                    <span className="user-key h-12 leading-12 md:hidden">Name :</span>
                                                    <span
                                                        className="user-name font-bold whitespace-nowrap text-ellipsis max-w-[150px] from-400:max-w-[230px] from-500:max-w-[300px] md:max-w-[100px] lg:max-w-[150px] overflow-hidden">{user.name}</span>
                                                    <span className="user-key h-12 leading-12 md:hidden">Email :</span>
                                                    <span
                                                        className="user-email whitespace-nowrap text-ellipsis max-w-[150px] from-400:max-w-[230px] from-500:max-w-[300px] md:max-w-[100px] lg:max-w-[200px] overflow-hidden">{user.email}</span>
                                                    <span className="user-key h-12 leading-12 md:hidden">Phone :</span>
                                                    <span
                                                        className="user-phone whitespace-nowrap text-ellipsis max-w-[150px] from-400:max-w-[230px] from-500:max-w-[300px] md:max-w-[100px] lg:max-w-[150px] overflow-hidden">{user.phone}</span>
                                                    <span
                                                        className="user-key h-12 leading-12 md:hidden">Password :</span>
                                                    <span
                                                        className="user-password whitespace-nowrap text-ellipsis max-w-[150px] from-400:max-w-[230px] from-500:max-w-[300px] md:max-w-[100px] lg:max-w-[150px] overflow-hidden">{user.password}</span>
                                                    <span className="user-key h-12 leading-12 md:hidden">Bought :</span>
                                                    <span
                                                        className="user-sale-count whitespace-nowrap text-ellipsis max-w-[150px] from-400:max-w-[230px] from-500:max-w-[300px] md:max-w-[100px] lg:max-w-[150px] overflow-hidden">{user.bought} $</span>
                                                </div>
                                            )) :
                                            <div className="user-shimmer max-w-[900px] mx-auto grid items-center justify-items-center gap-y-4 md:px-1.5 p-3 grid-cols-[80px_175px] from-400:grid-cols-[80px_230px] from-500:grid-cols-[80px_300px] md:grid-cols-[25px_50px_100px_100px_100px_100px_100px] lg:grid-cols-[25px_50px_100px_200px_100px_150px_120px] md:gap-3 bg-white box-shadow-small dark:bg-zinc-700 rounded-md md:rounded-full">
                                                 <span className="user-key w-8 block h-12 leading-12 md:hidden bg-shimmer dark:bg-dark-shimmer"></span>
                                                <span className="w-6 h-6 shimmer-animation box-shadow overflow-hidden relative block rounded-full bg-shimmer dark:bg-dark-shimmer"></span>
                                                 <span className="user-key w-8 block h-12 leading-12 md:hidden bg-shimmer dark:bg-dark-shimmer"></span>
                                                <span className="w-12 h-12 shimmer-animation box-shadow overflow-hidden relative block rounded-full bg-shimmer dark:bg-dark-shimmer"></span>
                                                 <span className="user-key w-8 block h-12 leading-12 md:hidden bg-shimmer dark:bg-dark-shimmer"></span>
                                                <span className="w-[100px] md:w-[70px] shimmer-animation box-shadow overflow-hidden relative h-3 block bg-shimmer dark:bg-dark-shimmer"></span>
                                                 <span className="user-key w-8 block h-12 leading-12 md:hidden bg-shimmer dark:bg-dark-shimmer"></span>
                                                <span className="w-[200px] md:w-[100px] shimmer-animation box-shadow overflow-hidden relative h-3 block bg-shimmer dark:bg-dark-shimmer"></span>
                                                 <span className="user-key w-8 block h-12 leading-12 md:hidden bg-shimmer dark:bg-dark-shimmer"></span>
                                                <span className="w-[100px] md:w-[50px] shimmer-animation box-shadow overflow-hidden relative h-3 block bg-shimmer dark:bg-dark-shimmer"></span>
                                                 <span className="user-key w-8 block h-12 leading-12 md:hidden bg-shimmer dark:bg-dark-shimmer"></span>
                                                <span className="w-[150px] md:w-[50px] shimmer-animation box-shadow overflow-hidden relative h-3 block bg-shimmer dark:bg-dark-shimmer"></span>
                                                 <span className="user-key w-8 block h-12 leading-12 md:hidden bg-shimmer dark:bg-dark-shimmer"></span>
                                                <span className="w-[120px] md:w-[50px] shimmer-animation box-shadow overflow-hidden relative h-3 block bg-shimmer dark:bg-dark-shimmer"></span>
                                                {/* [25px_50px_100px_200px_100px_150px_120px] */}
                                            </div>
                                    }
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