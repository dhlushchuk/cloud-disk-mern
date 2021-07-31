import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAvatar, uploadAvatar } from '../../actions/user'
import avatarLogo from '../../assets/img/avatar.svg'
import { API_URL } from '../../config'

const Profile = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo 
    const changeHandler = e => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }
    return (
        <div className="card">
            <img className="avatar-picture" src={avatar} alt='user-avatar' />
            <div className="profile-buttons">
                <button className="btn btn-outline-secondary" onClick={() => dispatch(deleteAvatar())}>Delete Avatar</button>
                <input class="form-control" accept='image/*' type='file' onChange={e => changeHandler(e)} placeholder='Upload avatar...'/>
            </div>
        </div>
    )
}

export default Profile