import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeView, getFiles, setCurrentDir, setPopupDisplay, uploadFile } from '../../actions/files'
import FileList from '../fileList/FileList'
import Popup from '../popup/Popup'
import Uploader from '../uploader/Uploader'
import leftArrow from '../../assets/img/left-arrow.svg'
import plusFolder from '../../assets/img/plus-folder.svg'
import cloudUpload from '../../assets/img/cloud-upload.svg'

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const loader = useSelector(state => state.app.loader)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')
    const createHandler = () => {
        dispatch(setPopupDisplay('flex'))
    }
    const backClickHandler = () => {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }
    const fileUploadHandler = (e) => {
        const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }
    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [dispatch, currentDir, sort])
    const dragEnterHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }
    const dragLeaveHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }
    const dropHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let files = [...e.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }
    if(loader) return <div className='centering'><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
    return ( !dragEnter?
        <div className='disk' onDragEnter={e => dragEnterHandler(e)} onDragLeave={e => dragLeaveHandler(e)} onDragOver={e => dragEnterHandler(e)}>
            <div className='disk-buttons'>
                <div className='disk-buttons-wrapper'>
                    <button className='btn' onClick={backClickHandler}><img alt="left-arrow" className="m-1" src={leftArrow}/>Back</button>
                    <button className='btn' onClick={createHandler}><img alt="plus-folder" className="m-1" src={plusFolder}/>Create directory</button>
                    <div className='disk-upload'>
                        <label htmlFor='disk-upload-input' className='btn'><img alt="cloud-upload" className="m-1" src={cloudUpload}/>Upload file</label>
                        <input multiple={true} id='disk-upload-input' onChange={e => fileUploadHandler(e)} type='file' />
                    </div>
                </div>
                <div className='disk-buttons-wrapper'>
                    <select value={sort} onChange={e => setSort(e.target.value)} className="form-select">
                        <option value='type'>By type</option>
                        <option value='name'>By name</option>
                        <option value='date'>By date</option>
                    </select>
                    <button className='btn disk-buttons-plate' onClick={() => dispatch(changeView('plate'))}/>
                    <button className='btn disk-buttons-list' onClick={() => dispatch(changeView('list'))}/>
                </div>
            </div>
            <FileList/>
            <Popup/>
            <Uploader/>
        </div>
        :
        <div className='drop-area' onDrop={e => dropHandler(e)} onDragEnter={e => dragEnterHandler(e)} onDragLeave={e => dragLeaveHandler(e)} onDragOver={e => dragEnterHandler(e)}>
            Drag files here...
        </div>
    )
}

export default Disk