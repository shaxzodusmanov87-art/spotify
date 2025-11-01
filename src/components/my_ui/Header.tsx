import { FiSearch } from "react-icons/fi"
import { GoHomeFill } from "react-icons/go"
import { TbShoppingBag } from "react-icons/tb"
import { Button } from "../ui/button"
import { FaArrowDownLong, FaUsers } from "react-icons/fa6"
import { IoNotificationsOutline } from "react-icons/io5"

const Header = () => {
    return (
        <div className="fixed w-full h-[60px] bg-black flex justify-between items-center px-7" >
            <div className="flex justify-center items-center gap-6">
                <div className="w-fit">
                    <img className="w-7" src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/spotify-white-icon.png" alt="white_icon" />
                </div>
                <div className="flex justify-center items-center gap-2">
                    <GoHomeFill className="text-white w-11 h-11 border border-neutral-900 rounded-full p-2 bg-neutral-900 hover:bg-neutral-800 transition-all duration-500" />

                    <div className="bg-neutral-900 hover:bg-neutral-800 border-neutral-900 hover:border hover:border-neutral-500 transition-all duration-500 flex items-center justify-between h-11 rounded-full w-[420px] px-2">
                        <div className="flex items-center gap-2">
                            <FiSearch className="text-neutral-400 w-6 h-6" />
                            <input className="placeholder-neutral-400 text-neutral-400 outline-0 text-[15px]" type="text" placeholder="Что хочешь включить?" />
                        </div>

                        <div className="flex gap-2 items-center">
                            <div className="h-7 w-[1px] bg-neutral-400"></div>
                            <TbShoppingBag className="text-neutral-400 w-7 h-7" />

                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center gap-3">
                <Button className="bg-white text-black h-7 rounded-full text-[12px] font-bold hover:bg-white hover:scale-105">Узнать больше о Premium</Button>
                <Button className="group bg-black text-neutral-400 hover:scale-105 hover:text-white h-7 rounded-full text-[12px] font-bold">
                    <FaArrowDownLong className="text-neutral-400 group-hover:text-white group-hover:border-white border border-neutral-400 rounded-full p-[2px]" />    
                    Установить приложение
                </Button>

                <IoNotificationsOutline className="text-neutral-400 hover:scale-110" />
                <FaUsers className="text-neutral-400 hover:scale-110" />
                <div className="rounded-full bg-neutral-900 w-11 h-11 flex justify-center items-center hover:scale-105">
                    <div className="rounded-full bg-blue-500 w-7 h-7 flex justify-center items-center font-bold"><p className="pb-1">S</p></div>
                </div>
                


            </div>
        </div>
    )
}

export default Header