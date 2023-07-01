import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,

} from '@mui/icons-material'
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import FlexBetween from 'components/flexBetween'
import WidgetWrapper from 'components/WidgetWrapper'
import Friends from 'components/Friends'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from 'store'

const PostWidget = ({
    postId,
    postUserId,
    name,
    location,
    description,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const dispatch = useDispatch()

    const [isComment, setIsComment] = useState(false);
    const token = useSelector(state => state.token);
    const loggedInUserId = useSelector(s => s.user._id)
    const isLiked = Boolean(likes[loggedInUserId])
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme()

    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {

        const response = await fetch(`https://muganool.onrender.com/posts/${postId}/like`, {

            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ userId: loggedInUserId })
        })
        const updatedPost = response.json();

        dispatch(setPost({ post: updatedPost }))

    }

    return (
        <WidgetWrapper m='2rem 0'>
            <Friends
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: '1rem' }} > {description}</Typography>
            {picturePath && (
                <img
                    width='100%'
                    height='100%'
                    alt='post'
                    style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
                    src={`https://muganool.onrender.com/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt='.25rem'>
                <FlexBetween gap='1rem'>

                    <FlexBetween gap='.3rem'>
                        <IconButton onClick={() => { patchLike() }}>
                            {isLiked ?
                                <FavoriteOutlined sx={{ color: primary }} /> :
                                <FavoriteBorderOutlined />
                            }
                        </IconButton>
                        <Typography>
                            {likeCount}
                        </Typography>
                    </FlexBetween>

                    <FlexBetween gap='0.3rem'>
                        <IconButton onClick={() => { setIsComment(!isComment) }}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>
                            {comments.length}
                        </Typography>
                    </FlexBetween>

                </FlexBetween>
                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComment && (
                <Box mt='0.5rem'>
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                                {comment}
                            </Typography>
                            <Divider />
                        </Box>
                    ))}
                </Box>
            )}
        </WidgetWrapper>
    )


}



export default PostWidget