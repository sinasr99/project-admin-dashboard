import React, {FC, useState} from "react";
import Input from "../../../components/Input";
import {UserType} from "../../../components/User.T";
import SelectBox from "../../../components/SelectBox";
import Modal from "../../../components/Modal";

const user: UserType = {
    name: "Sina Saber",
    phone: "09056408450",
    email: "sina1383@gmail.com",
    password: "Ss1383@#$",
    role: "ADMIN"
}

const roleItems = ["ADMIN", "USER"]

const Account: FC = () => {
    const [name, setName] = useState(user.name)
    const [phone, setPhone] = useState(user.phone)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState(user.password)
    const [role, setRole] = useState<"ADMIN" | "USER">(user.role)

    // Input Errors :
    const [nameErrors, setNameErrors] = useState<number>(0)
    const [phoneErrors, setPhoneErrors] = useState<number>(0)
    const [emailErrors, setEmailErrors] = useState<number>(0)
    const [passwordErrors, setPasswordErrors] = useState<number>(0)

    // Show Agree Change Modal State :
    const [isShowAgreeChangeModal, setIsShowAgreeChangeModal] = useState(false)

    const changeUser = () => {

    }

    const showModal = (event: React.MouseEvent) => {
        event.stopPropagation()
        setIsShowAgreeChangeModal(true)
    }

    return (
       <>
           <Modal noText="No" yesText="Yes, I'm sure" agreeFunction={changeUser} question="Are you sure you want change your account information ?" type="agree" show={isShowAgreeChangeModal} setShow={setIsShowAgreeChangeModal}/>
           <div className="w-full px-[1.5px] sm:px-3 rounded-md bg-white dark:bg-zinc-700 py-5 dark:text-white">
               <h3 className="font-bold pl-2 sm:pl-0 text-xl sm:text-2xl">Account Management :</h3>

               <div className="user-inputs flex flex-col mt-5 px-2.5 sm:px-0 sm:grid grid-cols-[300px_300px] justify-items-center justify-center gap-y-7 sm:gap-x-3">
                   <Input setErrorsCount={setNameErrors} type="text" placeholder="Enter your name" value={name} setValue={setName} isFullWidth={true}/>
                   <Input setErrorsCount={setPhoneErrors} type="phone" placeholder="Enter your phone" value={phone} setValue={setPhone} isFullWidth={true}/>
                   <Input setErrorsCount={setEmailErrors} type="email" placeholder="Enter your email" value={email} setValue={setEmail} isFullWidth={true}/>
                   <Input setErrorsCount={setPasswordErrors} type="password" placeholder="Enter your password" value={password} setValue={setPassword} isFullWidth={true}/>
                   <div className="select-wrapper col-span-2">
                       <SelectBox items={roleItems} defaultItem={role} setDefaultItem={setRole} placeholder="Enter your role"/>
                   </div>
                   <button
                       onClick={showModal}
                       className="col-span-2 cursor-pointer transition hover:bg-orange-500 bg-orange-600 text-white rounded-md px-4 py-2">Change your information</button>
               </div>
           </div>
       </>
    )
}

export default Account