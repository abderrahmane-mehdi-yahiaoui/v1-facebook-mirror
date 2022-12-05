import {useEffect, useState, useRef} from 'react';

export const  useClickOutside = () =>{
    const ref = useRef(null);
    const [visibility, setVisibility] = useState(false)

    const handleClickOutside = (event) =>{
        if(ref.current && !ref.current.contains(event.target)) setVisibility(false)

    }
    const handleKeyEvent = (event)=>{
        if(event.key === 'Escape') setVisibility(false)
    }
    useEffect(()=>{
        document.addEventListener('click', handleClickOutside, true)
        document.addEventListener('keypress', handleKeyEvent, true)
        return()=>{
            document.removeEventListener('click', handleClickOutside, false)
            document.removeEventListener('keypress', handleKeyEvent, false)
        }
    }, [ref])
    return {ref, visibility , setVisibility}
}

export default useClickOutside;