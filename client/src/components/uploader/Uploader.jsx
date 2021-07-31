import React from 'react'
import UploadFile from './UploadFile'
import { useDispatch, useSelector } from 'react-redux'
import { hideUploader } from '../../actions/upload'

const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()
    return (
         isVisible &&
        <div className='uploader'>
            <div className='uploader-header'>
                <div>Uploads...</div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => dispatch(hideUploader())}></button>
            </div>
            {files.map(file => <UploadFile key={file.id} file={file}/>)}
        </div>
    )
}

export default Uploader