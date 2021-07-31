import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir } from '../../actions/files'
import { setPopupDisplay } from '../../actions/files'

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const dispatch = useDispatch()
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const createHandler = () => {
        dispatch(createDir(currentDir, dirName))
        dispatch(setPopupDisplay('none'))
        setDirName('')
    }
    return (
        <div className="modal" tabindex="-1" onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(64, 64, 64, .8)'}}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{width: '500px'}}>
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Create a new directory</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => dispatch(setPopupDisplay('none'))}></button>
                </div>
                <div class="modal-body">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Directory name</label>
                    <input type="text" value={dirName} onChange={(e) => setDirName(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="Enter the name of the directory..."/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={createHandler}>Save</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Popup