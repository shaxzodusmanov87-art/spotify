import { Check, LucidePanelLeftOpen, LucidePanelRightOpen, Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { FaPlus } from "react-icons/fa6"
import { RiExpandDiagonalLine } from 'react-icons/ri';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { DropdownMenuSidebar } from "@/data/data";
import { GoDotFill } from "react-icons/go";
import { VscLibrary } from 'react-icons/vsc';

const Sidebar = () => {

  const [activeSidebar, setActiveSidebar] = useState(true)
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [activeDropdown, setActiveDropdown] = useState(false)
  const [dropdownButtonText, setDropdownButtonText] = useState("Недавние")
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [hovered, setHovered] = useState(false);

  useEffect(() => {

    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setActiveDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }

  }, [])

  return (
    <>
      < div className={`${activeSidebar ? "group w-[385px] pt-3 pl-3 pr-5" : "w-[70px] flex flex-col items-center pt-4 gap-4"} h-[80vh]  bg-neutral-950 mt-5 ml-3 rounded-[5px] text-white`}>
        < div className="flex justify-between items-center" >
          <div className="flex gap-2 items-center">
            <button onClick={() => setActiveSidebar((prevActiveMenu) => !prevActiveMenu)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
              {activeSidebar 
                ? <LucidePanelRightOpen className="w-5 text-neutral-400" /> 
                : (hovered ? (<LucidePanelLeftOpen className="w-10 text-neutral-400" />) : (<VscLibrary className="w-10 h-6 text-neutral-400" />) )}
            </button>
            {activeSidebar && <p className="text-[14px] font-bold">Моя медиатека</p>}
          </div>
          {activeSidebar &&
            <div className="flex items-center gap-4">
              <div>
                <Button className="bg-neutral-900 hover:bg-neutral-800 rounded-full w-25 h-8">
                  <FaPlus className="text-neutral-400" />
                  <p className="text-[13px]">Создать</p>
                </Button>
              </div>

              <RiExpandDiagonalLine className="w-7 h-7 text-neutral-400 hover:bg-neutral-800 rounded-full p-1.5" />

            </div>
          }

        </div >

        {activeSidebar 
          ? <Button className="rounded-full text-[12px] bg-neutral-900 hover:bg-neutral-800 h-7 mt-3">Плейлисты</Button>
          : <FaPlus className="bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 h-8 w-8 p-2 rounded-full text-neutral-400" />
        }


        {activeSidebar &&
          <div className="flex items-center justify-between mt-3">
            <div>
              <Search className="w-7 h-7 text-neutral-400 hover:bg-neutral-800 rounded-full p-1.5" />
            </div>

            <div>
              <Button className="text-neutral-400 hover:text-white hover:scale-105 bg-transparent hover:bg-transparent" onClick={() => setActiveDropdown((prev) => !prev)} >
                <p className="text-[12px]">{dropdownButtonText}</p>
                <AiOutlineUnorderedList />
              </Button>

            </div>

          </div>
        }

        {activeDropdown &&
          <div className="absolute left-44 w-48 h-55 bg-neutral-800 ml-auto px-1 text-[12px]" ref={dropdownRef}>
            <p className="font-semibold text-neutral-400 p-3">Сортировка</p>
            {DropdownMenuSidebar.map((item, index) => (
              <div className={`${activeIndex === index && "text-[#1DB954]"} flex justify-between items-center p-3 w-full hover:bg-neutral-700 rounded-[2px]`} key={index} onClick={() => (
                setActiveIndex(index),
                setDropdownButtonText(item)
              )}>
                <button>{item}</button>
                {activeIndex === index && <Check className="h-5" />}
              </div>
            ))}
          </div>
        }


        <div className={`flex items-center gap-3 ${activeSidebar && "mt-2"} hover:bg-neutral-900 rounded-[5px] h-15 px-2`}>
          <img src="https://avatars.yandex.net/get-music-content/15401259/5b706773.a.35470856-1/m1000x1000" className="w-12 rounded-[5px]" />
          {activeSidebar &&
            <div>
              <p className="text-[14px] text-[#1DB954] font-semibold">My Playlist #1</p>
              <div className="flex items-center text-[13px] text-neutral-400">
                <p>Плейлист</p>
                <GoDotFill className="mt-1 h-2" />
                <p className="font-semibold">Shaxzod Usmanov</p>

              </div>
            </div>
          }

        </div>


      </div >

    </>
  )
}

export default Sidebar