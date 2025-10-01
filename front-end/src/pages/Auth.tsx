import {FC, useEffect, useState} from "react";
import Login from "../components/Login";
import Register from "../components/Register";


const Auth: FC = () => {
    const [isLoginMode, setIsLoginMode] = useState<boolean>(getAuthType())

    useEffect(() => {
        localStorage.setItem("is-login", JSON.stringify(isLoginMode))
    }, [isLoginMode])

    function getAuthType(): boolean {
          const key = "is-login"
      try {
          const saved = JSON.parse(localStorage.getItem(key) || "")

          if (typeof saved !== "boolean") {
              localStorage.setItem(key, JSON.stringify(false))
              return false
          }

          return false
      }catch (err){
          localStorage.setItem(key, JSON.stringify(false))
          return false
      }
    }

    return (
        <div className="auth-root bg-bg-color h-full">
            {
                isLoginMode ? <Login/> : <Register/>
            }
        </div>
    )
}

export default Auth