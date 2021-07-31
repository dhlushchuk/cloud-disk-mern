import React from 'react'
import { useDispatch } from 'react-redux'
import { removeUploadFile } from '../../actions/upload'

const UploadFile = ({file}) => {
    const dispatch = useDispatch()
    return (
        <div className='m-1 p-1'>
            <div className='uploader-header'>
                <div className>{file.name}</div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => dispatch(removeUploadFile(file.id))}></button>
            </div>
            <div className='uploader-progress-bar'>
                <div className='bg-success' style={{width: file.progress + '%'}} />
                <div className='uploader-percent'>{file.progress}%</div>
            </div>
        </div>
    )
}

export default UploadFile