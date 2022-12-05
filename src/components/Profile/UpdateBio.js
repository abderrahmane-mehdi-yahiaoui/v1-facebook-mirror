import React, {useState, useRef, useEffect} from 'react'
import styled from 'styled-components'
import Typography from '../Typography'
import Button from '../Buttons/Button'
import {Flex} from '../Styles/Styles'
import {useAuth} from '../Context'
import { Dialog } from '../Modal';
export default function UpdateBio({ bioValue, handleShow}) {
    const { updateBio } = useAuth()
    const [bio, setBio]=useState(bioValue)
    const [limit, setLimit]=useState(101)
    useEffect(() => {
        if(!bioValue){ return}
            const unsubscribe =setLimit(101 - bio.length)
        
        return () => unsubscribe
    }, [bioValue, bio.length ])
    const handleChange=e=>{
       const value = e.target.value
       if(value.length < limit){
          setLimit(101 - value.length)
          if(value.length < 1){  
            setLimit(101)
         }
         setBio(value)
       }
    }
    const handleUpdate=e=>{
        e.preventDefault()
        if(bio.length > 0){
            updateBio(bio)
            handleShow(e)
        }
        
    }
    const dialogRef = useRef()
    const openDialog=()=>{

        dialogRef.current.openDialog()
    }
    const closeDialog=()=>{
        dialogRef.current.closeDialog()
    }
    return (
        <Container>
            <Flex direction="column">
            <TextArea className={bio.length > 0 ? `text-size`: ``} value={bio} onChange={handleChange} maxlength={limit} rows="3" placeholder="Describe who you are" />
            
                <Flex justify="flex-end">
                    <div>
                    <Typography font="small" as="span" Color="secondary" text={`${limit} character(s) remaining`}/>
                    </div>
                    
                </Flex>

            <div className="submit-changes">
                <Flex justify="flex-end">
                    <Button type="secondary" textColor="primary" submit={bio !== bioValue && bio.length > 0  ? openDialog: handleShow}>Cancel</Button>
                    <Button submit={bioValue !== bio || bio.length > 0 ? handleUpdate: undefined}  disabled={ bioValue === bio || bio.length === 0 ? true: false} buttonText={bioValue !== bio || bio.length > 0 && 'primary'} textColor={bioValue === bio || bio.length === 0 &&  `disabled`} type={bioValue === bio || bio.length === 0 ? `disabled`: `primary`}>Save</Button>
                </Flex>
            </div>
            </Flex>

            <Dialog ref={dialogRef} width="548"
                heading={`discard changes`}
                message={`Are you sure that you want to discard your changes?`}
                confirm={`discard`}
                onConfirm={handleShow}
                onDiscard={closeDialog}
            />
        </Container>
    )
}
const Container = styled.div`
    padding-top:16px;
    width:300px;

    
    & button.disabled{
        cursor:not-allowed;
        transform:none;
    }

`

const TextArea = styled.textarea`
    background:var(--input-bg); 
    width:100%;
    resize:none;
    border:none;
    outline:none;
    border-radius;10px;
    overflow:hidden;
    height:90px;
    border-radius:6px;
    color:var(--primary-text);
    text-align:center;
    padding:8px 12px;
    font-weight:500;
    overflow-y:auto;
    box-shadow: 0 1px 2px var(--shadow-2);
    &:focus{
        background:var(--header-bg);
        border:1px solid var(--accent);
    }
    &:hover{
        background-image: linear-gradient(var(--hover-overlay)),var(--hover-overlay)));
    }
    &.text-size{
        font-size: var(--font-size-small);
        font-weight:600;
    }
    
`