import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/flexBetween";
import WidgetWrapper from "components/WidgetWrapper";


const AdvertWidget = () => {
    const { palette } = useTheme()
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    return (<WidgetWrapper>

        <FlexBetween>
            <Typography color={main} variant='h5' fontWeight='500'>
                Sponsored
            </Typography>
            <Typography color={medium}>Create Ad</Typography>

        </FlexBetween>
        <img
            width='100%'
            height='auto'
            alt='advert'
            src='#'
            style={{ borderRadius: '075rem', margin: '.75rem 0', }}
        />
        <FlexBetween>
            <Typography color={main}>some ads</Typography>
            <Typography color={main}>wwww.abc.com</Typography>
        </FlexBetween>
        <Typography color={medium}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus modi, cumque tempora quidem voluptas error blanditiis debitis aut eos voluptates saepe quas dicta repellat totam placeat laudantium omnis nihil at.</Typography>
    </WidgetWrapper>
    )


}




export default AdvertWidget