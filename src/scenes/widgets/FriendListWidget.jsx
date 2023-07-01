import { Typography, Box, useTheme } from "@mui/material";
import Friends from "components/Friends";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/";
import { setFriends } from "store";

const FriendlistWidget = ({ userId }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.token);
    const friends = useSelector(state => state.user.friends)

    const { palette } = useTheme()

    const getFriends = async () => {
        const response = await fetch(`https://muganool.onrender.com/users/${userId}/friends`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        const data = await response.json()
        dispatch(setFriends({ friends: data }))
    }

    useEffect(() => {
        getFriends();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <WidgetWrapper>
            <Typography color={palette.neutral.dark} variant='hs' fontWeight='500' sx={{ mb: '1.5rem' }}>
                Friend List
            </Typography>
            <Box
                display='flex' flexDirection='column' gap='1.5rem'
            >
                {friends.map((f) => (
                    <Friends
                        key={f._d}
                        friendId={f._id}
                        name={`${f.firstName} ${f.lastName}`}
                        subtitle={f.occupation}
                        userPicturePath={f.picturePath}

                    />
                ))}
            </Box>
        </WidgetWrapper>
    )

}

export default FriendlistWidget