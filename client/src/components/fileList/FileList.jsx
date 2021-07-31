import React from 'react'
import { useSelector } from 'react-redux'
import File from '../file/File'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const FileList = () => {
    const files = useSelector(state => state.files.files)
    const fileView = useSelector(state => state.files.view)
    if(!files.length) return <div className="filelist-empty">There are no any files...</div>
    switch (fileView) {
        case 'list':
            return (
                <TransitionGroup>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Size</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {files.map(file => 
                            <CSSTransition 
                                key={file._id} 
                                timeout={500}
                                classNames={'file'} 
                                exit={false}
                            >
                                <File file={file} />
                            </CSSTransition>                    
                        )}
                        </tbody>
                    
                    </table>
                </TransitionGroup>
            )
        case 'plate':
            return (
                <div className='fileplate'>
                    {files.map(file => 
                        <File key={file._id} file={file} />                   
                    )}
                </div>
            )
        default:
            return (
                <TransitionGroup>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Size</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                        {files.map(file => 
                            <CSSTransition 
                                key={file._id} 
                                timeout={500}
                                classNames={'file'} 
                                exit={false}
                            >
                                <File file={file} />
                            </CSSTransition>                    
                        )}
                        </tbody>
                    
                    </table>
                </TransitionGroup>
            )
    }
}

export default FileList