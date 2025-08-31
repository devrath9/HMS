import { createContext } from "react";

export const Appcontext = createContext()

const AppcontextProvider = (props) => {

    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }
    

    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const slotDateFormat = (slotDate) => {
        const date = slotDate.replace(/-/g, " ");
        return date

    }

    

    const dateFilterFormat=(filterdate)=>{
        const date = new Date(filterdate)
        return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    }

    const value = {
        calculateAge, slotDateFormat, dateFilterFormat
    }

    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )

}
export default AppcontextProvider