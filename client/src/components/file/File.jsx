import React from 'react'
import DirLogo from '../../assets/img/dir.svg'
import FileLogo from '../../assets/img/file.svg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFile, downloadFile, pushToStack, setCurrentDir } from '../../actions/files'

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)
    const openDirHandler = (file) => {
        if(file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }
    const downloadClickHandler = (e) => {
        e.stopPropagation()
        downloadFile(file)
    }
    const deleteClickHandler = (e) => {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }
    switch (fileView) {
        case 'list':
            return (
                <tr onClick={() => openDirHandler(file)}>
                    <td><img src={file.type === 'dir'? DirLogo : FileLogo} alt=''/> {file.name}</td>
                    <td className='filelist-td'>{file.date.slice(0, 10)}</td>
                    <td className='filelist-td'>{file.size}</td>
                    <td>
                        {file.type !== 'dir' && <button onClick={e => downloadClickHandler(e)} className='btn'>Скачать</button>}
                        <button className='btn' onClick={e => deleteClickHandler(e)}>Удалить</button>
                    </td>
                </tr>
            )
        case 'plate':
            return (
                <div className='fileplate-file' onClick={() => openDirHandler(file)}>
                    <img src={file.type === 'dir'? DirLogo : FileLogo} alt=''/>
                    <div>{file.name}</div>
                    <div className='fileplate-file-btns'>
                        {file.type !== 'dir' && <button onClick={e => downloadClickHandler(e)} className='btn'>Скачать</button>}
                        <button className='btn' onClick={e => deleteClickHandler(e)}>Удалить</button>
                    </div>
                </div>
            )
        default:
            return (
                <tr onClick={() => openDirHandler(file)}>
                    <td><img src={file.type === 'dir'? DirLogo : FileLogo} alt=''/> {file.name}</td>
                    <td style={{verticalAlign: 'middle'}}>{file.date.slice(0, 10)}</td>
                    <td style={{verticalAlign: 'middle'}}>{file.size}</td>
                    <td>
                        {file.type !== 'dir' && <button onClick={e => downloadClickHandler(e)} className='btn'>Скачать</button>}
                        <button className='btn' onClick={e => deleteClickHandler(e)}>Удалить</button>
                    </td>
                </tr>
            )
    }
    
}

export default File