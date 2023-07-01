import { PersonAddOutlined, PersonRemoveOutlined, } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from 'store'
import FlexBetween from './flexBetween'
import UserImage from './UserImage'
import { useNavigate } from 'react-router-dom'

const Friends = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { _id } = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const friends = useSelector(state => state.user.friends)

    const { palette } = useTheme()
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((f) => f._id === friendId)

    const patchFriend = async () => {
        const response = await fetch(`https://muganool.onrender.com/users/${_id}/${friendId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
        console.log('----------response', response)
        const data = await response.json();
        console.log('----------response', data)

        dispatch(setFriends({ friends: data }))
    }

    return (
        <FlexBetween>
            <FlexBetween gap='1rem'>
                <UserImage image={userPicturePath} size='55px' />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`)
                        navigate(0);
                    }}

                >
                    <Typography color={main} variant='h5' fontWeight='500'
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                                color: palette.primary.light
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize='0.5rem' >
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            <IconButton onClick={() => { patchFriend(); }}
                sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
            >
                {isFriend ? (<PersonRemoveOutlined sx={{ backgroundColor: primaryDark }} />) : (<PersonAddOutlined sx={{ backgroundColor: primaryDark }} />)}
            </IconButton>
        </FlexBetween>
    )


}

export default Friends